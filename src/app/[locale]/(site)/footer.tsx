'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Mail } from 'lucide-react'
import { useLang } from './lang-context'
import { COPY, type Lang } from './copy'
import { Blob, CocoTree, IleCocoLogo, Sparkle } from './doodles'
import { useWizard } from './wizard-context'
import { BOOKING_URL, CONTACT_EMAIL, INSTAGRAM_URL } from './links'

export const DaycareFooter = () => {
  const { lang } = useLang()
  const { openWaitlist } = useWizard()
  const f = COPY.footer[lang]
  const ctaC = COPY.cta[lang]

  return (
    <>
      <section id='contact' className='relative'>
        <div className='relative mx-6 overflow-hidden rounded-t-[48px] bg-charcoal-deep px-8 pb-24 pt-24 text-center text-porcelain sm:px-10'>
          <Blob
            size={240}
            fill='var(--color-ash-green-deep)'
            style={{ position: 'absolute', top: -60, left: -60, opacity: 0.4 }}
          />
          <Blob
            size={200}
            fill='var(--color-sunlit-clay)'
            style={{ position: 'absolute', bottom: -80, right: -50, opacity: 0.3 }}
          />
          <Sparkle
            size={28}
            color='var(--color-sunlit-clay)'
            style={{ position: 'absolute', top: 80, right: '20%' }}
          />
          <CocoTree
            size={48}
            color='var(--color-porcelain)'
            style={{ position: 'absolute', top: 120, left: '15%', opacity: 0.6 }}
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className='relative mx-auto max-w-[920px]'
          >
            <h2 className='font-display text-[clamp(36px,5vw,72px)] font-medium leading-[1.05] tracking-[-0.02em]'>
              {ctaC.title1}
              <br />
              <span className='font-italic-serif font-medium not-italic'>{ctaC.title2}</span>
            </h2>
            <p className='mx-auto mt-6 mb-9 max-w-[480px] text-[17px] text-porcelain/75'>
              {ctaC.sub}
            </p>

            <div className='flex flex-col items-center justify-center gap-3 sm:flex-row'>
              <a
                href={BOOKING_URL}
                target='_blank'
                rel='noopener noreferrer'
                className='group inline-flex items-center gap-2.5 rounded-full bg-sunlit-clay px-7 py-4 font-display text-[15px] font-semibold text-charcoal-deep transition-all hover:-translate-y-0.5 hover:bg-sunlit-clay-soft'
              >
                {ctaC.cta1}
                <span className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-charcoal-deep text-[13px] text-porcelain'>
                  →
                </span>
              </a>
              <button
                type='button'
                onClick={openWaitlist}
                className='inline-flex items-center gap-2.5 rounded-full border-[1.5px] border-porcelain/30 bg-transparent px-7 py-4 font-display text-[15px] font-semibold text-porcelain transition-all hover:-translate-y-0.5 hover:bg-porcelain hover:text-charcoal-deep'
              >
                {ctaC.cta2}
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className='relative bg-charcoal-deep pb-10 pt-16 text-porcelain'>
        <div className='mx-auto grid max-w-[1280px] gap-12 border-t border-porcelain/10 px-8 pt-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:gap-12'>
          <div>
            <a href='#top' className='flex items-center gap-3'>
              <IleCocoLogo size={46} />
              <span className='font-display text-[22px] font-bold'>Ile CoCo</span>
            </a>
            <p className='mt-4 max-w-[280px] text-[14px] leading-[1.6] text-porcelain/70'>
              {f.tagline}
            </p>
            <div className='mt-5 space-y-1.5 text-[13px] leading-[1.85] text-porcelain/60'>
              <div>{f.addr}</div>
              <div>
                <a
                  href={`tel:${f.phone.replace(/\s|-|\(|\)/g, '')}`}
                  className='hover:text-porcelain'
                >
                  {f.phone}
                </a>
              </div>
              <div>
                <a href={`mailto:${f.email}`} className='hover:text-porcelain'>
                  {f.email}
                </a>
              </div>
              <div className='pt-1'>{f.hours}</div>
            </div>
          </div>

          {[
            { title: f.col1, items: f.col1Items },
            { title: f.col2, items: f.col2Items },
            { title: f.col3, items: f.col3Items },
          ].map((col) => (
            <div key={col.title}>
              <div className='mb-5 font-display text-[12px] font-bold uppercase tracking-[0.08em] text-sunlit-clay-soft'>
                {col.title}
              </div>
              <ul className='flex flex-col gap-2.5'>
                {col.items.map((it) => (
                  <FooterLink key={it.label} label={it.label} href={it.href} lang={lang} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='mx-auto mt-16 flex max-w-[1280px] flex-wrap items-center justify-between gap-4 border-t border-porcelain/10 px-8 pt-6 text-[12px] text-porcelain/55'>
          <span>{f.copyright}</span>
          <div className='flex items-center gap-4'>
            <a
              href={INSTAGRAM_URL}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='Instagram'
              className='hover:text-porcelain'
            >
              <Instagram size={16} />
            </a>
            <a href={`mailto:${f.email}`} aria-label='Email' className='hover:text-porcelain'>
              <Mail size={16} />
            </a>
          </div>
        </div>
      </footer>
    </>
  )
}

const FOOTER_LINK_CLASS =
  'text-[14px] text-porcelain/85 transition-colors hover:text-porcelain'

/**
 * Footer link. `href` comes from the copy registry and is one of:
 *   - a locale-relative route  ("/programs")   → internal <Link>
 *   - a same-page anchor       ("#gallery")    → plain anchor
 *   - a token                  ("waitlist" | "booking" | "instagram" | "mailto")
 *
 * This used to infer the destination by substring-matching the label, which meant
 * a label change silently rerouted the link — and no branch ever produced an
 * internal page URL.
 */
const FooterLink = ({ label, href, lang }: { label: string; href: string; lang: Lang }) => {
  if (href === 'waitlist') {
    return (
      <li>
        <WaitlistFooterLink label={label} />
      </li>
    )
  }

  if (href === 'booking' || href === 'instagram') {
    return (
      <li>
        <a
          href={href === 'booking' ? BOOKING_URL : INSTAGRAM_URL}
          target='_blank'
          rel='noopener noreferrer'
          className={FOOTER_LINK_CLASS}
        >
          {label}
        </a>
      </li>
    )
  }

  if (href === 'mailto') {
    return (
      <li>
        <a href={`mailto:${CONTACT_EMAIL}`} className={FOOTER_LINK_CLASS}>
          {label}
        </a>
      </li>
    )
  }

  // Anchors stay on the current page; routes get the locale prefix.
  if (href.startsWith('#')) {
    return (
      <li>
        <a href={href} className={FOOTER_LINK_CLASS}>
          {label}
        </a>
      </li>
    )
  }

  return (
    <li>
      <Link href={`/${lang}${href}`} className={FOOTER_LINK_CLASS}>
        {label}
      </Link>
    </li>
  )
}

const WaitlistFooterLink = ({ label }: { label: string }) => {
  const { openWaitlist } = useWizard()
  return (
    <button
      type='button'
      onClick={openWaitlist}
      className='text-left text-[14px] text-porcelain/85 transition-colors hover:text-porcelain'
    >
      {label}
    </button>
  )
}

export default DaycareFooter
