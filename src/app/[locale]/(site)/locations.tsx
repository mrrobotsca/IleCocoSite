'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { useLang } from './lang-context'
import { COPY, PHOTOS } from './copy'
import { Bloom, Sparkle, Squiggle } from './doodles'
import { BookButton, Eyebrow, SectionTitle } from './ui'

const LOCATION_SLUG: Record<string, 'somerled' | 'lachine'> = {
  Somerled: 'somerled',
  Lachine: 'lachine',
}

const LEARN_MORE_LABEL = {
  en: { Somerled: 'NDG (Somerled) daycare details', Lachine: 'Lachine daycare details' },
  fr: { Somerled: 'Détails — garderie NDG (Somerled)', Lachine: 'Détails — garderie Lachine' },
} as const

// Four interior peeks per location — a proper visible tour, not just tiny circles.
type InteriorPeek = { src: string; label: { en: string; fr: string } }

const INTERIORS: Record<string, InteriorPeek[]> = {
  Somerled: [
    { src: PHOTOS.somerledClassroom, label: { en: 'Sunflower room', fr: 'Salle des tournesols' } },
    { src: PHOTOS.somerledHallway, label: { en: 'The Mickey hallway', fr: 'Le couloir Mickey' } },
    { src: PHOTOS.somerledNursery, label: { en: 'Starry nap room', fr: 'Dortoir étoilé' } },
    { src: PHOTOS.somerledBouncy, label: { en: 'Bouncy & kitchen', fr: 'Sauteur & cuisine' } },
  ],
  Lachine: [
    { src: PHOTOS.lachineHallway, label: { en: 'Storybook hallway', fr: 'Couloir conté' } },
    {
      src: PHOTOS.lachineToddlerRoom,
      label: { en: 'Bee & ladybug room', fr: 'Salle des coccinelles' },
    },
    { src: PHOTOS.lachineClassroom, label: { en: 'The big classroom', fr: 'La grande classe' } },
  ],
}

const DEFAULT_INTERIORS: InteriorPeek[] = [
  { src: PHOTOS.gallery1, label: { en: 'Inside', fr: 'Intérieur' } },
  { src: PHOTOS.gallery2, label: { en: 'Inside', fr: 'Intérieur' } },
  { src: PHOTOS.gallery3, label: { en: 'Inside', fr: 'Intérieur' } },
  { src: PHOTOS.gallery5, label: { en: 'Inside', fr: 'Intérieur' } },
]

const PEEK_LABEL = { en: '↳ a peek inside', fr: '↳ un aperçu' } as const

export const Locations = () => {
  const { lang } = useLang()
  const c = COPY.locations[lang]

  return (
    <section id='locations' className='relative overflow-hidden bg-porcelain py-28'>
      <Squiggle
        width={140}
        color='var(--color-sandy-clay)'
        style={{ position: 'absolute', top: 70, right: '8%', transform: 'rotate(8deg)' }}
      />
      <Sparkle
        size={26}
        color='var(--color-ash-green-deep)'
        style={{ position: 'absolute', bottom: 90, left: '10%' }}
      />

      <div className='mx-auto max-w-[1280px] px-8'>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='mb-14 text-center'
        >
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <SectionTitle className='mt-5'>
            {c.title1} <span className='font-italic-serif font-medium not-italic'>{c.title2}</span>
          </SectionTitle>
          <p className='mx-auto mt-2 max-w-[560px] text-[16px] text-ink-soft'>{c.sub}</p>
        </motion.div>

        <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
          {c.items.map((loc, i) => {
            const interiors = INTERIORS[loc.name] ?? DEFAULT_INTERIORS
            const accent = i === 0 ? 'var(--color-ash-green)' : 'var(--color-sunlit-clay)'
            return (
              <motion.article
                key={loc.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
                className='group relative flex flex-col overflow-hidden rounded-[32px] bg-porcelain-warm shadow-[0_18px_50px_rgba(58,58,58,0.10)] transition-shadow duration-300 hover:shadow-[0_24px_60px_rgba(58,58,58,0.15)]'
              >
                {/* Hero photo with overlays */}
                <div className='relative aspect-[4/3] overflow-hidden'>
                  <Image
                    src={loc.photo}
                    alt={
                      lang === 'fr'
                        ? `Garderie bilingue Ile Coco — ${
                            loc.name === 'Somerled' ? 'NDG (Somerled), Montréal' : 'Lachine, Montréal'
                          }`
                        : `Ile Coco bilingual daycare — ${
                            loc.name === 'Somerled' ? 'NDG (Somerled), Montréal' : 'Lachine, Montréal'
                          }`
                    }
                    fill
                    sizes='(max-width: 768px) 100vw, 600px'
                    className='object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]'
                  />

                  {/* Bottom gradient for the map-hint pill */}
                  <div className='absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent' />

                  {/* Map hint pill — bottom-left */}
                  <div className='absolute left-5 bottom-5 inline-flex items-center gap-1.5 rounded-full bg-charcoal-deep/80 px-3 py-1.5 font-display text-[11px] font-semibold text-porcelain backdrop-blur-md'>
                    <MapPin size={12} />
                    {loc.mapHint}
                  </div>

                  {/* Doodle accent on the photo */}
                  {i === 0 ? (
                    <Sparkle
                      size={22}
                      color='var(--color-sunlit-clay)'
                      style={{ position: 'absolute', top: 22, right: 22 }}
                    />
                  ) : (
                    <Bloom
                      size={26}
                      color='var(--color-sunlit-clay)'
                      style={{ position: 'absolute', top: 22, right: 22 }}
                      className='animate-wiggle'
                    />
                  )}
                </div>

                {/* Interior peek strip — visible photo tour, polaroid-style */}
                <div className='relative bg-porcelain-warm px-5 pb-2 pt-5 sm:px-6'>
                  <p
                    className='mb-3 font-hand text-[18px] text-ash-green-deep'
                    style={{ transform: 'rotate(-1deg)' }}
                  >
                    {PEEK_LABEL[lang]}
                  </p>
                  <div
                    className='grid gap-2.5'
                    style={{ gridTemplateColumns: `repeat(${interiors.length}, minmax(0, 1fr))` }}
                  >
                    {interiors.map((peek, idx) => (
                      <a
                        key={idx}
                        href={peek.src}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={peek.label[lang]}
                        className='group/peek relative block overflow-hidden rounded-2xl border-[3px] border-porcelain bg-porcelain shadow-[0_6px_16px_rgba(58,58,58,0.10)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(58,58,58,0.18)]'
                        style={{
                          aspectRatio: interiors.length === 3 ? '1 / 1' : '4 / 3',
                          transform: `rotate(${[-1.5, 0.5, -0.5, 1.2][idx] ?? 0}deg)`,
                        }}
                      >
                        <Image
                          src={peek.src}
                          alt={peek.label[lang]}
                          fill
                          sizes='(max-width: 768px) 30vw, 180px'
                          className='object-cover transition-transform duration-300 group-hover/peek:scale-[1.06]'
                        />
                        <span className='pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover/peek:opacity-100' />
                        <span className='pointer-events-none absolute left-2 bottom-2 right-2 truncate font-display text-[11px] font-semibold text-porcelain opacity-0 transition-opacity duration-300 group-hover/peek:opacity-100'>
                          {peek.label[lang]}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Cozy info block */}
                <div className='relative flex flex-1 flex-col gap-5 p-7 sm:p-8'>
                  {/* Soft accent stripe behind the title — subtle warmth */}
                  <span
                    aria-hidden
                    className='absolute -top-3 right-7 h-6 w-6 rotate-45 rounded-sm'
                    style={{ background: accent, opacity: 0.45 }}
                  />

                  {/* Title row: name + clay rating */}
                  <div>
                    <div className='flex flex-wrap items-baseline justify-between gap-3'>
                      <h3 className='font-display text-[30px] font-bold tracking-[-0.01em] text-charcoal-deep'>
                        {loc.name}
                      </h3>
                      <span className='inline-flex items-center gap-1.5 rounded-full bg-sunlit-clay-soft px-3 py-1 font-display text-[12px] font-semibold text-charcoal-deep'>
                        <span aria-hidden>★</span> {loc.rating}
                      </span>
                    </div>
                    <p
                      className='mt-1 font-hand text-[22px] leading-tight text-ash-green-deep'
                      style={{ transform: 'rotate(-0.5deg)' }}
                    >
                      {loc.subtitle}
                    </p>
                  </div>

                  {/* Info grid — labels small + faint, values display + charcoal */}
                  <div className='grid grid-cols-2 gap-x-5 gap-y-4'>
                    <Field label={c.labels.addr} className='col-span-2'>
                      <a
                        href={loc.mapUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='block font-display font-semibold text-charcoal-deep transition-colors hover:text-charcoal hover:underline'
                      >
                        {loc.addr}
                        <span className='block font-medium text-ink-soft'>{loc.city}</span>
                      </a>
                    </Field>
                    <Field label={c.labels.hours}>
                      <span className='block font-display font-semibold text-charcoal-deep'>
                        {loc.hours}
                      </span>
                    </Field>
                    <Field label={c.labels.ages}>
                      <span className='block font-display font-semibold text-charcoal-deep'>
                        {loc.ages}
                      </span>
                    </Field>
                    <Field label={c.labels.phone} className='col-span-2'>
                      <a
                        href={`tel:${loc.phone.replace(/\s|-|\(|\)/g, '')}`}
                        className='block font-display font-semibold text-charcoal-deep hover:underline'
                      >
                        {loc.phone}
                      </a>
                    </Field>
                  </div>

                  {/* Handwritten flourish */}
                  <p
                    className='font-hand text-[20px] text-sandy-clay'
                    style={{ transform: 'rotate(-1.5deg)' }}
                  >
                    ↳ {loc.note}
                  </p>

                  {/* Action buttons */}
                  <div className='mt-auto flex flex-wrap items-center gap-2.5 pt-2'>
                    <BookButton variant='dark' size='sm' withArrow>
                      {c.visit}
                    </BookButton>
                    <a
                      href={loc.mapUrl}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='inline-flex items-center gap-2 rounded-full border-[1.5px] border-charcoal-deep/15 bg-porcelain px-[18px] py-2.5 font-display text-[13px] font-semibold text-charcoal-deep transition-all hover:-translate-y-0.5 hover:border-charcoal-deep hover:bg-porcelain-warm'
                    >
                      <MapPin size={14} />
                      {c.directions}
                    </a>
                  </div>

                  {/* Internal link to dedicated location landing page — keyword-rich anchor for local SEO */}
                  {LOCATION_SLUG[loc.name] && (
                    <Link
                      href={`/${lang}/locations/${LOCATION_SLUG[loc.name]}`}
                      className='-mb-2 inline-flex items-center gap-1.5 self-start font-display text-[13px] font-semibold text-charcoal-deep underline-offset-4 hover:underline'
                    >
                      {LEARN_MORE_LABEL[lang][loc.name as 'Somerled' | 'Lachine']}
                      <ArrowRight size={14} />
                    </Link>
                  )}
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

const Field = ({
  label,
  className,
  children,
}: {
  label: string
  className?: string
  children: React.ReactNode
}) => (
  <div className={className}>
    <span className='mb-1 block text-[10px] font-semibold uppercase tracking-[0.08em] text-ink-faint'>
      {label}
    </span>
    {children}
  </div>
)

export default Locations
