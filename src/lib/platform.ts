import { Capacitor } from '@capacitor/core';

/** True inside the iOS App Store build: no in-app purchase UI may appear there (App Store Guideline 3.1.1). */
export function isIosApp() {
  try { return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios'; } catch { return false; }
}
