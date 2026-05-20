import { NextRequest, NextResponse } from 'next/server'

const LOCALES = ['en', 'fr'] as const
const DEFAULT_LOCALE: (typeof LOCALES)[number] = 'fr'

// Paths that should NOT be locale-prefixed: auth, dashboard, api,
// premium-purchase (legacy ShipFree route), pricing, sentry, static files.
const NON_LOCALE_PATHS = [
  '/login',
  '/register',
  '/reset-password',
  '/verify',
  '/dashboard',
  '/premium-purchase',
  '/pricing',
  '/sentry-example-page',
  '/sentry-example-api',
]

// Legacy / guessable URLs that would otherwise 404. We map each to a real
// destination and 308-redirect, so stray inbound links and typed URLs never
// land on a 404 (and never show up in Google Search Console's 404 report).
// Targets are locale-relative; the `#fragment` form points at a homepage section.
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
  '/contact': '/#contact',
  '/faq': '/#faq',
  '/programs': '/#programs',
  '/programmes': '/#programs',
  '/gallery': '/#gallery',
  '/galerie': '/#gallery',
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

export const config = {
  // Run on every request except: Next.js internals (_next/*), API routes (api/*),
  // static asset roots (favicon, image, manifest, sitemap, robots, monitoring),
  // and any path containing a file extension (e.g. /grain.jpg).
  matcher: [
    '/((?!_next/|api/|favicon\\.ico|image\\.png|opengraph-image\\.png|twitter-image\\.png|manifest\\.webmanifest|sitemap\\.xml|robots\\.txt|monitoring|.*\\..*).*)',
  ],
}

export default function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl

  // Always expose the pathname so the root layout can pick the right <html lang>.
  const requestHeaders = new Headers(req.headers)
  requestHeaders.set('x-pathname', pathname)

  // Legacy / guessable URL → 308-redirect to a real, indexable destination.
  const { locale: prefixLocale, rest } = stripLocale(pathname)
  const aliasKey = (rest.replace(/\/$/, '') || '/').toLowerCase()
  const aliasTarget = ALIASES[aliasKey]
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

  // Otherwise, redirect to the user's preferred locale.
  const locale = detectLocale(req)
  const target = pathname === '/' ? `/${locale}` : `/${locale}${pathname}`
  const url = req.nextUrl.clone()
  url.pathname = target
  url.search = search
  return NextResponse.redirect(url, 308)
}
