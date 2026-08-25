'use client'

import { motion } from 'framer-motion'
import { useLang } from './lang-context'
import { COPY } from './copy'
import { CloudHen, QuoteMark, Sparkle, WaveDivider } from './doodles'
import { Eyebrow, SectionTitle } from './ui'

export const Testimonials = () => {
  const { lang } = useLang()
  const c = COPY.testimonials[lang]

  return (
    <section className='relative'>
      <WaveDivider fill='var(--color-sandy-clay-soft)' height={50} />
      <div className='relative overflow-hidden bg-sandy-clay-soft pb-28 pt-24'>
        <CloudHen size={100} style={{ position: 'absolute', top: 60, left: '6%', opacity: 0.85 }} />
        <Sparkle
          size={24}
          color='var(--color-charcoal-deep)'
          style={{ position: 'absolute', top: 160, right: '8%' }}
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
              {c.title1}
              <br />
              <span className='font-italic-serif font-medium not-italic'>{c.title2}</span>
            </SectionTitle>
          </motion.div>

          <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
            {c.items.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: i * 0.1, ease: 'easeOut' }}
                className='relative rounded-[28px] bg-porcelain p-8 shadow-[0_14px_36px_rgba(58,58,58,0.08)]'
              >
                <QuoteMark size={32} style={{ position: 'absolute', top: -16, left: 24 }} />
                <p className='my-3 mb-6 font-italic-serif text-[17px] italic leading-[1.55] text-charcoal-deep'>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className='flex items-center gap-3'>
                  {/*
                    Monogram, not a photo. These were three Unsplash stock portraits
                    of strangers standing in for named parents quoted from real Google
                    reviews — a misrepresentation, and a cross-origin image request on
                    every homepage load. Initials say the same thing honestly.
                  */}
                  <div
                    aria-hidden='true'
                    className='grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-ash-green font-display text-[15px] font-bold text-charcoal-deep'
                  >
                    {t.name
                      .split(' ')
                      .map((part) => part[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                  <div>
                    <div className='font-display text-[14px] font-bold text-charcoal-deep'>
                      {t.name}
                    </div>
                    <div className='text-[12px] text-ink-soft'>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <WaveDivider fill='var(--color-sandy-clay-soft)' height={50} flip />
    </section>
  )
}

export default Testimonials
