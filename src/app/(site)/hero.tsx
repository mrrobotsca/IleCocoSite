'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from './lang-context'
import { COPY, PHOTOS } from './copy'
import { Blob, Bloom, CocoTree, HandUnderline, Rocket, Sparkle, StarBurst } from './doodles'
import { Eyebrow, PillLink, WaitlistButton } from './ui'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
}

export const Hero = () => {
  const { lang } = useLang()
  const c = COPY.hero[lang]

  return (
    <section id="top" className="relative overflow-hidden bg-porcelain pb-20 pt-[130px]">
      <Blob size={420} fill="var(--color-ash-green)" style={{ position: 'absolute', top: -80, right: -120, opacity: 0.4 }} />
      <Blob size={300} fill="var(--color-sandy-clay-soft)" style={{ position: 'absolute', bottom: -100, left: -80, opacity: 0.5 }} />

      <div className="relative mx-auto max-w-[1440px] px-8">
        <motion.div
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="mb-7 text-center"
        >
          <Eyebrow>{c.eyebrow}</Eyebrow>
        </motion.div>

        <div className="grid items-center gap-7 lg:grid-cols-[1fr_1.6fr_1fr]">
          {/* Left arched photo card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="relative mx-auto hidden w-full max-w-[280px] lg:block"
          >
            <div
              className="relative overflow-hidden bg-ash-green shadow-[0_20px_50px_rgba(58,58,58,0.12)]"
              style={{ aspectRatio: '0.78', borderRadius: '180px 180px 24px 24px' }}
            >
              <Image src={PHOTOS.hero1} alt="A child in an Ile CoCo bib enjoying autumn outdoors" fill sizes="280px" className="object-cover" priority />
            </div>
            <Sparkle size={26} color="var(--color-sunlit-clay)" className="animate-drift" style={{ position: 'absolute', top: -10, right: -10 }} />
            <CocoTree size={48} className="animate-wiggle" style={{ position: 'absolute', bottom: -16, left: -20 }} />
          </motion.div>

          {/* Center copy */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="relative text-center"
          >
            <h1 className="font-display text-[clamp(42px,5.6vw,84px)] font-medium leading-[1.02] tracking-[-0.02em] text-charcoal-deep">
              {c.title1}{' '}
              <span className="relative inline-block">
                <em className="font-italic-serif font-medium not-italic">{c.title2}</em>
                <HandUnderline width={280} style={{ position: 'absolute', left: 0, bottom: -10, width: '100%' }} />
              </span>
              <br />
              {c.title3} <span className="font-bold">{c.title4}</span>
            </h1>

            <p className="mx-auto mt-7 max-w-[480px] text-[17px] leading-[1.6] text-ink-soft">{c.lead}</p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <WaitlistButton variant="dark" withArrow>
                {c.cta1}
              </WaitlistButton>
              <PillLink href="#contact" variant="ghost">
                {c.cta2}
              </PillLink>
            </div>

            <span
              className="absolute -left-4 top-[58%] hidden font-hand text-[22px] text-charcoal-deep lg:inline-block"
              style={{ transform: 'rotate(-8deg)' }}
            >
              {c.since}
            </span>
          </motion.div>

          {/* Right arched photo card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="relative mx-auto hidden w-full max-w-[280px] lg:block"
          >
            <div
              className="relative overflow-hidden bg-sunlit-clay-soft shadow-[0_20px_50px_rgba(58,58,58,0.12)]"
              style={{ aspectRatio: '0.78', borderRadius: '180px 180px 24px 24px' }}
            >
              <Image src={PHOTOS.hero2} alt="A baby reading a small book in soft light" fill sizes="280px" className="object-cover" priority />
            </div>
            <Rocket size={90} className="animate-float-slow" style={{ position: 'absolute', top: -30, right: -30 }} />
            <StarBurst size={28} color="var(--color-sunlit-clay)" style={{ position: 'absolute', bottom: 30, right: -16 }} />
          </motion.div>

          {/* Mobile single photo banner */}
          <div className="relative mt-10 lg:hidden">
            <div
              className="relative overflow-hidden bg-ash-green shadow-[0_20px_50px_rgba(58,58,58,0.12)]"
              style={{ aspectRatio: '1.05', borderRadius: '180px 180px 24px 24px' }}
            >
              <Image src={PHOTOS.hero1} alt="A child in an Ile CoCo bib enjoying autumn outdoors" fill sizes="(max-width: 1024px) 100vw" className="object-cover" priority />
            </div>
            <Rocket size={70} className="animate-float-slow" style={{ position: 'absolute', top: -22, right: -10 }} />
          </div>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto mt-20 grid max-w-[880px] grid-cols-3 rounded-[28px] bg-porcelain-warm px-6 py-8 sm:px-10"
        >
          {[
            { v: c.stat1, l: c.stat1Label },
            { v: c.stat2, l: c.stat2Label },
            { v: c.stat3, l: c.stat3Label },
          ].map((s, i) => (
            <div key={i} className={`px-2 text-center sm:px-4 ${i > 0 ? 'border-l border-charcoal-deep/10' : ''}`}>
              <div className="font-display text-[clamp(28px,4vw,44px)] font-bold leading-none text-charcoal-deep">{s.v}</div>
              <div className="mt-2 text-[12px] font-medium text-ink-soft sm:text-[13px]">{s.l}</div>
            </div>
          ))}
          <Bloom size={32} color="var(--color-sunlit-clay)" style={{ position: 'absolute', top: -16, left: 'calc(33% - 8px)' }} />
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
