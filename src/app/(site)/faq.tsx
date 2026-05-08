'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from './lang-context'
import { COPY } from './copy'
import { CurlyArrow, Spiral } from './doodles'
import { Eyebrow, SectionTitle } from './ui'

export const FAQ = () => {
  const { lang } = useLang()
  const c = COPY.faq[lang]
  const [open, setOpen] = useState<number>(0)

  return (
    <section id="faq" className="relative overflow-hidden py-24 lg:py-28">
      <Spiral size={48} style={{ position: 'absolute', top: 80, right: '8%', opacity: 0.4 }} />

      <div className="mx-auto grid max-w-[1280px] items-start gap-14 px-8 lg:grid-cols-[0.9fr_1.3fr] lg:gap-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="lg:sticky lg:top-[120px]"
        >
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <SectionTitle className="mt-5">
            {c.title1}
            <br />
            <span className="font-italic-serif font-medium not-italic">{c.title2}</span>
          </SectionTitle>
          <div className="mt-6 hidden items-center gap-3 lg:flex">
            <CurlyArrow width={70} height={50} />
            <span className="font-hand text-[22px] text-charcoal-deep" style={{ transform: 'rotate(-4deg)' }}>
              {c.tapHint}
            </span>
          </div>
        </motion.div>

        <div>
          {c.items.map((it, i) => {
            const isOpen = open === i
            return (
              <div
                key={i}
                className={`border-t border-charcoal-deep/10 ${i === c.items.length - 1 ? 'border-b' : ''}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-5 bg-transparent py-6 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-[18px] font-semibold text-charcoal-deep sm:text-[19px]">{it.q}</span>
                  <span
                    className={`grid h-9 w-9 flex-shrink-0 place-items-center rounded-full text-[18px] transition-all duration-300 ${
                      isOpen ? 'bg-charcoal-deep text-porcelain' : 'bg-porcelain-warm text-charcoal-deep'
                    }`}
                    style={{ transform: isOpen ? 'rotate(45deg)' : 'rotate(0)' }}
                  >
                    +
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[640px] pb-6 text-[16px] leading-[1.6] text-ink-soft">{it.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQ
