import { describe, expect, it } from 'vitest';
import fs from 'fs';
import path from 'path';
import { IAP_BUNDLE_ID, IAP_PRODUCT_IDS, PLAN_IDS, hasActiveEntitlement, planForProduct, iapAvailable, type Entitlement } from '@/lib/iap';
import { subscriptionStatus } from '@/lib/apple-iap.server';
import { DICT } from '@/lib/i18n';

const ent = (productId: string, expiresDate?: number): Entitlement => ({ productId, transactionId: '1', originalTransactionId: '1', purchaseDate: 0, environment: 'Sandbox', jws: 'x', ...(expiresDate !== undefined ? { expiresDate } : {}) });

describe('Apple in-app purchase wiring', () => {
  it('every plan shown in the paywall maps to an App Store product id', () => {
    for (const p of DICT.zh.plans) expect(IAP_PRODUCT_IDS[p.id as keyof typeof IAP_PRODUCT_IDS]).toMatch(/^com\.sayup\.english\.sub\./);
    expect(PLAN_IDS).toEqual(['month', 'quarter', 'year']);
    expect(planForProduct('com.sayup.english.sub.quarter')).toBe('quarter');
    expect(planForProduct('com.other.app')).toBeNull();
  });

  it('StoreKit test configuration and native project carry the same product ids and bundle id', () => {
    const storekit = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), 'ios/App/App/SayUp.storekit'), 'utf8'));
    const ids = storekit.subscriptionGroups.flatMap((g: { subscriptions: { productID: string }[] }) => g.subscriptions.map(s => s.productID)).sort();
    expect(ids).toEqual(Object.values(IAP_PRODUCT_IDS).sort());
    const pbx = fs.readFileSync(path.resolve(process.cwd(), 'ios/App/App.xcodeproj/project.pbxproj'), 'utf8');
    expect(pbx).toContain(`PRODUCT_BUNDLE_IDENTIFIER = ${IAP_BUNDLE_ID};`);
    expect(pbx).toContain('SayUpStorePlugin.swift in Sources');
    // Capacitor registers every ObjC-visible class conforming to CAPBridgedPlugin at runtime.
    const swift = fs.readFileSync(path.resolve(process.cwd(), 'ios/App/App/SayUpStorePlugin.swift'), 'utf8');
    expect(swift).toContain('@objc(SayUpStorePlugin)');
    expect(swift).toMatch(/class SayUpStorePlugin\s*:\s*CAPPlugin,\s*CAPBridgedPlugin/);
    expect(swift).toContain('public let jsName = "SayUpStore"');
    for (const m of ['getProducts', 'purchase', 'restore', 'getEntitlements', 'manageSubscriptions']) expect(swift).toContain(`CAPPluginMethod(name: "${m}"`);
  });

  it('entitlement check honours expiry and ignores foreign products', () => {
    const now = Date.parse('2026-11-08T00:00:00Z');
    expect(hasActiveEntitlement([ent(IAP_PRODUCT_IDS.month, now + 1000)], now)).toBe(true);
    expect(hasActiveEntitlement([ent(IAP_PRODUCT_IDS.month, now - 1000)], now)).toBe(false);
    expect(hasActiveEntitlement([ent('com.other.app.sub', now + 1000)], now)).toBe(false);
    expect(hasActiveEntitlement([], now)).toBe(false);
  });

  it('server maps revoked or expired transactions to canceled', () => {
    const now = Date.parse('2026-11-08T00:00:00Z');
    const base = { transactionId: '1', originalTransactionId: '1', bundleId: IAP_BUNDLE_ID, productId: IAP_PRODUCT_IDS.year, purchaseDate: now - 10, environment: 'Production' };
    expect(subscriptionStatus({ ...base, expiresDate: now + 10 }, now)).toBe('active');
    expect(subscriptionStatus({ ...base, expiresDate: now - 10 }, now)).toBe('canceled');
    expect(subscriptionStatus({ ...base, expiresDate: now + 10, revocationDate: now - 1 }, now)).toBe('canceled');
  });

  it('IAP is unavailable in the browser / web build', () => {
    expect(iapAvailable()).toBe(false);
  });
});
