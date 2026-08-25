import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PageShell } from '../(site)/page-shell'
import { PROGRAMS_COPY } from '../(site)/copy-pages'
import { BOOKING_URL } from '../(site)/links'
import { JsonLd } from '@/components/seo/json-ld'
import {
  generateMetadata as buildMetadata,
  getBreadcrumbSchema,
  getLocaleHref,
  LOCALES,
  type Locale,
} from '@/lib/seo'
import { getServiceSchema } from '@/lib/structured-data'
import { getBrandConfig } from '@/config/branding'

type Props = { params: Promise<{ locale: string }> }

const isLocale = (v: string): v is Locale => (LOCALES as ReadonlyArray<string>).includes(v)

export const generateStaticParams = () => LOCALES.map((locale) => ({ locale }))

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: raw } = await params
  if (!isLocale(raw)) return {}
  const copy = PROGRAMS_COPY[raw]

  return buildMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    locale: raw,
    path: '/programs',
  })
}

// Ages in years, matching the four rooms in PROGRAMS_COPY. 0.58 = 7 months, the
// youngest we accept — the nursery entry must stay first and stay aligned with the
// `rooms` array order.
const AGE_BOUNDS = [
  { ageMin: 0.58, ageMax: 1.5 },
  { ageMin: 1.5, ageMax: 2.5 },
  { ageMin: 2.5, ageMax: 4 },
  { ageMin: 4, ageMax: 5 },
]

export default async function ProgramsPage({ params }: Props) {
  const { locale: raw } = await params
  if (!isLocale(raw)) notFound()
  const locale = raw
  const copy = PROGRAMS_COPY[locale]
  const brand = getBrandConfig()

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === 'fr' ? 'Accueil' : 'Home', url: getLocaleHref(locale, '/') },
    { name: copy.eyebrow, url: getLocaleHref(locale, '/programs') },
  ])

  // One Service node per age band, provided by the Somerled house — the schema
  // needs a single provider, and both locations run identical programming.
  const serviceSchemas = copy.rooms.map((room, i) =>
    getServiceSchema({
      locale,
      location: brand.locations[0],
      name: room.name,
      description: room.blurb,
      ...AGE_BOUNDS[i],
    })
  )

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
            {copy.roomsTitle}
          </h2>
          <div className='mt-8 grid gap-6 md:grid-cols-3'>
            {copy.rooms.map((room) => (
              <div
                key={room.name}
                className='rounded-[22px] bg-white/70 p-7 shadow-[0_6px_24px_rgba(58,58,58,0.05)]'
              >
                <h3 className='font-display text-[19px] font-semibold tracking-[-0.01em]'>
                  {room.name}
                </h3>
                <p className='mt-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-sunlit-clay'>
                  {room.ages}
                </p>
                <p className='mt-4 text-[15px] leading-[1.65] text-charcoal-deep/75'>
                  {room.blurb}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className='mt-16 grid gap-8 rounded-[28px] bg-white/70 p-8 shadow-[0_8px_32px_rgba(58,58,58,0.06)] sm:p-10 md:grid-cols-2'>
          <div>
            <h2 className='font-display text-[clamp(22px,2.5vw,30px)] font-semibold tracking-[-0.01em]'>
              {copy.dayTitle}
            </h2>
            <p className='mt-4 text-[16px] leading-[1.7] text-charcoal-deep/80'>{copy.dayBody}</p>
          </div>
          <div>
            <h2 className='font-display text-[clamp(22px,2.5vw,30px)] font-semibold tracking-[-0.01em]'>
              {copy.ratioTitle}
            </h2>
            <p className='mt-4 text-[16px] leading-[1.7] text-charcoal-deep/80'>{copy.ratioBody}</p>
          </div>
        </section>

        <section className='mt-16 mb-24'>
          <h2 className='font-display text-[clamp(22px,2.5vw,30px)] font-semibold tracking-[-0.01em]'>
            {locale === 'fr' ? 'Où nous trouver' : 'Where to find us'}
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

          <div className='mt-10 rounded-[24px] border border-charcoal-deep/10 px-8 py-10 text-center'>
            <h2 className='font-display text-[20px] font-semibold tracking-[-0.01em]'>
              {copy.ctaTitle}
            </h2>
            <p className='mx-auto mt-3 max-w-[520px] text-[15px] leading-[1.6] text-charcoal-deep/70'>
              {copy.ctaBody}
            </p>
            <a
              href={BOOKING_URL}
              target='_blank'
              rel='noopener noreferrer'
              className='mt-6 inline-flex items-center gap-2.5 rounded-full bg-charcoal-deep px-7 py-3.5 font-display text-[15px] font-semibold text-porcelain transition-all hover:-translate-y-0.5 hover:bg-black'
            >
              {locale === 'fr' ? 'Réserver une visite' : 'Book a visit'}
            </a>
          </div>
        </section>
      </PageShell>
      <JsonLd id='ld-breadcrumb' data={breadcrumbSchema} />
      {serviceSchemas.map((schema, i) => (
        <JsonLd key={`service-${i}`} id={`ld-service-${i}`} data={schema} />
      ))}
    </>
  )
}
