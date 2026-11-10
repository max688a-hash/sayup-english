// Server-only: verifies a StoreKit 2 signed transaction (JWS) against Apple's certificate chain.
// Import lazily inside server handlers so node:crypto never reaches the client bundle.
import { X509Certificate, verify as cryptoVerify } from 'node:crypto';
import { IAP_BUNDLE_ID, IAP_PRODUCT_IDS } from '@/lib/iap';
import { AppleRequestError } from '@/lib/apple-request-error';

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
  if (!h || !p || !s || jws.split('.').length !== 3) throw new AppleRequestError('Malformed JWS');
  let header: { alg?: string; x5c?: string[] };
  try {
    header = JSON.parse(b64urlToBuffer(h).toString('utf8'));
  } catch {
    throw new AppleRequestError('Malformed JWS header');
  }
  if (!header || header.alg !== 'ES256' || !Array.isArray(header.x5c) || header.x5c.length < 2 || header.x5c.some(c => typeof c !== 'string')) throw new AppleRequestError('Unsupported JWS header');

  let chain: X509Certificate[];
  try {
    chain = header.x5c.map(c => new X509Certificate(Buffer.from(c, 'base64')));
  } catch {
    throw new AppleRequestError('Malformed certificate chain');
  }
  const root = chain[chain.length - 1];
  const leaf = chain[0];
  if (!root || !leaf) throw new AppleRequestError('Empty certificate chain');
  const allowedRoot = (process.env['APPLE_ROOT_CA_SHA256'] ?? APPLE_ROOT_G3_SHA256).toUpperCase();
  if (root.fingerprint256.toUpperCase() !== allowedRoot) throw new AppleRequestError('Certificate chain does not end at Apple Root CA');
  for (let i = 0; i < chain.length - 1; i++) {
    const cert = chain[i];
    const issuer = chain[i + 1];
    if (!cert || !issuer) throw new AppleRequestError('Broken certificate chain');
    if (!cert.checkIssued(issuer) || !cert.verify(issuer.publicKey)) throw new AppleRequestError('Broken certificate chain');
    if (Date.parse(cert.validFrom) > now || Date.parse(cert.validTo) < now) throw new AppleRequestError('Certificate expired');
  }

  const signingInput = Buffer.from(`${h}.${p}`);
  const signature = b64urlToBuffer(s);
  const ok = cryptoVerify('sha256', signingInput, { key: leaf.publicKey, dsaEncoding: 'ieee-p1363' }, signature);
  if (!ok) throw new AppleRequestError('Invalid transaction signature');
  let payload: unknown;
  try { payload = JSON.parse(b64urlToBuffer(p).toString('utf8')); }
  catch { throw new AppleRequestError('Malformed JWS payload'); }
  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) throw new AppleRequestError('Malformed JWS payload');
  return payload as Record<string, unknown>;
}

export async function verifyAppleTransactionJws(jws: string, now = Date.now()): Promise<AppleTransaction> {
  const payload = (await verifyAppleJws(jws, now)) as unknown as AppleTransaction;
  if (payload.bundleId !== IAP_BUNDLE_ID) throw new AppleRequestError('Transaction belongs to another app');
  if (!Object.values(IAP_PRODUCT_IDS).includes(payload.productId as (typeof IAP_PRODUCT_IDS)[keyof typeof IAP_PRODUCT_IDS])) {
    throw new AppleRequestError('Unknown product');
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
