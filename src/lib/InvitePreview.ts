export const MAX_INVITE_PREVIEW_BYTES = 16 * 1024;

const INVITE_PREVIEW_TIMEOUT_MS = 10_000;

type InviteEndpoint = {
  host: string;
  port: string;
  inviteCode: string;
};

export type InvitePreviewResponse = {
  code?: string;
  fromName?: string;
  estimatedGiftUsd: number;
  expiresAt: string;
  btcPctFee: number;
};

export async function fetchInvitePreview<T = InvitePreviewResponse>(args: {
  endpoint: InviteEndpoint;
}): Promise<{ response: Response; data: T }> {
  const { endpoint } = args;
  const host = endpoint.host.includes(":")
    ? `[${endpoint.host}]`
    : endpoint.host;
  const port = endpoint.port === "443" ? "" : `:${endpoint.port}`;
  const inviteCode = encodeURIComponent(endpoint.inviteCode);
  const url = `https://${host}${port}/invites/${inviteCode}/preview`;
  const response = await fetch(url, {
    cache: "no-store",
    credentials: "omit",
    redirect: "error",
    referrerPolicy: "no-referrer",
    signal: AbortSignal.timeout(INVITE_PREVIEW_TIMEOUT_MS),
  });
  const data = await readBoundedJson<T>(response);

  return { response, data };
}

async function readBoundedJson<T>(response: Response): Promise<T> {
  const contentLength = Number(response.headers.get("content-length"));
  if (
    Number.isFinite(contentLength) &&
    contentLength > MAX_INVITE_PREVIEW_BYTES
  ) {
    await response.body?.cancel();
    throw new Error("Invite preview is too large");
  }

  if (!response.body) throw new Error("Invite preview is empty");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let json = "";
  let totalBytes = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      totalBytes += value.byteLength;
      if (totalBytes > MAX_INVITE_PREVIEW_BYTES) {
        await reader.cancel();
        throw new Error("Invite preview is too large");
      }

      json += decoder.decode(value, { stream: true });
    }
  } finally {
    reader.releaseLock();
  }

  return JSON.parse(json + decoder.decode()) as T;
}
