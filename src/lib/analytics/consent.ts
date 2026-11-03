/**
 * Cookie consent for Google Consent Mode v2 (Québec Law 25: opt-in, refusing as
 * easy as accepting, choice can be changed later).
 *
 * The choice lives in a first-party cookie so the inline tag script in <head> can
 * read it before gtag sends anything — see `components/analytics/google-tag.tsx`.
 */

export const CONSENT_COOKIE = 'ilecoco_consent'

// Law 25 guidance is to ask again periodically; six months keeps it reasonable.
const CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 182

/** Fired on window to reopen the banner (footer "Cookie settings" link). */
export const OPEN_CONSENT_EVENT = 'ilecoco:open-consent'

export type ConsentChoice = 'granted' | 'denied'

export const CONSENT_SIGNALS = [
  'ad_storage',
  'analytics_storage',
  'ad_user_data',
  'ad_personalization',
] as const

export const consentState = (choice: ConsentChoice) =>
  Object.fromEntries(CONSENT_SIGNALS.map((signal) => [signal, choice]))

export const readConsent = (): ConsentChoice | null => {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(new RegExp(`(?:^|; )${CONSENT_COOKIE}=(granted|denied)`))
  return match ? (match[1] as ConsentChoice) : null
}

export const saveConsent = (choice: ConsentChoice) => {
  const secure = window.location.protocol === 'https:' ? '; secure' : ''
  document.cookie = `${CONSENT_COOKIE}=${choice}; path=/; max-age=${CONSENT_MAX_AGE_SECONDS}; samesite=lax${secure}`
  window.gtag?.('consent', 'update', consentState(choice))
}
