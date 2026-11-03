import { notFound } from 'next/navigation'
import { LOCALES, type Locale } from '@/lib/seo'
import { ConsentBanner } from '@/components/analytics/consent-banner'
import { MobileCallBar } from './(site)/mobile-call-bar'

const isLocale = (v: string): v is Locale => (LOCALES as ReadonlyArray<string>).includes(v)

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }))

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!isLocale(locale)) notFound()

  // The locale-aware <html lang> attribute and the Google tag in <head> are set
  // by the root layout based on the URL prefix (see src/app/layout.tsx).
  return (
    <>
      {children}
      <MobileCallBar lang={locale} />
      <ConsentBanner lang={locale} />
    </>
  )
}
