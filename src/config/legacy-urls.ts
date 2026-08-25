/**
 * URLs inherited from the old Webflow site.
 *
 * That site was an unmodified YouTuber/creator template clone, so its 35 indexed
 * URLs split cleanly in two:
 *
 *  - A handful were genuine daycare pages (`/about`, `/contact`, `/camp`, …).
 *    Those get a 301 to the closest real page on this site.
 *  - The rest were template demo content (`/product/subscriber-hoodie`,
 *    `/youtube-video/piano`, `/paypal-checkout`, …). Those get a 410 Gone.
 *
 * The 410 matters: redirecting unrelated URLs to the homepage is treated by Google
 * as a soft 404, which keeps them in the index and in the Search Console error
 * report. A 410 tells Google the URL is intentionally gone and drops it quickly.
 *
 * Destinations are pinned to `/fr` rather than locale-detected, so crawlers always
 * get the same answer for the same URL.
 *
 * This module must stay dependency-free — `next.config.ts` imports it at build time.
 */

export type LegacyRedirect = {
  source: string
  destination: string
}

/** Old pages that had a real daycare equivalent. 301 → closest current page. */
export const LEGACY_REDIRECTS: ReadonlyArray<LegacyRedirect> = [
  { source: '/about', destination: '/fr/about' },
  { source: '/contact', destination: '/fr/contact' },
  { source: '/contacts', destination: '/fr/contact' },
  { source: '/camp', destination: '/fr/programs' },
  { source: '/waiting-list', destination: '/fr/contact' },
  { source: '/gallery', destination: '/fr#gallery' },
  // "When should you register your child at nursery" — the one genuinely relevant
  // article on the old blog. Waiting lists and registration timing are covered by
  // the FAQ until a real post replaces it.
  {
    source: '/article/when-should-you-register-your-child-at-nursery',
    destination: '/fr/faq',
  },
]

/** Template demo pages with no equivalent. Exact-match → 410 Gone. */
export const GONE_PATHS: ReadonlySet<string> = new Set([
  '/blog',
  '/changelog',
  '/checkout',
  '/events',
  '/home-copy',
  '/order-confirmation',
  '/paypal-checkout',
  '/start-here',
  '/store',
  '/videos',
])

/** Template demo sections with no equivalent. Prefix-match → 410 Gone. */
export const GONE_PREFIXES: ReadonlyArray<string> = [
  '/blog-category/',
  '/category/',
  '/event/',
  '/product/',
  '/youtube-video/',
]

/**
 * True when a path belongs to the retired Webflow template and should return 410.
 * `pathname` is expected without a locale prefix and without a trailing slash.
 */
export const isGonePath = (pathname: string): boolean => {
  if (GONE_PATHS.has(pathname)) return true
  return GONE_PREFIXES.some((prefix) => pathname.startsWith(prefix))
}
