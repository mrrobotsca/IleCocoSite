import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PageShell } from '../(site)/page-shell'
import { CONTACT_COPY } from '../(site)/copy-pages'
import { BOOKING_URL } from '../(site)/links'
import { JsonLd } from '@/components/seo/json-ld'
import {
  generateMetadata as buildMetadata,
  getBreadcrumbSchema,
  getLocaleHref,
  LOCALES,
  type Locale,
} from '@/lib/seo'
import { getDaycareLocationSchema } from '@/lib/structured-data'
import { getBrandConfig } from '@/config/branding'

type Props = { params: Promise<{ locale: string }> }

const isLocale = (v: string): v is Locale => (LOCALES as ReadonlyArray<string>).includes(v)

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }))

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const copy = CONTACT_COPY[raw]

  return buildMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    locale: raw,
    path: '/contact',
  })
}

export default async function ContactPage({ params }: Props) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw
  const copy = CONTACT_COPY[locale]
  const brand = getBrandConfig()

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === 'fr' ? 'Accueil' : 'Home', url: getLocaleHref(locale, '/') },
    { name: copy.eyebrow, url: getLocaleHref(locale, '/contact') },
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
        <section className='mt-14 grid gap-6 md:grid-cols-2'>
          {brand.locations.map((location) => {
            const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
              `${location.addressLine}, ${location.locality}, ${location.region} ${location.postalCode}`
            )}&output=embed`

            return (
              <div
                key={location.slug}
                className='overflow-hidden rounded-[28px] bg-white/70 shadow-[0_8px_32px_rgba(58,58,58,0.06)]'
              >
                <div className='p-8'>
                  <h2 className='font-display text-[clamp(20px,2.2vw,26px)] font-semibold tracking-[-0.01em]'>
                    {location.name}
                  </h2>
                  <address className='mt-5 space-y-4 not-italic text-[15px] text-charcoal-deep/85'>
                    <div>
                      <div className='text-[12px] font-semibold uppercase tracking-[0.08em] text-charcoal-deep/55'>
                        {copy.addressLabel}
                      </div>
                      <a
                        href={location.googleMapsUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:underline'
                      >
                        {location.addressLine}, {location.locality}, {location.region}{' '}
                        {location.postalCode}
                      </a>
                    </div>
                    <div>
                      <div className='text-[12px] font-semibold uppercase tracking-[0.08em] text-charcoal-deep/55'>
                        {copy.phoneLabel}
                      </div>
                      <a href={`tel:${location.phone}`} className='hover:underline'>
                        {location.phone}
                      </a>
                    </div>
                    <div>
                      <div className='text-[12px] font-semibold uppercase tracking-[0.08em] text-charcoal-deep/55'>
                        {copy.emailLabel}
                      </div>
                      <a href={`mailto:${location.email}`} className='hover:underline'>
                        {location.email}
                      </a>
                    </div>
                    <div>
                      <div className='text-[12px] font-semibold uppercase tracking-[0.08em] text-charcoal-deep/55'>
                        {copy.hoursLabel}
                      </div>
                      {copy.hours}
                    </div>
                  </address>
                  <Link
                    href={getLocaleHref(locale, `/locations/${location.slug}`)}
                    className='mt-6 inline-flex items-center gap-2 font-display text-[15px] font-semibold underline-offset-4 hover:underline'
                  >
                    {locale === 'fr' ? 'Voir cette garderie' : 'See this daycare'}
                    <span aria-hidden='true'>→</span>
                  </Link>
                </div>
                <iframe
                  src={mapEmbedUrl}
                  title={
                    locale === 'fr'
                      ? `Carte — ${location.name}`
                      : `Map — ${location.name}`
                  }
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  className='h-[240px] w-full border-0'
                />
              </div>
            )
          })}
        </section>

        <section className='mt-16 mb-24 grid gap-6 md:grid-cols-2'>
          <div className='rounded-[24px] border border-charcoal-deep/10 p-8'>
            <h2 className='font-display text-[20px] font-semibold tracking-[-0.01em]'>
              {copy.visitTitle}
            </h2>
            <p className='mt-3 text-[15px] leading-[1.6] text-charcoal-deep/75'>{copy.visitBody}</p>
            <a
              href={BOOKING_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-6 inline-flex items-center gap-2.5 rounded-full bg-charcoal-deep px-7 py-3.5 font-display text-[15px] font-semibold text-porcelain transition-all hover:-translate-y-0.5 hover:bg-black'
            >
              {locale === 'fr' ? 'Réserver une visite' : 'Book a visit'}
            </a>
          </div>
          <div className='rounded-[24px] bg-white/70 p-8 shadow-[0_6px_24px_rgba(58,58,58,0.05)]'>
            <h2 className='font-display text-[20px] font-semibold tracking-[-0.01em]'>
              {copy.waitlistTitle}
            </h2>
            <p className='mt-3 text-[15px] leading-[1.6] text-charcoal-deep/75'>
              {copy.waitlistBody}
            </p>
            <Link
              href={`${getLocaleHref(locale, '/')}#contact`}
              className='mt-6 inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-charcoal-deep/20 px-7 py-3.5 font-display text-[15px] font-semibold text-charcoal-deep transition-all hover:bg-charcoal-deep/5'
            >
              {locale === 'fr' ? 'Rejoindre la liste' : 'Join the list'}
            </Link>
          </div>
        </section>
      </PageShell>
      <JsonLd id='ld-breadcrumb' data={breadcrumbSchema} />
      {brand.locations.map((location) => (
        <JsonLd
          key={location.slug}
          id={`ld-business-${location.slug}`}
          data={getDaycareLocationSchema(location, locale)}
        />
      ))}
    </>
  )
}
