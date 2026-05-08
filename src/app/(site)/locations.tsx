'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from './lang-context'
import { COPY, PHOTOS } from './copy'
import { IleCocoLogo, Sparkle, Squiggle } from './doodles'
import { Eyebrow, SectionTitle, WaitlistButton } from './ui'

const PHOTOS_LIST = [PHOTOS.loc1, PHOTOS.loc2]
const ACCENTS = ['var(--color-ash-green)', 'var(--color-sunlit-clay)']

export const Locations = () => {
  const { lang } = useLang()
  const c = COPY.locations[lang]

  return (
    <section id="locations" className="relative overflow-hidden bg-porcelain py-28">
      <Squiggle width={140} color="var(--color-sandy-clay)" style={{ position: 'absolute', top: 70, right: '8%', transform: 'rotate(8deg)' }} />
      <Sparkle size={26} color="var(--color-ash-green-deep)" style={{ position: 'absolute', bottom: 90, left: '10%' }} />

      <div className="mx-auto max-w-[1280px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-14 text-center"
        >
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <SectionTitle className="mt-5">
            {c.title1}{' '}
            <span className="font-italic-serif font-medium not-italic">{c.title2}</span>
          </SectionTitle>
          <p className="mx-auto mt-2 max-w-[560px] text-[16px] text-ink-soft">{c.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {c.items.map((loc, i) => (
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
              className="overflow-hidden rounded-[32px] bg-porcelain-warm"
            >
              {/* Stylized map */}
              <div
                className="relative overflow-hidden"
                style={{
                  height: 260,
                  background: `linear-gradient(135deg, ${ACCENTS[i]} 0%, var(--color-porcelain-warm) 100%)`,
                }}
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 400 260"
                  preserveAspectRatio="none"
                  className="absolute inset-0"
                  style={{ opacity: 0.45 }}
                >
                  <path d="M0 80 Q 200 60, 400 100" stroke="var(--color-charcoal-deep)" strokeWidth="1" fill="none" />
                  <path d="M0 140 Q 180 120, 400 160" stroke="var(--color-charcoal-deep)" strokeWidth="1" fill="none" />
                  <path d="M80 0 Q 100 130, 80 260" stroke="var(--color-charcoal-deep)" strokeWidth="1" fill="none" />
                  <path d="M240 0 Q 260 130, 240 260" stroke="var(--color-charcoal-deep)" strokeWidth="1" fill="none" />
                  <path d="M320 0 Q 340 130, 320 260" stroke="var(--color-charcoal-deep)" strokeWidth="1" fill="none" />
                  <ellipse cx="160" cy="190" rx="40" ry="22" fill="var(--color-ash-green-deep)" opacity="0.5" />
                  <ellipse cx="320" cy="60" rx="28" ry="18" fill="var(--color-ash-green-deep)" opacity="0.5" />
                </svg>
                <div className="absolute right-5 top-5 h-[110px] w-[110px] overflow-hidden rounded-full border-4 border-porcelain shadow-[0_10px_24px_rgba(0,0,0,0.15)]">
                  <Image src={PHOTOS_LIST[i]} alt="" fill sizes="110px" className="object-cover" />
                </div>
                <div className="absolute left-[30%] top-[55%]">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-charcoal-deep shadow-[0_8px_16px_rgba(0,0,0,0.25)]">
                    <IleCocoLogo size={28} />
                  </div>
                  <div
                    className="mx-auto -mt-0.5"
                    style={{
                      width: 0,
                      height: 0,
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderTop: '12px solid var(--color-charcoal-deep)',
                    }}
                  />
                </div>
                <span className="absolute bottom-4 left-5 rounded-full bg-porcelain/95 px-3.5 py-1.5 font-display text-[12px] font-semibold text-charcoal-deep">
                  {loc.mapHint}
                </span>
              </div>

              {/* Info */}
              <div className="px-8 pb-8 pt-7">
                <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-3.5">
                  <h3 className="font-display text-[28px] font-bold text-charcoal-deep">{loc.name}</h3>
                  <span className="font-hand text-[22px] text-ash-green-deep">{loc.subtitle}</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 font-display text-[14px] text-ink-soft">
                  <div>
                    <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-faint">{c.labels.addr}</div>
                    <div className="font-medium text-charcoal-deep">{loc.addr}</div>
                    <div>{loc.city}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-faint">{c.labels.hours}</div>
                    <div className="font-medium text-charcoal-deep">{loc.hours}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-faint">{c.labels.ages}</div>
                    <div className="font-medium text-charcoal-deep">{loc.ages}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-faint">{c.labels.phone}</div>
                    <a href={`tel:${loc.phone.replace(/\s|-|\(|\)/g, '')}`} className="font-medium text-charcoal-deep hover:underline">
                      {loc.phone}
                    </a>
                  </div>
                </div>

                <WaitlistButton variant="dark" size="sm" withArrow className="mt-6">
                  {c.visit}
                </WaitlistButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Locations
