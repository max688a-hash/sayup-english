import { Capacitor, registerPlugin, type PluginListenerHandle } from '@capacitor/core';

// Apple auto-renewable subscriptions. Product IDs must match App Store Connect
// and ios/App/App/SayUp.storekit (used for simulator testing).
export const IAP_BUNDLE_ID = 'com.sayup.app';
export const IAP_PRODUCT_IDS = {
  month: 'com.sayup.app.sub.month',
  quarter: 'com.sayup.app.sub.quarter',
  year: 'com.sayup.app.sub.year',
} as const;
export type PlanId = keyof typeof IAP_PRODUCT_IDS;
export const PLAN_IDS = Object.keys(IAP_PRODUCT_IDS) as PlanId[];

export function planForProduct(productId: string): PlanId | null {
  const hit = PLAN_IDS.find(p => IAP_PRODUCT_IDS[p] === productId);
  return hit ?? null;
}

export type StoreProduct = {
  id: string;
  displayName: string;
  description: string;
  displayPrice: string;
  price: number;
  currencyCode: string;
  period?: { unit: 'day' | 'week' | 'month' | 'year' | 'unknown'; value: number };
};

export type Entitlement = {
  productId: string;
  transactionId: string;
  originalTransactionId: string;
  purchaseDate: number;
  expiresDate?: number;
  environment: 'Production' | 'Sandbox' | 'Xcode' | 'Unknown';
  appAccountToken?: string;
  jws: string;
};

export type PurchaseOutcome =
  | { state: 'purchased'; transaction: Entitlement; entitlements: Entitlement[] }
  | { state: 'cancelled' | 'pending' | 'unknown' };

interface SayUpStorePlugin {
  getProducts(options: { productIds: string[] }): Promise<{ products: StoreProduct[] }>;
  purchase(options: { productId: string; appAccountToken?: string }): Promise<PurchaseOutcome>;
  restore(): Promise<{ entitlements: Entitlement[] }>;
  getEntitlements(): Promise<{ entitlements: Entitlement[] }>;
  manageSubscriptions(): Promise<void>;
  addListener(eventName: 'entitlementsChanged', listener: (data: { entitlements: Entitlement[] }) => void): Promise<PluginListenerHandle>;
}

const SayUpStore = registerPlugin<SayUpStorePlugin>('SayUpStore');

const STORAGE_KEY = 'sayup-iap-entitlements';
export const IAP_CHANGE_EVENT = 'sayup-iap-change';

/** True only inside the iOS app where the native StoreKit bridge is registered. */
export function iapAvailable(): boolean {
  try {
    return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios' && Capacitor.isPluginAvailable('SayUpStore');
  } catch {
    return false;
  }
}

export function hasActiveEntitlement(list: Entitlement[], now = Date.now()): boolean {
  return list.some(e => planForProduct(e.productId) !== null && (e.expiresDate === undefined || e.expiresDate > now));
}

export function cachedEntitlements(): Entitlement[] {
  if (typeof localStorage === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as Entitlement[]) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function remember(list: Entitlement[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); } catch { /* storage optional */ }
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(IAP_CHANGE_EVENT));
}

export async function loadProducts(): Promise<Partial<Record<PlanId, StoreProduct>>> {
  if (!iapAvailable()) return {};
  const { products } = await SayUpStore.getProducts({ productIds: Object.values(IAP_PRODUCT_IDS) });
  const out: Partial<Record<PlanId, StoreProduct>> = {};
  for (const p of products) { const plan = planForProduct(p.id); if (plan) out[plan] = p; }
  return out;
}

export async function purchasePlan(plan: PlanId, appAccountToken?: string): Promise<PurchaseOutcome> {
  if (!iapAvailable()) throw new Error('IAP unavailable outside the iOS app');
  const outcome = await SayUpStore.purchase(appAccountToken ? { productId: IAP_PRODUCT_IDS[plan], appAccountToken } : { productId: IAP_PRODUCT_IDS[plan] });
  if (outcome.state === 'purchased') remember(outcome.entitlements);
  return outcome;
}

export async function restorePurchases(): Promise<Entitlement[]> {
  if (!iapAvailable()) return [];
  const { entitlements } = await SayUpStore.restore();
  remember(entitlements);
  return entitlements;
}

export async function refreshEntitlements(): Promise<Entitlement[]> {
  if (!iapAvailable()) return cachedEntitlements();
  try {
    const { entitlements } = await SayUpStore.getEntitlements();
    remember(entitlements);
    return entitlements;
  } catch {
    return cachedEntitlements();
  }
}

export async function openManageSubscriptions(): Promise<boolean> {
  if (!iapAvailable()) return false;
  try { await SayUpStore.manageSubscriptions(); return true; } catch { return false; }
}

let listening = false;
export function watchEntitlements() {
  if (listening || !iapAvailable()) return;
  listening = true;
  void SayUpStore.addListener('entitlementsChanged', ({ entitlements }) => remember(entitlements));
}

/** Records the Apple-signed transaction against the signed-in learner so web/iPad unlock too. */
export async function syncEntitlementsToCloud(list: Entitlement[]): Promise<void> {
  const active = list.filter(e => planForProduct(e.productId) !== null);
  if (!active.length) return;
  const { recordAppleSubscription } = await import('@/utils/iap.functions');
  await Promise.all(active.map(e => recordAppleSubscription({ data: { jws: e.jws } }).catch(() => undefined)));
}
