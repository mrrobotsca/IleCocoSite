'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from './lang-context'
import { COPY, PHOTOS } from './copy'
import { CurlyArrow, WaveDivider } from './doodles'
import { Eyebrow, SectionTitle } from './ui'

export const Why = () => {
  const { lang } = useLang()
  const c = COPY.why[lang]

  return (
    <section className="relative">
      <WaveDivider fill="var(--color-porcelain-warm)" height={50} />
      <div className="relative overflow-hidden bg-porcelain-warm pb-28 pt-24">
        <CurlyArrow width={110} height={70} flip style={{ position: 'absolute', top: 100, left: '5%', opacity: 0.5 }} />

        <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-8 lg:grid-cols-[1fr_1.2fr] lg:gap-[70px]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <SectionTitle className="mt-5">
              {c.title1}
              <br />
              <span className="font-italic-serif font-medium not-italic">{c.title2}</span>
            </SectionTitle>
            <p className="mb-8 mt-4 text-[16px] text-ink-soft">{c.sub}</p>
            <div
              className="relative overflow-hidden shadow-[0_18px_50px_rgba(58,58,58,0.15)]"
              style={{ aspectRatio: '1.2', borderRadius: '200px 28px 28px 28px' }}
            >
              <Image
                src={PHOTOS.why}
                alt="An Ile CoCo educator with three painted-face children"
                fill
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2"
          >
            {c.items.map((it, i) => (
              <motion.div
                key={it.title}
                whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(58,58,58,0.08)' }}
                transition={{ duration: 0.2 }}
                className="rounded-[22px] border border-charcoal-deep/[0.06] bg-porcelain p-6"
              >
                <div
                  className={`mb-4 grid h-9 w-9 place-items-center rounded-full ${i % 2 === 0 ? 'bg-ash-green' : 'bg-sunlit-clay'} font-display text-[14px] font-bold text-charcoal-deep`}
                >
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h4 className="mb-1.5 font-display text-[17px] font-bold text-charcoal-deep">{it.title}</h4>
                <p className="text-[14px] leading-[1.55] text-ink-soft">{it.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <WaveDivider fill="var(--color-porcelain-warm)" height={50} flip />
    </section>
  )
}

export default Why
