'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useLang } from './lang-context'
import { COPY, PHOTOS } from './copy'
import { Bloom, Squiggle } from './doodles'
import { Eyebrow, SectionTitle } from './ui'

const YOUTUBE_ID = process.env.NEXT_PUBLIC_YOUTUBE_ID || 'dQw4w9WgXcQ'

export const Journey = () => {
  const { lang } = useLang()
  const c = COPY.journey[lang]
  const [playing, setPlaying] = useState(false)
  const sideShots = [PHOTOS.journey1, PHOTOS.journey2, PHOTOS.journey3]

  return (
    <section className="relative overflow-hidden py-24 lg:py-28">
      <Bloom size={42} className="animate-wiggle" style={{ position: 'absolute', top: 70, right: '10%' }} />
      <Squiggle width={120} color="var(--color-ash-green-deep)" style={{ position: 'absolute', bottom: 60, left: '8%', opacity: 0.5 }} />

      <div className="mx-auto max-w-[1280px] px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-12 flex flex-wrap items-end justify-between gap-10"
        >
          <div>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <SectionTitle className="mt-5">
              {c.title1}
              <br />
              <span className="font-italic-serif font-medium not-italic">{c.title2}</span>
            </SectionTitle>
          </div>
          <p className="max-w-[380px] text-[16px] text-ink-soft">{c.sub}</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.65fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative overflow-hidden rounded-[32px] bg-[#1a1a1a] shadow-[0_24px_60px_rgba(58,58,58,0.18)]"
            style={{ aspectRatio: '16 / 10' }}
          >
            {playing ? (
              <iframe
                src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1`}
                title="Ile CoCo journey"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                aria-label={c.watch}
                className="group relative block h-full w-full cursor-pointer border-0 bg-ash-green p-0"
              >
                <Image
                  src={`https://img.youtube.com/vi/${YOUTUBE_ID}/maxresdefault.jpg`}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/55" />
                <span className="absolute left-1/2 top-1/2 grid h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-porcelain/95 text-charcoal-deep shadow-[0_16px_40px_rgba(0,0,0,0.3)] transition-transform duration-200 group-hover:scale-105 sm:h-24 sm:w-24">
                  <Play size={28} fill="currentColor" />
                </span>
                <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3.5">
                  <span className="rounded-full bg-charcoal-deep/85 px-4 py-2.5 font-display text-[13px] font-semibold text-porcelain backdrop-blur-md">
                    {c.watch} · 2:14
                  </span>
                  <span
                    className="hidden font-hand text-[26px] text-porcelain sm:inline-block"
                    style={{ transform: 'rotate(-4deg)', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}
                  >
                    {c.pressPlay}
                  </span>
                </div>
              </button>
            )}
          </motion.div>

          <div className="grid grid-rows-3 gap-3.5">
            {sideShots.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                whileHover={{ y: -3 }}
                className="relative cursor-pointer overflow-hidden rounded-[22px] shadow-[0_10px_24px_rgba(58,58,58,0.12)]"
                style={{ minHeight: 110 }}
              >
                <Image src={src} alt="" fill sizes="(max-width: 1024px) 100vw, 320px" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50" />
                <span className="absolute left-4 bottom-3.5 font-display text-[14px] font-semibold text-porcelain">{c.sideLabels[i]}</span>
                <span className="absolute right-3.5 top-3.5 grid h-8 w-8 place-items-center rounded-full bg-porcelain/95 text-[11px] text-charcoal-deep">
                  ▶
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Journey
