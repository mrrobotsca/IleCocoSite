import type { Metadata } from 'next'
import { headers } from 'next/headers'
import {
  Geist,
  Bricolage_Grotesque,
  Quicksand,
  Fraunces,
  Caveat,
} from 'next/font/google'

import '@/app/_styles/globals.css'
import { QueryProvider } from '@/app/_providers/query-provider'
import { ToastProvider } from '@/components/ui/toast'
import { generateMetadata, siteConfig } from '@/lib/seo'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'], display: 'swap' })

const bricolageGrotesque = Bricolage_Grotesque({
  variable: '--font-bricolage-grotesque',
  subsets: ['latin'],
  display: 'swap',
})

const quicksand = Quicksand({
  variable: '--font-quicksand',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const caveat = Caveat({
  variable: '--font-caveat',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  display: 'swap',
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
      <body
        className={`${geistSans.variable} ${bricolageGrotesque.variable} ${quicksand.variable} ${fraunces.variable} ${caveat.variable} antialiased`}
      >
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
