/**
 * Google Ads tag (gtag.js) — single source of truth for the tag ID, the lead
 * events, and their conversion labels.
 */

export const GOOGLE_TAG_ID = 'AW-17551187332'

export type LeadEvent = 'generate_lead' | 'phone_click' | 'email_click' | 'book_tour'

/**
 * Google Ads conversion labels, one per lead event.
 *
 * Paste the part after the slash from the `send_to: 'AW-17551187332/XXXX'` value
 * Google Ads gives you for each conversion action. Leave a label empty and the
 * event still fires — it just isn't attached to a conversion action yet.
 */
export const CONVERSION_LABELS: Record<LeadEvent, string> = {
  generate_lead: '',
  phone_click: '',
  email_click: '',
  book_tour: '',
}

type Gtag = (...args: unknown[]) => void

declare global {
  interface Window {
    gtag?: Gtag
    dataLayer?: unknown[]
  }
}

/** Fires a lead event. No-op when the tag isn't on the page (admin pages, blockers). */
export const trackLeadEvent = (event: LeadEvent, params: Record<string, string> = {}) => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  const label = CONVERSION_LABELS[event]
  window.gtag('event', event, label ? { ...params, send_to: `${GOOGLE_TAG_ID}/${label}` } : params)
}

/** Sends a page_view for client-side route changes (gtag only sends one on full loads). */
export const trackPageView = () => {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('event', 'page_view', {
    page_location: window.location.href,
    page_title: document.title,
    send_to: GOOGLE_TAG_ID,
  })
}

// The waitlist form sets this right after a successful submit; the thank-you page
// consumes it. That is what keeps `generate_lead` to real submissions: opening,
// reloading or bookmarking the thank-you page finds no flag and fires nothing.
const LEAD_FLAG_KEY = 'ilecoco:lead-submitted'

export const markLeadSubmitted = () => {
  try {
    window.sessionStorage.setItem(LEAD_FLAG_KEY, '1')
  } catch {
    // sessionStorage can be blocked (private mode); the lead is still saved server-side.
  }
}

/** Returns true once per successful submit, then clears the flag. */
export const consumeLeadSubmitted = (): boolean => {
  try {
    if (window.sessionStorage.getItem(LEAD_FLAG_KEY) !== '1') return false
    window.sessionStorage.removeItem(LEAD_FLAG_KEY)
    return true
  } catch {
    return false
  }
}
