import { type NextRequest, NextResponse } from 'next/server'

import { isGonePath } from '@/config/legacy-urls'

const LOCALES = ['en', 'fr'] as const
// Quebec audience: French is the default and the declared `x-default`. Must stay
// in sync with DEFAULT_LOCALE in `src/lib/seo.ts`, which drives hreflang and the
// sitemap — a mismatch means crawlers land on one locale while the site declares
// another as its default.
const DEFAULT_LOCALE: (typeof LOCALES)[number] = 'fr'

// Paths that should NOT be locale-prefixed: auth, dashboard, api,
// premium-purchase (legacy ShipFree route), sentry, static files.
const NON_LOCALE_PATHS = [
  '/login',
  '/register',
  '/reset-password',
  '/verify',
  '/dashboard',
  '/premium-purchase',
  '/sentry-example-page',
  '/sentry-example-api',
]

// Every locale-prefixable route on the site. The locale redirect is gated on this
// list so an unknown path returns a single clean 404 instead of a 308 into a 404
// (`/about` → 308 → `/fr/about` → 404), which is what filled Search Console's
// "Not found" and "Page with redirect" buckets at the same time.
const LOCALE_ROUTES = new Set([
  '/',
  '/about',
  '/contact',
  '/faq',
  '/locations/lachine',
  '/locations/somerled',
  '/licenses',
  '/privacy',
  '/programs',
  '/terms',
  '/tuition',
])

// Guessable URLs a human might type or an old inbound link might use. Each maps to
// a real destination and 308s, so they never land on a 404. Anything that became a
// real page (/contact, /faq, /programs) is deliberately absent — those are routes
// now, not redirects.
const ALIASES: Record<string, string> = {
  '/locations': '/#locations',
  '/location': '/#locations',
  '/somerled': '/locations/somerled',
  '/ndg': '/locations/somerled',
  '/garderie-ndg': '/locations/somerled',
  '/daycare-ndg': '/locations/somerled',
  '/garderie-somerled': '/locations/somerled',
  '/lachine': '/locations/lachine',
  '/garderie-lachine': '/locations/lachine',
  '/daycare-lachine': '/locations/lachine',
  '/programmes': '/programs',
  '/frais': '/tuition',
  '/pricing': '/tuition',
  '/prices': '/tuition',
  '/gallery': '/#gallery',
  '/galerie': '/#gallery',
  '/a-propos': '/about',
  '/nous-joindre': '/contact',
}

const hasLocalePrefix = (pathname: string): boolean => {
  return LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
}

// Split a pathname into its locale prefix (if any) and the rest.
const stripLocale = (
  pathname: string
): { locale: (typeof LOCALES)[number] | null; rest: string } => {
  for (const l of LOCALES) {
    if (pathname === `/${l}`) return { locale: l, rest: '/' }
    if (pathname.startsWith(`/${l}/`)) return { locale: l, rest: pathname.slice(l.length + 1) }
  }
  return { locale: null, rest: pathname }
}

const isExcludedFromLocale = (pathname: string): boolean => {
  if (NON_LOCALE_PATHS.some((p) => pathname === p || pathname.startsWith(`${p}/`))) return true
  return false
}

const detectLocale = (req: NextRequest): (typeof LOCALES)[number] => {
  // Cookie wins (returning visitor with explicit choice)
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value
  if (cookieLocale && (LOCALES as readonly string[]).includes(cookieLocale)) {
    return cookieLocale as (typeof LOCALES)[number]
  }

  // Otherwise Accept-Language — Quebec audience defaults to French.
  const accept = req.headers.get('accept-language') || ''
  const lower = accept.toLowerCase()
  if (lower.startsWith('fr') || lower.includes(',fr')) return 'fr'
  if (lower.startsWith('en') || lower.includes(',en')) return 'en'
  return DEFAULT_LOCALE
}

/**
 * 410 Gone for retired Webflow template URLs. Body is minimal on purpose — the
 * status code is what removes the URL from the index.
 */
const gone = (): NextResponse => {
  return new NextResponse(
    '<!doctype html><meta charset="utf-8"><title>Gone</title>' +
      '<p>This page no longer exists. <a href="/fr">Ile Coco</a></p>',
    {
      status: 410,
      headers: { 'content-type': 'text/html; charset=utf-8', 'x-robots-tag': 'noindex' },
    }
  )
}

export const config = {
  // Run on every request except: Next.js internals (_next/*), API routes (api/*),
  // static asset roots (favicon, image, manifest, sitemap, robots, monitoring),
  // and any path containing a file extension (e.g. /grain.jpg).
  matcher: [
    '/((?!_next/|api/|favicon\\.ico|image\\.png|opengraph-image\\.jpg|twitter-image\\.jpg|manifest\\.webmanifest|sitemap\\.xml|robots\\.txt|monitoring|.*\\..*).*)',
  ],
}

export default function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  // Always expose the pathname so the root layout can pick the right <html lang>.
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-pathname', pathname)

  const { locale: prefixLocale, rest } = stripLocale(pathname)
  const normalized = (rest.replace(/\/$/, '') || '/').toLowerCase()

  // Retired Webflow template URL → 410 Gone.
  if (isGonePath(normalized)) return gone()

  // Legacy / guessable URL → 308-redirect to a real, indexable destination.
  const aliasTarget = ALIASES[normalized]
  if (aliasTarget) {
    const locale = prefixLocale ?? detectLocale(req)
    const [aliasPath, aliasHash = ''] = aliasTarget.split('#')
    const url = req.nextUrl.clone()
    url.pathname = `/${locale}${aliasPath}`.replace(/\/$/, '') || `/${locale}`
    url.hash = aliasHash
    url.search = search
    return NextResponse.redirect(url, 308)
  }

  // Already locale-prefixed → just forward with the header set.
  if (hasLocalePrefix(pathname)) {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  // Routes that should never be locale-prefixed (auth, dashboard, etc.) → forward.
  if (isExcludedFromLocale(pathname)) {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  // Unknown path → let it 404 directly rather than redirecting into one.
  if (!LOCALE_ROUTES.has(normalized)) {
    return NextResponse.next({ request: { headers: requestHeaders } })
  }

  // Known route without a locale prefix → send the visitor to their locale.
  //
  // 302, not 308: the destination depends on the cookie and Accept-Language, so a
  // permanent redirect would let browsers and CDNs cache one visitor's language for
  // everyone. `Vary` tells caches the same thing.
  const locale = detectLocale(req)
  const target = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
  const url = req.nextUrl.clone()
  url.pathname = target
  url.search = search
  const response = NextResponse.redirect(url, 302)
  response.headers.set('Vary', 'Accept-Language, Cookie')
  return response
}
