import pako from 'pako';

export enum UserRole {
  AdminOperator = 'admin_operator',
  TreasuryUser = 'treasury_user',
  OperationalPartner = 'operational_partner',
}

export type InviteRole = UserRole;

const inviteRoles = new Set<InviteRole>([UserRole.TreasuryUser, UserRole.OperationalPartner]);

type IDecodedInviteEnvelope = {
  role?: InviteRole;
  host?: string;
  ipAddress?: string;
  port?: string;
  secret?: string;
  inviteCode?: string;
  operationalReferral?: any;
  hasError?: boolean;
  isEmpty?: boolean;
};

export class InviteEnvelope {
  public static decode(hex: string): IDecodedInviteEnvelope {
    if (!hex) return { isEmpty: true };

    try {
      const normalizedHex = hex.replace(/^0x/, '');
      const int = normalizedHex.match(/.{1,2}/g)?.map(h => parseInt(h, 16));
      if (!int) return { hasError: true };

      const bytes = Uint8Array.from(int);
      const decoded = pako.inflate(bytes, { to: 'string' });
      const payload = JSON.parse(decoded) as Partial<any>;
      if (
        payload.v !== 1 ||
        !payload.host ||
        !payload.port ||
        !payload.secret ||
        !payload.inviteCode ||
        !payload.role ||
        !inviteRoles.has(payload.role)
      ) {
        return { hasError: true };
      }

      const result: IDecodedInviteEnvelope = {
        role: payload.role,
        host: payload.host,
        ipAddress: payload.host,
        port: payload.port,
        secret: payload.secret,
        inviteCode: payload.inviteCode,
      };
      if (isOperationalReferral(payload.operationalReferral)) {
        result.operationalReferral = payload.operationalReferral;
      }
      return result;
    } catch {
      return { hasError: true };
    }
  }
}

function isOperationalReferral(value: unknown): value is any {
  if (!value || typeof value !== 'object') return false;

  const referral = value as Partial<any>;
  return (
    typeof referral.sponsor === 'string' &&
    typeof referral.expiresAtFrame === 'number' &&
    typeof referral.sponsorSignature === 'string'
  );
}
