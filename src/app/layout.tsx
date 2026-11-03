import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Geist, Quicksand, Fraunces, Caveat } from 'next/font/google'

import '@/app/_styles/globals.css'
import { QueryProvider } from '@/app/_providers/query-provider'
import { AnalyticsListeners } from '@/components/analytics/analytics-listeners'
import { GoogleTag } from '@/components/analytics/google-tag'
import { ToastProvider } from '@/components/ui/toast'
import { generateMetadata, siteConfig } from '@/lib/seo'

// Only Quicksand (all site text) and Fraunces italic (headline accents) are
// preloaded. Geist is the dashboard font and Caveat is decorative, so preloading
// them only competed with the first paint on mobile.
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: false,
})

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

// Only ever used through `.font-italic-serif`, so the upright style isn't loaded.
const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  style: ['italic'],
  display: 'swap',
})

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  ...generateMetadata({
    title: 'Ile Coco · Bilingual daycare in NDG & Lachine, Montréal',
    description: siteConfig.description.en,
    isRootLayout: true,
  }),
  icons: {
    icon: '/image.png',
    shortcut: '/image.png',
    apple: '/image.png',
  },
}

/** The public FR/EN site — the only pages that carry the Google tag. */
const isSitePath = (pathname: string | null): boolean =>
  !!pathname && /^\/(en|fr)(\/|$)/.test(pathname)

const detectLangFromPath = (pathname: string | null): 'en' | 'fr' => {
  if (!pathname) return 'en'
  if (pathname === '/fr' || pathname.startsWith('/fr/')) return 'fr'
  return 'en'
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const headerStore = await headers()
  const pathname = headerStore.get('x-pathname')
  const lang = detectLangFromPath(pathname)

  return (
    <html lang={lang}>
      <head>{isSitePath(pathname) && <GoogleTag />}</head>
      <body
        className={`${geistSans.variable} ${quicksand.variable} ${fraunces.variable} ${caveat.variable} antialiased`}
      >
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
        {/* Here rather than in [locale]/layout so it survives FR↔EN switches. */}
        {isSitePath(pathname) && <AnalyticsListeners />}
      </body>
    </html>
  )
}
