// External links — single source of truth so we never duplicate-and-drift.
export const BOOKING_URL = 'https://calendly.com/ilecocodaycare'
export const INSTAGRAM_URL = 'https://www.instagram.com/ilecocodaycare/'
export const INSTAGRAM_HANDLE = '@ilecocodaycare'
export const CONTACT_EMAIL = 'info@ilecoco.com'

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
  { key: 'tuition', path: '/tuition' },
  { key: 'faq', path: '/faq' },
  { key: 'contact', path: '/contact' },
] as const

export type NavKey = (typeof NAV_LINKS)[number]['key']
