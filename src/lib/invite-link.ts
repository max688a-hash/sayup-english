export const INVITE_KEY = 'sayup-invite';
const CODE_RE = /^[A-Z0-9]{4,12}$/;

// Saves ?invite=CODE from a shared link so the invite card can apply it after sign-up.
export function rememberInviteFromUrl() {
  try {
    const q = new URLSearchParams(window.location.search);
    const c = q.get('invite')?.trim().toUpperCase();
    if (!c) return;
    if (CODE_RE.test(c)) localStorage.setItem(INVITE_KEY, c);
    q.delete('invite');
    window.history.replaceState(null, '', window.location.pathname + (q.toString() ? '?' + q.toString() : ''));
  } catch { /* storage unavailable */ }
}
