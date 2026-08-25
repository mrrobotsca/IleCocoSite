import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { LangProvider } from './(site)/lang-context'
import { WizardProvider } from './(site)/wizard-context'
import { DaycareNav } from './(site)/daycare-nav'
import Hero from './(site)/hero'
import Mission from './(site)/mission'
import Services from './(site)/services'
import Why from './(site)/why'
import Journey from './(site)/journey'
import Gallery from './(site)/gallery'
import Testimonials from './(site)/testimonials'
import Locations from './(site)/locations'
import FAQ from './(site)/faq'
import Social from './(site)/social'
import DaycareFooter from './(site)/footer'
import { WaitlistWizard } from './(site)/waitlist-wizard'
import { COPY } from './(site)/copy'
import { JsonLd } from '@/components/seo/json-ld'
import { generateMetadata as buildMetadata, LOCALES, type Locale } from '@/lib/seo'
import {
  getOrganizationSchema,
  getWebsiteSchema,
  getFaqSchema,
} from '@/lib/structured-data'

const isLocale = (v: string): v is Locale => (LOCALES as ReadonlyArray<string>).includes(v)

type PageProps = { params: Promise<{ locale: string }> }

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }))

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const locale = raw

  const title =
    locale === 'fr'
      ? 'Garderie bilingue à NDG (Somerled) et Lachine | Ile Coco'
      : 'Bilingual Daycare in NDG (Somerled) & Lachine, Montréal | Ile Coco'
  const description =
    locale === 'fr'
      ? 'Petite garderie chaleureuse à NDG (Somerled) et Lachine. Bilingue (français/anglais), repas maison, sans écrans. 18 mois à 5 ans. 4,8★ sur Google.'
      : 'A small, warm bilingual daycare in NDG (Somerled) and Lachine. House-made meals, screen-free, ages 18 months to 5 years. 4.8★ on Google.'

  return buildMetadata({
    title,
    description,
    locale,
    path: '/',
    image: '/opengraph-image.jpg',
    imageAlt:
      locale === 'fr'
        ? 'Garderie Ile Coco — NDG et Lachine, Montréal'
        : 'Ile Coco Daycare — NDG and Lachine, Montréal',
  })
}

export default async function Page({ params }: PageProps) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw

  const faqItems = COPY.faq[locale].items
  const faqSchema = getFaqSchema(faqItems)

  return (
    <LangProvider initialLang={locale}>
      <WizardProvider>
        <div className="min-h-screen bg-porcelain font-display text-charcoal-deep paper-grain">
          <DaycareNav />
          <main>
            <Hero />
            <Mission />
            <Services />
            <Why />
            <Journey />
            <Gallery />
            <Testimonials />
            <Locations />
            <FAQ />
            <Social />
          </main>
          <DaycareFooter />
        </div>
        <WaitlistWizard />
        <JsonLd id="ld-organization" data={getOrganizationSchema(locale)} />
        <JsonLd id="ld-website" data={getWebsiteSchema(locale)} />
        <JsonLd id="ld-faq" data={faqSchema} />
      </WizardProvider>
    </LangProvider>
  )
}
