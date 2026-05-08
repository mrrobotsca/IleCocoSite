'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils/css'
import { useLang } from './lang-context'
import { useWizard } from './wizard-context'
import { COPY } from './copy'
import { IleCocoLogo } from './doodles'

const NAV_ANCHORS = ['#programs', '#tuition', '#locations', '#faq', '#contact']

export const DaycareNav = () => {
  const { lang, setLang } = useLang()
  const { openWaitlist } = useWizard()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const items = COPY.nav[lang]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const ctaLabel = lang === 'en' ? 'Book a tour' : 'Réserver'

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={cn(
          'fixed left-1/2 top-[18px] z-50 flex w-[min(1240px,calc(100vw-32px))] -translate-x-1/2 items-center justify-between rounded-full border border-charcoal-deep/10 px-3 py-2.5 pl-[22px] backdrop-blur-md transition-all duration-300',
          scrolled ? 'bg-porcelain/95 shadow-[0_10px_36px_rgba(58,58,58,0.10)]' : 'bg-porcelain/85 shadow-[0_8px_30px_rgba(58,58,58,0.06)]',
        )}
      >
        <a href="#top" className="flex items-center gap-2.5">
          <IleCocoLogo size={42} />
          <span className="font-display text-[19px] font-bold tracking-[-0.01em] text-charcoal-deep">Ile CoCo</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {items.map((label, i) => (
            <a
              key={label}
              href={NAV_ANCHORS[i]}
              className="rounded-full px-4 py-2.5 font-display text-[14px] font-semibold text-charcoal-deep transition-colors hover:bg-charcoal-deep/10"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <div className="flex rounded-full bg-charcoal-deep/[0.06] p-[3px] font-display text-[12px] font-semibold">
            {(['en', 'fr'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={cn(
                  'rounded-full px-3 py-1.5 uppercase tracking-[0.06em] transition-colors',
                  lang === l ? 'bg-charcoal-deep text-porcelain' : 'text-charcoal-deep hover:bg-charcoal-deep/10',
                )}
                aria-pressed={lang === l}
              >
                {l}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={openWaitlist}
            className="hidden items-center gap-2 rounded-full bg-charcoal-deep px-[18px] py-2.5 font-display text-[13px] font-semibold text-porcelain transition-all hover:-translate-y-0.5 hover:bg-black hover:shadow-[0_8px_24px_rgba(0,0,0,0.18)] sm:inline-flex"
          >
            {ctaLabel}
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-porcelain text-[13px] text-charcoal-deep">→</span>
          </button>
          <button
            onClick={() => setOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full bg-charcoal-deep/[0.06] text-charcoal-deep lg:hidden"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[60] bg-charcoal-deep/40 backdrop-blur-sm lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="ml-auto flex h-full w-[min(420px,90vw)] flex-col bg-porcelain p-7 pt-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <IleCocoLogo size={40} />
                  <span className="font-display text-[18px] font-bold text-charcoal-deep">Ile CoCo</span>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-charcoal-deep/[0.06] text-charcoal-deep"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="mt-10 flex flex-col gap-1">
                {items.map((label, i) => (
                  <a
                    key={label}
                    href={NAV_ANCHORS[i]}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl px-4 py-4 font-display text-[22px] font-semibold text-charcoal-deep transition-colors hover:bg-charcoal-deep/[0.06]"
                  >
                    {label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  openWaitlist()
                }}
                className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-charcoal-deep px-7 py-4 font-display text-[15px] font-semibold text-porcelain"
              >
                {ctaLabel}
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-porcelain text-[13px] text-charcoal-deep">→</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
