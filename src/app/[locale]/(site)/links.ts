import type { Lang } from './copy'

// External links — single source of truth so we never duplicate-and-drift.
// BOOKING_URL is only the Calendly embed source: tour CTAs point at the embed on
// the contact page (bookTourHref) so bookings can be tracked as conversions.
export const BOOKING_URL = 'https://calendly.com/ilecocodaycare'
export const INSTAGRAM_URL = 'https://www.instagram.com/ilecocodaycare/'
export const INSTAGRAM_HANDLE = '@ilecocodaycare'
export const CONTACT_EMAIL = 'info@ilecoco.com'
export const EMAIL_HREF = `mailto:${CONTACT_EMAIL}`
export const PHONE_DISPLAY = '(514) 574-4695'
export const PHONE_HREF = 'tel:+15145744695'

/** Anchor id of the Calendly embed on the contact page. */
export const BOOK_TOUR_ANCHOR = 'book-tour'
export const bookTourHref = (lang: Lang) => `/${lang}/contact#${BOOK_TOUR_ANCHOR}`

/** Thank-you page after a waitlist submit — the slug differs per language. */
export const THANK_YOU_PATH: Record<Lang, string> = { fr: '/merci', en: '/thank-you' }

/**
 * Primary navigation, as real locale-prefixed routes.
 *
 * Both location pages are here on purpose: they are the pages most likely to rank
 * for "garderie NDG" / "daycare Lachine", and until now the only internal links
 * pointing at them were two cards two-thirds of the way down the homepage.
 *
 * `key` indexes into `COPY.nav[lang]`; `path` is locale-relative.
 */
export const NAV_LINKS = [
  { key: 'programs', path: '/programs' },
  { key: 'somerled', path: '/locations/somerled' },
  { key: 'lachine', path: '/locations/lachine' },
  { key: 'faq', path: '/faq' },
  { key: 'contact', path: '/contact' },
] as const

export type NavKey = (typeof NAV_LINKS)[number]['key']
