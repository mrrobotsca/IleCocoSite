'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from './lang-context'
import { COPY, PHOTOS } from './copy'
import { StarBurst } from './doodles'
import { Eyebrow, SectionTitle } from './ui'
import { INSTAGRAM_URL } from './links'

const TILES = [
  PHOTOS.social1,
  PHOTOS.social2,
  PHOTOS.social3,
  PHOTOS.social4,
  PHOTOS.social5,
  PHOTOS.social6,
]

export const Social = () => {
  const { lang } = useLang()
  const c = COPY.social[lang]

  return (
    <section className='relative overflow-hidden pb-20 pt-24'>
      <StarBurst
        size={28}
        color='var(--color-charcoal-deep)'
        style={{ position: 'absolute', top: 80, right: '12%' }}
      />

      <div className='mx-auto max-w-[1280px] px-8'>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='mb-12 text-center'
        >
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <SectionTitle className='mt-5'>
            {c.title1}
            <br />
            <span className='font-italic-serif font-medium not-italic'>{c.title2}</span>
          </SectionTitle>
          <p className='mx-auto mt-3 max-w-[560px] text-[16px] text-ink-soft'>{c.sub}</p>
        </motion.div>

        <div className='grid grid-cols-3 gap-3.5 md:grid-cols-6'>
          {TILES.map((src, i) => (
            <motion.a
              key={i}
              href={INSTAGRAM_URL}
              target='_blank'
              rel='noopener noreferrer'
              initial={{ opacity: 0, scale: 0.92 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ scale: 1.04 }}
              className='relative aspect-square overflow-hidden rounded-[18px]'
            >
              <Image
                src={src}
                alt=''
                fill
                sizes='(max-width: 768px) 33vw, 16vw'
                className='object-cover'
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Social
