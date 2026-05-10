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

const hasLocalePrefix = (pathname: string): boolean => {
  return LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))
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
