'use client'

import { motion } from 'framer-motion'
import { useLang } from './lang-context'
import { COPY } from './copy'
import { Sparkle, Spiral, StarBurst } from './doodles'
import { Eyebrow, SectionTitle } from './ui'

const PALETTE = ['bg-ash-green', 'bg-sunlit-clay-soft', 'bg-sandy-clay-soft', 'bg-porcelain-warm', 'bg-ash-green', 'bg-sandy-clay']

export const Services = () => {
  const { lang } = useLang()
  const c = COPY.services[lang]

  return (
    <section className="relative overflow-hidden py-28">
      <Spiral size={60} style={{ position: 'absolute', top: 80, right: '12%', opacity: 0.5 }} />
      <StarBurst size={32} style={{ position: 'absolute', bottom: 80, left: '8%', opacity: 0.4 }} />

      <div className="mx-auto max-w-[1280px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-16 text-center"
        >
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <SectionTitle className="mt-5">
            {c.title1}
            <br />
            <span className="font-italic-serif font-medium not-italic">{c.title2}</span>
          </SectionTitle>
          <p className="mx-auto mt-3 max-w-[560px] text-[16px] text-ink-soft">{c.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {c.items.map((it, i) => (
            <motion.article
              key={it.tag}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.55, delay: i * 0.07, ease: 'easeOut' }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className={`relative cursor-pointer pb-8 pt-11 px-8 ${PALETTE[i]}`}
              style={{ borderRadius: '200px 200px 28px 28px' }}
            >
              <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-porcelain font-display text-[26px] font-bold text-charcoal-deep shadow-[0_6px_20px_rgba(58,58,58,0.08)]">
                {it.tag}
              </div>
              <h3 className="text-center font-display text-[24px] font-bold text-charcoal-deep">{it.name}</h3>
              <p className="mt-3 text-center text-[15px] leading-[1.55] text-charcoal-deep/85">{it.desc}</p>
              {i % 2 === 0 && (
                <Sparkle size={18} color="var(--color-charcoal-deep)" style={{ position: 'absolute', bottom: 16, right: 20, opacity: 0.5 }} />
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
