'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useLang } from './lang-context'
import { COPY, PHOTOS } from './copy'
import { CloudHen, Sparkle, Squiggle, WaveDivider } from './doodles'
import { Eyebrow, SectionTitle, WaitlistButton } from './ui'

export const Mission = () => {
  const { lang } = useLang()
  const c = COPY.mission[lang]

  return (
    <section id="programs" className="relative mt-15">
      <WaveDivider fill="var(--color-ash-green)" height={50} />
      <div className="relative overflow-hidden bg-ash-green pt-24 pb-28">
        <CloudHen size={120} className="animate-drift" style={{ position: 'absolute', top: 50, right: '8%', opacity: 0.9 }} />
        <Squiggle width={240} height={50} style={{ position: 'absolute', bottom: 60, left: '5%', opacity: 0.5 }} />

        <div className="mx-auto grid max-w-[1280px] items-center gap-14 px-8 md:gap-20 lg:grid-cols-[1.1fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[32px] shadow-[0_20px_60px_rgba(58,58,58,0.18)]" style={{ aspectRatio: '1.15' }}>
              <Image src={PHOTOS.mission} alt="Bright sunflower-decorated classroom at Ile CoCo" fill sizes="(max-width: 1024px) 100vw, 600px" className="object-cover" />
            </div>
            <div className="absolute -bottom-7 -right-6 hidden items-center gap-3 rounded-full bg-porcelain px-5 py-3 font-display font-semibold shadow-[0_12px_30px_rgba(58,58,58,0.15)] sm:flex">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-sunlit-clay text-charcoal-deep">
                <Heart size={16} fill="currentColor" />
              </span>
              <span className="text-[14px] text-charcoal-deep">{c.pill}</span>
            </div>
            <Sparkle size={30} color="var(--color-charcoal-deep)" style={{ position: 'absolute', top: -16, left: -16 }} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          >
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <SectionTitle className="mt-5">
              {c.title1}
              <br />
              <span className="font-italic-serif font-medium not-italic">{c.title2}</span>
            </SectionTitle>
            <p className="mt-6 text-[17px] leading-[1.65] text-charcoal-deep">{c.body}</p>
            <ul className="mt-8 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
              {c.bullets.map((b, i) => (
                <li key={i} className="flex items-center gap-3 text-[15px] font-medium text-charcoal-deep">
                  <span className="grid h-[22px] w-[22px] flex-shrink-0 place-items-center rounded-full bg-charcoal-deep text-[12px] text-porcelain">✓</span>
                  {b}
                </li>
              ))}
            </ul>
            <WaitlistButton variant="dark" withArrow className="mt-9">
              {c.cta}
            </WaitlistButton>
          </motion.div>
        </div>
      </div>
      <WaveDivider fill="var(--color-ash-green)" height={50} flip />
    </section>
  )
}

export default Mission
