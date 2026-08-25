import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { LangProvider } from '../../(site)/lang-context'
import { WizardProvider } from '../../(site)/wizard-context'
import { DaycareNav } from '../../(site)/daycare-nav'
import DaycareFooter from '../../(site)/footer'
import { WaitlistWizard } from '../../(site)/waitlist-wizard'
import { PHOTOS } from '../../(site)/copy'
import { LOCATIONS_COPY } from '../../(site)/copy-locations'
import { BOOKING_URL } from '../../(site)/links'
import { WaitlistButton } from '../../(site)/ui'
import { JsonLd } from '@/components/seo/json-ld'
import {
  generateMetadata as buildMetadata,
  getBreadcrumbSchema,
  LOCALES,
  getLocaleHref,
  type Locale,
} from '@/lib/seo'
import {
  getDaycareLocationSchema,
  getFaqSchema,
  getServiceSchema,
} from '@/lib/structured-data'
import { getLocation, type DaycareLocation } from '@/config/branding'

const SLUGS = ['somerled', 'lachine'] as const
type Slug = (typeof SLUGS)[number]

const isLocale = (v: string): v is Locale => (LOCALES as ReadonlyArray<string>).includes(v)
const isSlug = (v: string): v is Slug => (SLUGS as ReadonlyArray<string>).includes(v)

type Props = { params: Promise<{ locale: string; slug: string }> }

export const generateStaticParams = () =>
  LOCALES.flatMap((locale) => SLUGS.map((slug) => ({ locale, slug })))

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const { locale: rawLocale, slug: rawSlug } = await params
  if (!isLocale(rawLocale) || !isSlug(rawSlug)) return {}
  const locale = rawLocale
  const slug = rawSlug
  const copy = LOCATIONS_COPY[locale][slug]
  const location = getLocation(slug)

  return buildMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    locale,
    path: `/locations/${slug}`,
    image: location.photo,
    imageAlt:
      locale === 'fr'
        ? `Garderie Ile Coco — ${location.neighbourhood}`
        : `Ile Coco Daycare — ${location.neighbourhood}`,
  })
}

const SOMERLED_PHOTOS = [
  { src: PHOTOS.somerledHallway, key: 'hallway' },
  { src: PHOTOS.somerledClassroom, key: 'classroom' },
  { src: PHOTOS.somerledNursery, key: 'nursery' },
  { src: PHOTOS.somerledBouncy, key: 'bouncy' },
  { src: PHOTOS.somerledPlayroomWide, key: 'playroom' },
] as const

const LACHINE_PHOTOS = [
  { src: PHOTOS.lachineHallway, key: 'hallway' },
  { src: PHOTOS.lachineToddlerRoom, key: 'toddler' },
  { src: PHOTOS.lachineClassroom, key: 'classroom' },
] as const

const photoAlt = (slug: Slug, key: string, locale: Locale) => {
  const place = slug === 'somerled' ? 'NDG (Somerled), Montréal' : 'Lachine, Montréal'
  const en: Record<string, string> = {
    hallway: `Bright hallway at Ile Coco daycare in ${place}`,
    classroom: `Sunlit classroom at Ile Coco daycare in ${place}`,
    nursery: `Calm nursery at Ile Coco daycare in ${place}`,
    bouncy: `Indoor play space at Ile Coco daycare in ${place}`,
    playroom: `Wide playroom at Ile Coco daycare in ${place}`,
    toddler: `Toddler room at Ile Coco daycare in ${place}`,
  }
  const fr: Record<string, string> = {
    hallway: `Corridor lumineux de la garderie Ile Coco à ${place}`,
    classroom: `Salle de classe ensoleillée de la garderie Ile Coco à ${place}`,
    nursery: `Pouponnière calme de la garderie Ile Coco à ${place}`,
    bouncy: `Espace de jeu intérieur de la garderie Ile Coco à ${place}`,
    playroom: `Grande salle de jeu de la garderie Ile Coco à ${place}`,
    toddler: `Pièce des tout-petits de la garderie Ile Coco à ${place}`,
  }
  return locale === 'fr' ? fr[key] || place : en[key] || place
}

const formatHours = (location: DaycareLocation, locale: Locale) =>
  locale === 'fr' ? 'Lun — Ven · 7h00 — 18h00' : 'Mon — Fri · 7:00 — 18:00'

const formatAges = (locale: Locale) =>
  locale === 'fr' ? '7 mois — 5 ans' : '7 months — 5 years'

export default async function LocationPage({ params }: Props) {
  const { locale: rawLocale, slug: rawSlug } = await params
  if (!isLocale(rawLocale) || !isSlug(rawSlug)) notFound()
  const locale = rawLocale
  const slug = rawSlug

  const copy = LOCATIONS_COPY[locale][slug]
  const location = getLocation(slug)
  const photos = slug === 'somerled' ? SOMERLED_PHOTOS : LACHINE_PHOTOS
  const otherSlug: Slug = slug === 'somerled' ? 'lachine' : 'somerled'

  const businessSchema = getDaycareLocationSchema(location, locale)
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: copy.breadcrumb.home, url: getLocaleHref(locale, '/') },
    { name: copy.breadcrumb.locations, url: getLocaleHref(locale, '/#locations') },
    { name: location.name, url: getLocaleHref(locale, `/locations/${slug}`) },
  ])
  const faqSchema = getFaqSchema(copy.faq)
  const programsSchema = copy.programs.map((p) =>
    getServiceSchema({
      locale,
      location,
      name: p.name,
      description: p.blurb,
      ageMin: 0.58,
      ageMax: 5,
    })
  )

  const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
    `${location.addressLine}, ${location.locality}, ${location.region} ${location.postalCode}`
  )}&output=embed`

  return (
    <LangProvider initialLang={locale}>
      <WizardProvider>
        <div className="min-h-screen bg-porcelain font-display text-charcoal-deep paper-grain">
          <DaycareNav />
          <main className="pt-28 sm:pt-32">
            <article className="mx-auto max-w-[1100px] px-6 sm:px-8">
              {/* Breadcrumb */}
              <nav
                aria-label={copy.breadcrumb.locations}
                className="mb-6 text-[13px] text-charcoal-deep/60"
              >
                <ol className="flex flex-wrap items-center gap-1.5">
                  <li>
                    <Link
                      href={getLocaleHref(locale, '/')}
                      className="hover:text-charcoal-deep"
                    >
                      {copy.breadcrumb.home}
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li>
                    <Link
                      href={getLocaleHref(locale, '/#locations')}
                      className="hover:text-charcoal-deep"
                    >
                      {copy.breadcrumb.locations}
                    </Link>
                  </li>
                  <li aria-hidden="true">›</li>
                  <li className="text-charcoal-deep" aria-current="page">
                    {location.neighbourhood}
                  </li>
                </ol>
              </nav>

              {/* Hero */}
              <header className="grid items-start gap-10 md:grid-cols-[1.1fr_1fr]">
                <div>
                  <p className="mb-3 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-sunlit-clay">
                    {locale === 'fr' ? 'Notre garderie à' : 'Our daycare in'}{' '}
                    {location.neighbourhood}
                  </p>
                  <h1 className="font-display text-[clamp(34px,5vw,56px)] font-medium leading-[1.05] tracking-[-0.02em]">
                    {copy.h1}
                  </h1>
                  <p className="mt-6 max-w-[560px] text-[17px] leading-[1.6] text-charcoal-deep/75">
                    {copy.intro}
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href={BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2.5 rounded-full bg-charcoal-deep px-7 py-3.5 font-display text-[15px] font-semibold text-porcelain transition-all hover:-translate-y-0.5 hover:bg-black"
                    >
                      {copy.ctaPrimary}
                    </a>
                    {/*
                      Opens the waitlist wizard in place. This used to be a link to
                      the homepage's #contact band, which navigated the visitor off
                      the location page entirely and then made them click a second
                      time to reach the same modal.
                    */}
                    <WaitlistButton
                      variant="ghost"
                      className="border-charcoal-deep/20 px-7 py-3.5 text-[15px] hover:bg-charcoal-deep/5 hover:text-charcoal-deep"
                    >
                      {copy.ctaSecondary}
                    </WaitlistButton>
                  </div>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
                  <Image
                    src={location.photo}
                    alt={
                      locale === 'fr'
                        ? `Garderie Ile Coco — ${location.neighbourhood}`
                        : `Ile Coco Daycare — ${location.neighbourhood}`
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, 480px"
                    className="object-cover"
                    priority
                  />
                </div>
              </header>

              {/* Address card */}
              <section className="mt-16 grid gap-8 rounded-[28px] bg-white/70 p-8 shadow-[0_8px_32px_rgba(58,58,58,0.06)] sm:p-10 md:grid-cols-[1fr_1.1fr]">
                <div className="space-y-6">
                  <h2 className="font-display text-[clamp(22px,2.5vw,30px)] font-semibold tracking-[-0.01em]">
                    {location.name}
                  </h2>
                  <ul className="space-y-3 text-[15px] text-charcoal-deep/85">
                    <li>
                      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-charcoal-deep/55">
                        {copy.addressLabel}
                      </div>
                      <a
                        href={location.googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {location.addressLine},{' '}
                        {location.locality}, {location.region} {location.postalCode}
                      </a>
                    </li>
                    <li>
                      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-charcoal-deep/55">
                        {copy.hoursLabel}
                      </div>
                      {formatHours(location, locale)}
                    </li>
                    <li>
                      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-charcoal-deep/55">
                        {copy.agesLabel}
                      </div>
                      {formatAges(locale)}
                    </li>
                    <li>
                      <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-charcoal-deep/55">
                        {copy.phoneLabel}
                      </div>
                      <a
                        href={`tel:${location.phone.replace(/[^+\d]/g, '')}`}
                        className="hover:underline"
                      >
                        (514) 574-4695
                      </a>
                    </li>
                    {location.rating && (
                      <li>
                        <div className="text-[12px] font-semibold uppercase tracking-[0.08em] text-charcoal-deep/55">
                          {copy.ratingLabel}
                        </div>
                        {location.rating.value.toFixed(1).replace('.', locale === 'fr' ? ',' : '.')}{' '}
                        ★ · {location.rating.count}{' '}
                        {locale === 'fr' ? 'avis' : 'reviews'}
                      </li>
                    )}
                  </ul>
                </div>

                <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] sm:aspect-[5/3]">
                  <iframe
                    src={mapEmbedUrl}
                    title={
                      locale === 'fr'
                        ? `Carte de la garderie Ile Coco à ${location.neighbourhood}`
                        : `Map of Ile Coco daycare in ${location.neighbourhood}`
                    }
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-full w-full border-0"
                    allowFullScreen
                  />
                </div>
              </section>

              {/* Why this location */}
              <section className="mt-20">
                <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-medium tracking-[-0.02em]">
                  {copy.whyTitle}
                </h2>
                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  {copy.whyBullets.map((b) => (
                    <div
                      key={b.title}
                      className="rounded-[20px] bg-white/60 p-6 shadow-[0_4px_20px_rgba(58,58,58,0.04)]"
                    >
                      <h3 className="font-display text-[18px] font-semibold tracking-[-0.01em]">
                        {b.title}
                      </h3>
                      <p className="mt-2 text-[15px] leading-[1.6] text-charcoal-deep/75">
                        {b.body}
                      </p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Photos */}
              <section className="mt-20">
                <h2 className="sr-only">
                  {locale === 'fr'
                    ? `Photos de la garderie ${location.neighbourhood}`
                    : `${location.neighbourhood} daycare photos`}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {photos.map((p) => (
                    <div
                      key={p.key}
                      className="relative aspect-[4/3] overflow-hidden rounded-[18px]"
                    >
                      <Image
                        src={p.src}
                        alt={photoAlt(slug, p.key, locale)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Programs */}
              <section className="mt-20">
                <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-medium tracking-[-0.02em]">
                  {copy.programsTitle}
                </h2>
                <p className="mt-3 max-w-[640px] text-[16px] text-charcoal-deep/70">
                  {copy.programsBlurb}
                </p>
                <div className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
                  {copy.programs.map((p) => (
                    <article
                      key={p.name}
                      className="rounded-[20px] bg-white/60 p-6 shadow-[0_4px_20px_rgba(58,58,58,0.04)]"
                    >
                      <p className="font-display text-[12px] font-bold uppercase tracking-[0.08em] text-sunlit-clay">
                        {p.ages}
                      </p>
                      <h3 className="mt-1.5 font-display text-[20px] font-semibold tracking-[-0.01em]">
                        {p.name}
                      </h3>
                      <p className="mt-3 text-[15px] leading-[1.6] text-charcoal-deep/75">
                        {p.blurb}
                      </p>
                    </article>
                  ))}
                </div>
              </section>

              {/* Visit */}
              <section className="mt-20 rounded-[28px] bg-charcoal-deep px-8 py-14 text-porcelain sm:px-12">
                <h2 className="font-display text-[clamp(28px,3.5vw,40px)] font-medium tracking-[-0.02em]">
                  {copy.visitTitle}
                </h2>
                <p className="mt-4 max-w-[600px] text-[17px] leading-[1.6] text-porcelain/80">
                  {copy.visitBody}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 rounded-full bg-sunlit-clay px-7 py-3.5 font-display text-[15px] font-semibold text-charcoal-deep transition-all hover:-translate-y-0.5 hover:bg-sunlit-clay-soft"
                  >
                    {copy.ctaPrimary}
                  </a>
                </div>
              </section>

              {/* FAQ */}
              <section className="mt-20">
                <h2 className="font-display text-[clamp(28px,3.5vw,42px)] font-medium tracking-[-0.02em]">
                  {copy.faqTitle}
                </h2>
                <div className="mt-8 space-y-3">
                  {copy.faq.map((f) => (
                    <details
                      key={f.q}
                      className="group rounded-[18px] bg-white/60 p-6 shadow-[0_4px_20px_rgba(58,58,58,0.04)]"
                    >
                      <summary className="cursor-pointer list-none font-display text-[17px] font-semibold tracking-[-0.01em]">
                        {f.q}
                      </summary>
                      <p className="mt-3 text-[15px] leading-[1.65] text-charcoal-deep/75">
                        {f.a}
                      </p>
                    </details>
                  ))}
                </div>
              </section>

              {/* Other location */}
              <section className="mt-20 mb-24 rounded-[24px] border border-charcoal-deep/10 px-8 py-10 text-center">
                <p className="font-display text-[18px] font-semibold tracking-[-0.01em]">
                  {copy.otherLocationCta}
                </p>
                <Link
                  href={getLocaleHref(locale, `/locations/${otherSlug}`)}
                  className="mt-4 inline-flex items-center gap-2 font-display text-[15px] font-semibold text-charcoal-deep underline-offset-4 hover:underline"
                >
                  {locale === 'fr'
                    ? otherSlug === 'somerled'
                      ? 'Voir la garderie de NDG (Somerled)'
                      : 'Voir la garderie de Lachine'
                    : otherSlug === 'somerled'
                    ? 'See the NDG (Somerled) daycare'
                    : 'See the Lachine daycare'}
                  <span aria-hidden="true">→</span>
                </Link>
              </section>
            </article>
          </main>
          <DaycareFooter />
        </div>
        <WaitlistWizard />
        <JsonLd id="ld-business" data={businessSchema} />
        <JsonLd id="ld-breadcrumb" data={breadcrumbSchema} />
        <JsonLd id="ld-faq" data={faqSchema} />
        {programsSchema.map((schema, i) => (
          <JsonLd key={`service-${i}`} id={`ld-service-${i}`} data={schema} />
        ))}
      </WizardProvider>
    </LangProvider>
  )
}
