import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PageShell } from '../(site)/page-shell'
import { TUITION_COPY } from '../(site)/copy-pages'
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

type Props = { params: Promise<{ locale: string }> }

const isLocale = (v: string): v is Locale => (LOCALES as ReadonlyArray<string>).includes(v)

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }))

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const copy = TUITION_COPY[raw]

  return buildMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    locale: raw,
    path: '/tuition',
  })
}

export default async function TuitionPage({ params }: Props) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw
  const copy = TUITION_COPY[locale]
  // Rate cards were already written in `copy.ts` for a homepage section that was
  // never rendered. Reused here so there is a single source of truth for pricing.
  const rates = COPY.tuition[locale]

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === 'fr' ? 'Accueil' : 'Home', url: getLocaleHref(locale, '/') },
    { name: copy.eyebrow, url: getLocaleHref(locale, '/tuition') },
  ])

  // "Are you subsidized?" is the highest-intent question on this page — worth
  // marking up so it can surface as its own answer.
  const faqSchema = getFaqSchema([{ q: copy.subsidyTitle, a: copy.subsidyBody }])

  return (
    <>
      <PageShell
        locale={locale}
        eyebrow={copy.eyebrow}
        title={copy.h1}
        intro={copy.intro}
        current={copy.eyebrow}
      >
        <section className='mt-16'>
          <h2 className='font-display text-[clamp(24px,3vw,36px)] font-medium tracking-[-0.01em]'>
            {copy.ratesTitle}
          </h2>
          <div className='mt-8 grid gap-6 sm:grid-cols-2'>
            {rates.items.map((item, i) => (
              <div
                key={item.tag}
                className='relative rounded-[24px] bg-white/75 p-8 shadow-[0_8px_28px_rgba(58,58,58,0.06)]'
              >
                {i === 0 && (
                  <span className='absolute right-6 top-6 rounded-full bg-sunlit-clay px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-charcoal-deep'>
                    {rates.mostCommon}
                  </span>
                )}
                <p className='text-[12px] font-bold uppercase tracking-[0.1em] text-charcoal-deep/55'>
                  {item.tag}
                </p>
                <p className='mt-4 font-display text-[44px] font-medium leading-none tracking-[-0.02em]'>
                  {item.price}
                  <span className='ml-1 text-[16px] font-normal text-charcoal-deep/60'>
                    {item.per}
                  </span>
                </p>
                <p className='mt-4 text-[15px] leading-[1.65] text-charcoal-deep/75'>{item.note}</p>
              </div>
            ))}
          </div>
          <p className='mt-6 text-[15px] leading-[1.6] text-charcoal-deep/70'>{rates.includes}</p>
        </section>

        <section className='mt-16 grid gap-8 md:grid-cols-2'>
          <div className='rounded-[24px] bg-white/70 p-8 shadow-[0_6px_24px_rgba(58,58,58,0.05)]'>
            <h2 className='font-display text-[20px] font-semibold tracking-[-0.01em]'>
              {copy.includedTitle}
            </h2>
            <ul className='mt-5 space-y-3'>
              {copy.included.map((item) => (
                <li key={item} className='flex gap-3 text-[15px] leading-[1.6] text-charcoal-deep/80'>
                  <span aria-hidden='true' className='text-sunlit-clay'>
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className='rounded-[24px] border border-charcoal-deep/10 p-8'>
            <h2 className='font-display text-[20px] font-semibold tracking-[-0.01em]'>
              {copy.notIncludedTitle}
            </h2>
            <ul className='mt-5 space-y-3'>
              {copy.notIncluded.map((item) => (
                <li key={item} className='flex gap-3 text-[15px] leading-[1.6] text-charcoal-deep/80'>
                  <span aria-hidden='true' className='text-charcoal-deep/40'>
                    •
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className='mt-16 rounded-[28px] bg-white/70 p-8 shadow-[0_8px_32px_rgba(58,58,58,0.06)] sm:p-10'>
          <h2 className='font-display text-[clamp(22px,2.5vw,30px)] font-semibold tracking-[-0.01em]'>
            {copy.subsidyTitle}
          </h2>
          <p className='mt-4 max-w-[760px] text-[16px] leading-[1.7] text-charcoal-deep/80'>
            {copy.subsidyBody}
          </p>
        </section>

        <section className='mt-16 mb-24 rounded-[24px] border border-charcoal-deep/10 px-8 py-10 text-center'>
          <h2 className='font-display text-[20px] font-semibold tracking-[-0.01em]'>
            {copy.ctaTitle}
          </h2>
          <p className='mx-auto mt-3 max-w-[560px] text-[15px] leading-[1.6] text-charcoal-deep/70'>
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
              href={getLocaleHref(locale, '/faq')}
              className='inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-charcoal-deep/20 px-7 py-3.5 font-display text-[15px] font-semibold text-charcoal-deep transition-all hover:bg-charcoal-deep/5'
            >
              {locale === 'fr' ? 'Lire la FAQ' : 'Read the FAQ'}
            </Link>
          </div>
        </section>
      </PageShell>
      <JsonLd id='ld-breadcrumb' data={breadcrumbSchema} />
      <JsonLd id='ld-faq' data={faqSchema} />
    </>
  )
}
