'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from './lang-context'
import { COPY, PHOTOS } from './copy'
import { Spiral } from './doodles'
import { Eyebrow, PillLink, SectionTitle } from './ui'
import { INSTAGRAM_URL } from './links'

const PHOTOS_LIST = [
  PHOTOS.gallery1,
  PHOTOS.gallery2,
  PHOTOS.gallery3,
  PHOTOS.gallery4,
  PHOTOS.gallery5,
  PHOTOS.gallery6,
  PHOTOS.gallery7,
  PHOTOS.gallery8,
]

const SPANS = [
  'sm:col-span-1 sm:row-span-2',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-2 sm:row-span-1',
  'sm:col-span-1 sm:row-span-2',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-1 sm:row-span-1',
  'sm:col-span-2 sm:row-span-1',
]

export const Gallery = () => {
  const { lang } = useLang()
  const c = COPY.gallery[lang]

  return (
    <section className='relative overflow-hidden bg-porcelain py-24 lg:py-28'>
      <Spiral
        size={42}
        color='var(--color-sandy-clay)'
        style={{ position: 'absolute', top: 60, right: '10%', opacity: 0.6 }}
      />

      <div className='mx-auto max-w-[1280px] px-8'>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='mb-11 flex flex-wrap items-end justify-between gap-8'
        >
          <div>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <SectionTitle className='mt-5'>
              {c.title1}
              <br />
              <span className='font-italic-serif font-medium not-italic'>{c.title2}</span>
            </SectionTitle>
          </div>
          <div className='max-w-[380px]'>
            <p className='mb-4 text-[16px] text-ink-soft'>{c.sub}</p>
            <PillLink
              href={INSTAGRAM_URL}
              target='_blank'
              rel='noopener noreferrer'
              variant='ghost'
              size='sm'
              withArrow
            >
              {c.cta}
            </PillLink>
          </div>
        </motion.div>

        <div className='grid grid-cols-2 gap-3.5 sm:grid-cols-4' style={{ gridAutoRows: '180px' }}>
          {PHOTOS_LIST.map((src, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: 'easeOut' }}
              whileHover={{ scale: 1.015 }}
              className={`group relative m-0 cursor-pointer overflow-hidden rounded-[22px] ${SPANS[i]}`}
            >
              <Image
                src={src}
                alt={c.captions[i]}
                fill
                sizes='(max-width: 640px) 50vw, 25vw'
                className='object-cover'
              />
              <figcaption className='absolute bottom-3.5 left-3.5 rounded-full bg-porcelain/95 px-3.5 py-1.5 font-display text-[12px] font-semibold text-charcoal-deep opacity-0 transition-opacity duration-200 group-hover:opacity-100'>
                {c.captions[i]}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Gallery
