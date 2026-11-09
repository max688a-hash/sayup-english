// Server-only: verifies a StoreKit 2 signed transaction (JWS) against Apple's certificate chain.
// Import lazily inside server handlers so node:crypto never reaches the client bundle.
import { X509Certificate, verify as cryptoVerify } from 'node:crypto';
import { IAP_BUNDLE_ID, IAP_PRODUCT_IDS } from '@/lib/iap';

// SHA-256 fingerprint of "Apple Root CA - G3" (https://www.apple.com/certificateauthority/).
const APPLE_ROOT_G3_SHA256 = '63:34:3A:BF:B8:9A:6A:03:EB:B5:7E:9B:3F:5F:A7:BE:7C:4F:5C:75:6F:30:17:B3:A8:C4:88:C3:65:3E:91:79';

export type AppleTransaction = {
  transactionId: string;
  originalTransactionId: string;
  bundleId: string;
  productId: string;
  purchaseDate: number;
  expiresDate?: number;
  revocationDate?: number;
  environment: 'Production' | 'Sandbox' | 'Xcode' | string;
  appAccountToken?: string;
  type?: string;
};

function b64urlToBuffer(s: string): Buffer {
  return Buffer.from(s.replace(/-/g, '+').replace(/_/g, '/'), 'base64');
}

// Verifies any Apple-signed JWS (transaction, renewal info or notification
// envelope): ES256 signature against the leaf cert, x5c chain up to Apple Root.
// Returns the decoded payload; callers validate their own schema fields.
export async function verifyAppleJws(jws: string, now = Date.now()): Promise<Record<string, unknown>> {
  const [h, p, s] = jws.split('.');
  if (!h || !p || !s || jws.split('.').length !== 3) throw new Error('Malformed JWS');
  const header = JSON.parse(b64urlToBuffer(h).toString('utf8')) as { alg?: string; x5c?: string[] };
  if (header.alg !== 'ES256' || !Array.isArray(header.x5c) || header.x5c.length < 2) throw new Error('Unsupported JWS header');

  const chain = header.x5c.map(c => new X509Certificate(Buffer.from(c, 'base64')));
  const root = chain[chain.length - 1];
  const leaf = chain[0];
  if (!root || !leaf) throw new Error('Empty certificate chain');
  const allowedRoot = (process.env['APPLE_ROOT_CA_SHA256'] ?? APPLE_ROOT_G3_SHA256).toUpperCase();
  if (root.fingerprint256.toUpperCase() !== allowedRoot) throw new Error('Certificate chain does not end at Apple Root CA');
  for (let i = 0; i < chain.length - 1; i++) {
    const cert = chain[i];
    const issuer = chain[i + 1];
    if (!cert || !issuer) throw new Error('Broken certificate chain');
    if (!cert.checkIssued(issuer) || !cert.verify(issuer.publicKey)) throw new Error('Broken certificate chain');
    if (Date.parse(cert.validFrom) > now || Date.parse(cert.validTo) < now) throw new Error('Certificate expired');
  }

  const signingInput = Buffer.from(`${h}.${p}`);
  const signature = b64urlToBuffer(s);
  const ok = cryptoVerify('sha256', signingInput, { key: leaf.publicKey, dsaEncoding: 'ieee-p1363' }, signature);
  if (!ok) throw new Error('Invalid transaction signature');
  return JSON.parse(b64urlToBuffer(p).toString('utf8')) as Record<string, unknown>;
}

export async function verifyAppleTransactionJws(jws: string, now = Date.now()): Promise<AppleTransaction> {
  const payload = (await verifyAppleJws(jws, now)) as unknown as AppleTransaction;
  if (payload.bundleId !== IAP_BUNDLE_ID) throw new Error('Transaction belongs to another app');
  if (!Object.values(IAP_PRODUCT_IDS).includes(payload.productId as (typeof IAP_PRODUCT_IDS)[keyof typeof IAP_PRODUCT_IDS])) {
    throw new Error('Unknown product');
  }
  return payload;
}

export type AppleNotification = {
  notificationType: string;
  subtype?: string;
  notificationUUID: string;
  signedDate?: number;
  data?: {
    bundleId?: string;
    environment?: string;
    signedTransactionInfo?: string;
    signedRenewalInfo?: string;
  };
};

export function subscriptionStatus(tx: AppleTransaction, now = Date.now()): 'active' | 'canceled' {
  if (tx.revocationDate) return 'canceled';
  if (tx.expiresDate !== undefined && tx.expiresDate <= now) return 'canceled';
  return 'active';
}
