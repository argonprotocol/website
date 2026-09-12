import { afterEach, expect, it, vi } from "vitest";
import { fetchInvitePreview, MAX_INVITE_PREVIEW_BYTES } from "./InvitePreview";

afterEach(() => {
  vi.unstubAllGlobals();
});

it("fetches a bounded invite preview without credentials or redirects", async () => {
  const fetchMock = vi.fn(
    async (_input: RequestInfo | URL, _init?: RequestInit) => {
      return new Response(JSON.stringify({ fromName: "Alice" }));
    },
  );
  vi.stubGlobal("fetch", fetchMock);

  const result = await fetchInvitePreview<{ fromName: string }>({
    endpoint: {
      host: "203.0.113.10",
      port: "443",
      inviteCode: "invite_code",
    },
  });

  expect(result.data).toEqual({ fromName: "Alice" });
  expect(fetchMock).toHaveBeenCalledWith(
    "https://203.0.113.10/invites/invite_code/preview",
    expect.objectContaining({
      cache: "no-store",
      credentials: "omit",
      redirect: "error",
      referrerPolicy: "no-referrer",
    }),
  );
});

it("formats IPv6 invite hosts safely", async () => {
  const fetchMock = vi.fn(async () => new Response("{}"));
  vi.stubGlobal("fetch", fetchMock);

  await fetchInvitePreview({
    endpoint: {
      host: "2001:db8::1",
      port: "8443",
      inviteCode: "invite_code",
    },
  });

  expect(fetchMock).toHaveBeenCalledWith(
    "https://[2001:db8::1]:8443/invites/invite_code/preview",
    expect.any(Object),
  );
});

it("rejects preview bodies larger than the response limit", async () => {
  vi.stubGlobal(
    "fetch",
    vi.fn(
      async () => new Response(`"${"x".repeat(MAX_INVITE_PREVIEW_BYTES)}"`),
    ),
  );

  await expect(
    fetchInvitePreview({
      endpoint: {
        host: "203.0.113.10",
        port: "443",
        inviteCode: "invite_code",
      },
    }),
  ).rejects.toThrow("Invite preview is too large");
});
