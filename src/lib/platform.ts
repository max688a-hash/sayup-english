import { Capacitor } from '@capacitor/core';

/** True inside the iOS App Store build: no in-app purchase UI may appear there (App Store Guideline 3.1.1). */
export function isIosApp(): boolean {
  try {
    if (Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'ios') return true;
    if (typeof window !== 'undefined') {
      const isCapacitorProto = window.location.protocol === 'capacitor:' || window.location.protocol === 'ionic:';
      const isIosUA = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      return isCapacitorProto && isIosUA;
    }
    return false;
  } catch {
    return false;
  }
}

export function isNativeApp(): boolean {
  try {
    if (Capacitor.isNativePlatform()) return true;
    if (typeof window !== 'undefined') {
      if (window.location.protocol === 'capacitor:' || window.location.protocol === 'ionic:') return true;
      if (navigator.userAgent.includes('Capacitor')) return true;
      // On real mobile screens or standalone PWA, never render a phone inside a phone
      if (window.innerWidth <= 768) return true;
      if (window.matchMedia && window.matchMedia('(display-mode: standalone)').matches) return true;
    }
    return false;
  } catch {
    return false;
  }
}
