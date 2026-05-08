'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Play } from 'lucide-react'
import { useLang } from './lang-context'
import { COPY } from './copy'
import {
  Bloom,
  CloudHen,
  CocoTree,
  HandUnderline,
  IleCocoLogo,
  Rocket,
  Sparkle,
  Squiggle,
  StarBurst,
} from './doodles'
import { Eyebrow, SectionTitle } from './ui'
import { cn } from '@/lib/utils/css'

type VideoTheme = 'sage' | 'clay' | 'sun'

type Video = {
  id: string
  kind: 'regular' | 'short'
  label: string
  caption: string
  theme: VideoTheme
}

export const Journey = () => {
  const { lang } = useLang()
  const c = COPY.journey[lang]
  const videos = c.videos as readonly Video[]
  const [activeIdx, setActiveIdx] = useState(0)
  const [playing, setPlaying] = useState(false)

  const active = videos[activeIdx]

  const swap = (idx: number) => {
    if (idx === activeIdx) return
    setActiveIdx(idx)
    setPlaying(false)
  }

  return (
    <section className='relative overflow-hidden py-24 lg:py-28'>
      <Bloom
        size={42}
        className='animate-wiggle'
        style={{ position: 'absolute', top: 70, right: '10%' }}
      />
      <Squiggle
        width={120}
        color='var(--color-ash-green-deep)'
        style={{ position: 'absolute', bottom: 60, left: '8%', opacity: 0.5 }}
      />

      <div className='mx-auto max-w-[1280px] px-8'>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className='mb-12 flex flex-wrap items-end justify-between gap-10'
        >
          <div>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <SectionTitle className='mt-5'>
              {c.title1}
              <br />
              <span className='font-italic-serif font-medium not-italic'>{c.title2}</span>
            </SectionTitle>
          </div>
          <p className='max-w-[380px] text-[16px] text-ink-soft'>{c.sub}</p>
        </motion.div>

        <div className='grid grid-cols-1 gap-6 lg:grid-cols-[1.65fr_1fr]'>
          {/* Featured player */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='relative overflow-hidden rounded-[32px] shadow-[0_24px_60px_rgba(58,58,58,0.18)]'
            style={{ aspectRatio: '16 / 10' }}
          >
            <AnimatePresence mode='wait'>
              {playing ? (
                <motion.iframe
                  key={`iframe-${active.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  src={`https://www.youtube.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={active.label}
                  allow='autoplay; encrypted-media; picture-in-picture'
                  allowFullScreen
                  className='h-full w-full border-0 bg-black'
                />
              ) : (
                <motion.div
                  key={`poster-${active.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className='h-full w-full'
                >
                  <FeaturedCover
                    video={active}
                    pressPlay={c.pressPlay}
                    watchLabel={c.watch}
                    onPlay={() => setPlaying(true)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Side rail */}
          <div className='grid auto-rows-fr grid-cols-1 gap-3.5'>
            {videos.map((v, i) => (
              <RailCover
                key={v.id}
                video={v}
                active={i === activeIdx}
                onClick={() => swap(i)}
                delay={i * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// =============================================================================
// Branded covers
// =============================================================================

const THEME_CLASSES: Record<VideoTheme, string> = {
  sage: 'bg-ash-green',
  clay: 'bg-sandy-clay-soft',
  sun: 'bg-sunlit-clay-soft',
}

const ThemeArtFeatured = ({ theme }: { theme: VideoTheme }) => {
  // Big atmospheric doodles + organic shapes for the featured slot
  switch (theme) {
    case 'sage':
      return (
        <>
          {/* Soft organic blob */}
          <svg
            className='absolute -left-12 -top-10 opacity-60'
            width='320'
            height='280'
            viewBox='0 0 320 280'
            aria-hidden
          >
            <path
              d='M40 100 C 30 50, 100 20, 170 35 C 240 50, 290 110, 270 180 C 250 250, 170 280, 100 260 C 40 245, 10 180, 40 100 Z'
              fill='var(--color-ash-green-deep)'
              opacity='0.45'
            />
          </svg>
          <CloudHen
            size={140}
            style={{ position: 'absolute', top: '12%', right: '10%' }}
            className='animate-drift'
          />
          <Sparkle
            size={28}
            color='var(--color-sunlit-clay)'
            style={{ position: 'absolute', top: '8%', left: '12%' }}
          />
          <Squiggle
            width={200}
            color='var(--color-charcoal-deep)'
            style={{ position: 'absolute', bottom: '12%', right: '6%', opacity: 0.4 }}
          />
          <Bloom
            size={36}
            color='var(--color-charcoal-deep)'
            style={{ position: 'absolute', bottom: '20%', left: '9%' }}
            className='animate-wiggle'
          />
        </>
      )
    case 'clay':
      return (
        <>
          <svg
            className='absolute -bottom-10 -right-10 opacity-55'
            width='340'
            height='300'
            viewBox='0 0 340 300'
            aria-hidden
          >
            <path
              d='M50 130 C 30 70, 90 30, 170 25 C 260 22, 320 90, 310 170 C 300 250, 220 290, 140 280 C 60 270, 20 200, 50 130 Z'
              fill='var(--color-sandy-clay)'
              opacity='0.7'
            />
          </svg>
          <CocoTree
            size={110}
            color='var(--color-charcoal-deep)'
            style={{ position: 'absolute', top: '14%', left: '10%' }}
            className='animate-wiggle'
          />
          <StarBurst
            size={32}
            color='var(--color-charcoal-deep)'
            style={{ position: 'absolute', top: '20%', right: '12%' }}
          />
          <Sparkle
            size={22}
            color='var(--color-charcoal-deep)'
            style={{ position: 'absolute', bottom: '18%', left: '14%' }}
          />
        </>
      )
    case 'sun':
      return (
        <>
          <svg
            className='absolute -top-10 -right-12 opacity-55'
            width='360'
            height='320'
            viewBox='0 0 360 320'
            aria-hidden
          >
            <path
              d='M60 140 C 40 70, 110 25, 200 30 C 290 35, 340 110, 320 200 C 300 280, 220 310, 140 290 C 70 275, 30 210, 60 140 Z'
              fill='var(--color-sunlit-clay)'
              opacity='0.55'
            />
          </svg>
          <Rocket
            size={120}
            style={{ position: 'absolute', top: '12%', left: '8%' }}
            className='animate-float-slow'
          />
          <Bloom
            size={32}
            color='var(--color-charcoal-deep)'
            style={{ position: 'absolute', top: '18%', right: '14%' }}
            className='animate-wiggle'
          />
          <Sparkle
            size={26}
            color='var(--color-charcoal-deep)'
            style={{ position: 'absolute', bottom: '16%', right: '10%' }}
          />
        </>
      )
  }
}

const ThemeArtRail = ({ theme }: { theme: VideoTheme }) => {
  switch (theme) {
    case 'sage':
      return (
        <>
          <svg
            className='absolute -left-4 -top-4 opacity-60'
            width='140'
            height='120'
            viewBox='0 0 140 120'
            aria-hidden
          >
            <path
              d='M20 50 C 10 25, 50 5, 90 10 C 125 14, 140 50, 130 80 C 115 110, 70 115, 40 105 C 15 95, 5 70, 20 50 Z'
              fill='var(--color-ash-green-deep)'
              opacity='0.4'
            />
          </svg>
          <CloudHen size={70} style={{ position: 'absolute', top: 12, right: 16 }} />
          <Sparkle
            size={14}
            color='var(--color-sunlit-clay)'
            style={{ position: 'absolute', bottom: 22, left: 20 }}
          />
        </>
      )
    case 'clay':
      return (
        <>
          <svg
            className='absolute -bottom-3 -right-3 opacity-65'
            width='160'
            height='130'
            viewBox='0 0 160 130'
            aria-hidden
          >
            <path
              d='M30 60 C 20 30, 60 10, 100 12 C 140 14, 158 50, 148 85 C 135 115, 90 125, 55 115 C 25 105, 15 80, 30 60 Z'
              fill='var(--color-sandy-clay)'
              opacity='0.7'
            />
          </svg>
          <CocoTree
            size={56}
            color='var(--color-charcoal-deep)'
            style={{ position: 'absolute', top: 14, left: 20 }}
          />
          <Sparkle
            size={12}
            color='var(--color-charcoal-deep)'
            style={{ position: 'absolute', top: 18, right: 32 }}
          />
        </>
      )
    case 'sun':
      return (
        <>
          <svg
            className='absolute -top-3 -right-4 opacity-55'
            width='160'
            height='130'
            viewBox='0 0 160 130'
            aria-hidden
          >
            <path
              d='M30 60 C 20 30, 60 10, 100 12 C 140 14, 158 50, 148 85 C 135 115, 90 125, 55 115 C 25 105, 15 80, 30 60 Z'
              fill='var(--color-sunlit-clay)'
              opacity='0.7'
            />
          </svg>
          <Rocket size={62} style={{ position: 'absolute', top: 16, left: 20 }} />
          <Bloom
            size={14}
            color='var(--color-charcoal-deep)'
            style={{ position: 'absolute', bottom: 22, right: 24 }}
          />
        </>
      )
  }
}

const FeaturedCover = ({
  video,
  pressPlay,
  watchLabel,
  onPlay,
}: {
  video: Video
  pressPlay: string
  watchLabel: string
  onPlay: () => void
}) => (
  <button
    type='button'
    onClick={onPlay}
    aria-label={`${watchLabel} — ${video.label}`}
    className={cn(
      'group relative block h-full w-full cursor-pointer overflow-hidden border-0 p-0 text-left',
      THEME_CLASSES[video.theme]
    )}
  >
    <ThemeArtFeatured theme={video.theme} />

    {/* Title block */}
    <div className='absolute inset-0 flex flex-col items-start justify-end gap-3 p-7 sm:p-10'>
      <div className='flex items-center gap-2 self-start rounded-full bg-porcelain/85 px-3 py-1.5 backdrop-blur-md'>
        <IleCocoLogo size={20} />
        <span className='font-display text-[11px] font-bold uppercase tracking-[0.08em] text-charcoal-deep'>
          Ile CoCo · {video.kind === 'short' ? 'Short' : 'Film'}
        </span>
      </div>
      <h3 className='relative max-w-[80%] font-display text-[clamp(28px,3.6vw,44px)] font-medium leading-[1.05] tracking-[-0.01em] text-charcoal-deep'>
        <span className='font-italic-serif font-medium not-italic'>{video.label}</span>
        <HandUnderline
          width={240}
          color='var(--color-charcoal-deep)'
          style={{ position: 'absolute', left: 0, bottom: -8, width: '70%', opacity: 0.45 }}
        />
      </h3>
      <p className='max-w-[420px] text-[14px] text-charcoal-deep/75'>{video.caption}</p>
    </div>

    {/* Center play button */}
    <span className='absolute left-1/2 top-1/2 grid h-[88px] w-[88px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-charcoal-deep text-porcelain shadow-[0_18px_40px_rgba(0,0,0,0.28)] transition-transform duration-200 group-hover:scale-105 sm:h-24 sm:w-24'>
      <Play size={28} fill='currentColor' />
    </span>

    {/* "press play" handwritten note */}
    <span
      className='absolute right-7 top-7 hidden font-hand text-[24px] text-charcoal-deep/70 sm:inline-block'
      style={{ transform: 'rotate(-4deg)' }}
    >
      {pressPlay}
    </span>
  </button>
)

const RailCover = ({
  video,
  active,
  onClick,
  delay,
}: {
  video: Video
  active: boolean
  onClick: () => void
  delay: number
}) => (
  <motion.button
    type='button'
    onClick={onClick}
    initial={{ opacity: 0, x: 30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: '-60px' }}
    transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    whileHover={{ y: -3 }}
    aria-pressed={active}
    aria-label={`Play ${video.label}`}
    className={cn(
      'group relative w-full overflow-hidden rounded-[22px] border-2 text-left shadow-[0_10px_24px_rgba(58,58,58,0.10)] transition-all',
      THEME_CLASSES[video.theme],
      active
        ? 'border-charcoal-deep ring-2 ring-charcoal-deep/15'
        : 'border-transparent hover:border-charcoal-deep/15'
    )}
    style={{ minHeight: 130 }}
  >
    <ThemeArtRail theme={video.theme} />

    {video.kind === 'short' && (
      <span className='absolute left-3 top-3 z-10 rounded-full bg-charcoal-deep px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-[0.08em] text-porcelain'>
        Short
      </span>
    )}

    <div className='absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-3.5'>
      <span className='max-w-[75%] font-display text-[14px] font-bold leading-tight text-charcoal-deep'>
        {video.label}
      </span>
      <span
        className={cn(
          'grid h-9 w-9 flex-shrink-0 place-items-center rounded-full shadow-md transition-colors',
          active
            ? 'bg-charcoal-deep text-porcelain'
            : 'bg-porcelain/95 text-charcoal-deep group-hover:bg-charcoal-deep group-hover:text-porcelain'
        )}
      >
        <Play size={12} fill='currentColor' />
      </span>
    </div>
  </motion.button>
)

export default Journey
