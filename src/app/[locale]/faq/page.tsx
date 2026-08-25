import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PageShell } from '../(site)/page-shell'
import { FAQ_PAGE_COPY } from '../(site)/copy-pages'
import { COPY } from '../(site)/copy'
import { BOOKING_URL } from '../(site)/links'
import { JsonLd } from '@/components/seo/json-ld'
import {
  generateMetadata as buildMetadata,
  getBreadcrumbSchema,
  getLocaleHref,
  LOCALES,
  type Locale,
} from '@/lib/seo'
import { getFaqSchema } from '@/lib/structured-data'
import { getBrandConfig } from '@/config/branding'

type Props = { params: Promise<{ locale: string }> }

const isLocale = (v: string): v is Locale => (LOCALES as ReadonlyArray<string>).includes(v)

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }))

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const copy = FAQ_PAGE_COPY[raw]

  return buildMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    locale: raw,
    path: '/faq',
  })
}

export default async function FaqPage({ params }: Props) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw
  const copy = FAQ_PAGE_COPY[locale]
  const brand = getBrandConfig()

  // The six homepage questions plus the five that only make sense with room to
  // answer them. Rendered with <details> so every answer is in the HTML.
  const items = [...COPY.faq[locale].items, ...copy.extra]

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === 'fr' ? 'Accueil' : 'Home', url: getLocaleHref(locale, '/') },
    { name: 'FAQ', url: getLocaleHref(locale, '/faq') },
  ])
  const faqSchema = getFaqSchema(items)

  return (
    <>
      <PageShell
        locale={locale}
        eyebrow={copy.eyebrow}
        title={copy.h1}
        intro={copy.intro}
        current='FAQ'
      >
        <section className='mt-14 max-w-[820px]'>
          <div className='space-y-4'>
            {items.map((item) => (
              <details
                key={item.q}
                className='group rounded-[18px] bg-white/60 p-6 shadow-[0_4px_20px_rgba(58,58,58,0.04)]'
              >
                <summary className='cursor-pointer list-none font-display text-[17px] font-semibold tracking-[-0.01em]'>
                  {item.q}
                </summary>
                <p className='mt-3 text-[15px] leading-[1.65] text-charcoal-deep/75'>{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className='mt-16'>
          <h2 className='font-display text-[clamp(22px,2.5vw,30px)] font-semibold tracking-[-0.01em]'>
            {locale === 'fr' ? 'Nos deux garderies' : 'Our two daycares'}
          </h2>
          <div className='mt-6 grid gap-5 sm:grid-cols-2'>
            {brand.locations.map((location) => (
              <Link
                key={location.slug}
                href={getLocaleHref(locale, `/locations/${location.slug}`)}
                className='group rounded-[22px] border border-charcoal-deep/10 p-7 transition-all hover:-translate-y-0.5 hover:border-charcoal-deep/25'
              >
                <p className='font-display text-[18px] font-semibold tracking-[-0.01em]'>
                  {location.name}
                </p>
                <p className='mt-2 text-[14px] text-charcoal-deep/70'>
                  {location.addressLine}, {location.locality}
                </p>
                <span className='mt-4 inline-flex items-center gap-2 text-[14px] font-semibold underline-offset-4 group-hover:underline'>
                  {locale === 'fr' ? 'Voir cette garderie' : 'See this daycare'}
                  <span aria-hidden='true'>→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className='mt-16 mb-24 rounded-[24px] border border-charcoal-deep/10 px-8 py-10 text-center'>
          <h2 className='font-display text-[20px] font-semibold tracking-[-0.01em]'>
            {copy.ctaTitle}
          </h2>
          <p className='mx-auto mt-3 max-w-[520px] text-[15px] leading-[1.6] text-charcoal-deep/70'>
            {copy.ctaBody}
          </p>
          <div className='mt-6 flex flex-wrap items-center justify-center gap-3'>
            <a
              href={BOOKING_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='inline-flex items-center gap-2.5 rounded-full bg-charcoal-deep px-7 py-3.5 font-display text-[15px] font-semibold text-porcelain transition-all hover:-translate-y-0.5 hover:bg-black'
            >
              {locale === 'fr' ? 'Réserver une visite' : 'Book a visit'}
            </a>
            <Link
              href={getLocaleHref(locale, '/contact')}
              className='inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-charcoal-deep/20 px-7 py-3.5 font-display text-[15px] font-semibold text-charcoal-deep transition-all hover:bg-charcoal-deep/5'
            >
              {locale === 'fr' ? 'Nous joindre' : 'Contact us'}
            </Link>
          </div>
        </section>
      </PageShell>
      <JsonLd id='ld-breadcrumb' data={breadcrumbSchema} />
      <JsonLd id='ld-faq' data={faqSchema} />
    </>
  )
}
