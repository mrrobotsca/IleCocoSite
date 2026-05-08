'use client'

import { motion } from 'framer-motion'
import { useLang } from './lang-context'
import { COPY } from './copy'
import { Bloom, Sparkle } from './doodles'
import { Eyebrow, SectionTitle, WaitlistButton } from './ui'

const ACCENTS = ['bg-ash-green', 'bg-sunlit-clay', 'bg-sandy-clay']
const ICONS = ['🏛️', '✨', '🌿']

export const Tuition = () => {
  const { lang } = useLang()
  const c = COPY.tuition[lang]

  return (
    <section id="tuition" className="relative overflow-hidden bg-porcelain-warm py-28">
      <Bloom size={48} className="animate-wiggle" style={{ position: 'absolute', top: 60, left: '8%' }} />
      <Sparkle size={24} color="var(--color-sandy-clay)" style={{ position: 'absolute', top: 110, right: '12%' }} />

      <div className="mx-auto max-w-[1280px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12 grid grid-cols-1 items-end gap-12 lg:grid-cols-2 lg:gap-[60px]"
        >
          <div>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <SectionTitle className="mt-5">
              {c.title1}
              <br />
              <span className="font-italic-serif font-medium not-italic">{c.title2}</span>
            </SectionTitle>
          </div>
          <div>
            <p className="mb-4 max-w-[460px] text-[17px] text-ink-soft">{c.sub}</p>
            <p className="font-hand text-[24px] text-ash-green-deep" style={{ transform: 'rotate(-1deg)' }}>{c.includes}</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {c.items.map((it, i) => (
            <motion.article
              key={it.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: 'easeOut' }}
              whileHover={{ y: -4, boxShadow: '0 18px 40px rgba(58,58,58,0.1)' }}
              className={`relative rounded-[28px] bg-porcelain p-8 ${i === 1 ? 'border-2 border-charcoal-deep' : 'border border-charcoal-deep/10'}`}
            >
              {i === 1 && (
                <span className="absolute -top-3 right-5 rounded-full bg-charcoal-deep px-3 py-1.5 font-display text-[11px] font-bold uppercase tracking-[0.06em] text-porcelain">
                  {c.mostCommon}
                </span>
              )}
              <div className={`mb-5 grid h-14 w-14 place-items-center rounded-full ${ACCENTS[i]}`}>
                <span className="text-[22px]" aria-hidden>
                  {ICONS[i]}
                </span>
              </div>
              <div className="mb-2.5 font-display text-[13px] font-bold uppercase tracking-[0.06em] text-ink-faint">{it.tag}</div>
              <div className="mb-3.5 flex items-baseline gap-1.5">
                <span className="font-display text-[44px] font-bold tracking-[-0.02em] text-charcoal-deep">{it.price}</span>
                <span className="text-[14px] text-ink-faint">{it.per}</span>
              </div>
              <p className="text-[14px] leading-[1.55] text-ink-soft">{it.note}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <WaitlistButton variant="dark" size="lg" withArrow>
            {c.cta}
          </WaitlistButton>
        </div>
      </div>
    </section>
  )
}

export default Tuition
