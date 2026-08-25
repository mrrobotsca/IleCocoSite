import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PageShell } from '../(site)/page-shell'
import { ABOUT_COPY } from '../(site)/copy-pages'
import { PHOTOS } from '../(site)/copy'
import { BOOKING_URL } from '../(site)/links'
import { JsonLd } from '@/components/seo/json-ld'
import {
  generateMetadata as buildMetadata,
  getBreadcrumbSchema,
  getLocaleHref,
  LOCALES,
  type Locale,
} from '@/lib/seo'
import { getOrganizationSchema } from '@/lib/structured-data'

type Props = { params: Promise<{ locale: string }> }

const isLocale = (v: string): v is Locale => (LOCALES as ReadonlyArray<string>).includes(v)

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }))

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const copy = ABOUT_COPY[raw]

  return buildMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    locale: raw,
    path: '/about',
  })
}

export default async function AboutPage({ params }: Props) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw
  const copy = ABOUT_COPY[locale]

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === 'fr' ? 'Accueil' : 'Home', url: getLocaleHref(locale, '/') },
    { name: copy.eyebrow, url: getLocaleHref(locale, '/about') },
  ])

  return (
    <>
      <PageShell
        locale={locale}
        eyebrow={copy.eyebrow}
        title={copy.h1}
        intro={copy.intro}
        current={copy.eyebrow}
      >
        <div className='relative mt-12 aspect-[16/9] overflow-hidden rounded-[28px]'>
          <Image
            src={PHOTOS.why}
            alt={
              locale === 'fr'
                ? 'Une éducatrice d’Ile Coco avec des enfants à la garderie bilingue de NDG (Somerled), Montréal'
                : 'An Ile Coco educator with children at our bilingual daycare in NDG (Somerled), Montréal'
            }
            fill
            sizes='(max-width: 1100px) 100vw, 1100px'
            className='object-cover'
            priority
          />
        </div>

        <section className='mt-16'>
          <h2 className='sr-only'>{copy.statsTitle}</h2>
          <dl className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'>
            {copy.stats.map((stat) => (
              <div
                key={stat.label}
                className='rounded-[22px] bg-white/70 p-7 shadow-[0_6px_24px_rgba(58,58,58,0.05)]'
              >
                <dt className='order-2 mt-2 text-[13px] leading-[1.4] text-charcoal-deep/65'>
                  {stat.label}
                </dt>
                <dd className='order-1 font-display text-[30px] font-medium leading-none tracking-[-0.02em]'>
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section className='mt-16 max-w-[760px] space-y-12'>
          {copy.sections.map((section) => (
            <div key={section.title}>
              <h2 className='font-display text-[clamp(22px,2.5vw,32px)] font-medium tracking-[-0.01em]'>
                {section.title}
              </h2>
              <p className='mt-4 text-[16px] leading-[1.75] text-charcoal-deep/80'>
                {section.body}
              </p>
            </div>
          ))}
        </section>

        <section className='mt-16 mb-24 rounded-[24px] border border-charcoal-deep/10 px-8 py-10 text-center'>
          <h2 className='font-display text-[20px] font-semibold tracking-[-0.01em]'>
            {locale === 'fr' ? 'Venez nous rencontrer' : 'Come meet us'}
          </h2>
          <p className='mx-auto mt-3 max-w-[520px] text-[15px] leading-[1.6] text-charcoal-deep/70'>
            {locale === 'fr'
              ? 'La meilleure façon de comprendre Ile Coco, c’est de passer une heure dans nos salles.'
              : 'The best way to understand Ile Coco is to spend an hour in the rooms.'}
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
              href={getLocaleHref(locale, '/programs')}
              className='inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-charcoal-deep/20 px-7 py-3.5 font-display text-[15px] font-semibold text-charcoal-deep transition-all hover:bg-charcoal-deep/5'
            >
              {locale === 'fr' ? 'Voir les programmes' : 'See the programs'}
            </Link>
          </div>
        </section>
      </PageShell>
      <JsonLd id='ld-breadcrumb' data={breadcrumbSchema} />
      <JsonLd id='ld-organization' data={getOrganizationSchema(locale)} />
    </>
  )
}
