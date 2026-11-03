import type { Metadata } from 'next'
import Link from 'next/link'

import { PageShell } from './page-shell'
import { THANK_YOU_COPY } from './copy-pages'
import { PHONE_HREF, THANK_YOU_PATH, bookTourHref } from './links'
import { LeadConversion } from '@/components/analytics/lead-conversion'
import { generateMetadata as buildMetadata, getLocaleHref, type Locale } from '@/lib/seo'

/**
 * Thank-you page shared by /fr/merci and /en/thank-you. Each route renders it for
 * its own language only. It is noindexed and kept out of the sitemap: it exists
 * so Google Ads can count a waitlist submit as a `generate_lead` conversion.
 */
export const thankYouMetadata = (locale: Locale): Metadata => {
  const copy = THANK_YOU_COPY[locale]
  return buildMetadata({
    title: copy.metaTitle,
    description: copy.metaDescription,
    locale,
    canonical: getLocaleHref(locale, THANK_YOU_PATH[locale]),
    noindex: true,
  })
}

export const ThankYouPage = ({ locale }: { locale: Locale }) => {
  const copy = THANK_YOU_COPY[locale]

  return (
    <PageShell
      locale={locale}
      eyebrow={copy.eyebrow}
      title={copy.h1}
      intro={copy.intro}
      current={copy.eyebrow}
    >
      <LeadConversion />
      <section className='mt-12 mb-24 max-w-[720px] rounded-[24px] bg-white/70 p-8 shadow-[0_6px_24px_rgba(58,58,58,0.05)]'>
        <h2 className='font-display text-[20px] font-semibold tracking-[-0.01em]'>
          {copy.nextTitle}
        </h2>
        <p className='mt-3 text-[15px] leading-[1.6] text-charcoal-deep/75'>{copy.nextBody}</p>
        <div className='mt-6 flex flex-wrap gap-3'>
          <Link
            href={bookTourHref(locale)}
            className='inline-flex items-center gap-2.5 rounded-full bg-charcoal-deep px-7 py-3.5 font-display text-[15px] font-semibold text-porcelain transition-all hover:-translate-y-0.5 hover:bg-black'
          >
            {copy.bookTour}
          </Link>
          <a
            href={PHONE_HREF}
            className='inline-flex items-center gap-2.5 rounded-full border border-charcoal-deep/20 px-7 py-3.5 font-display text-[15px] font-semibold transition-all hover:-translate-y-0.5 hover:bg-charcoal-deep/5'
          >
            {copy.call}
          </a>
          <Link
            href={getLocaleHref(locale, '/')}
            className='inline-flex items-center px-3 py-3.5 font-display text-[15px] font-semibold underline-offset-4 hover:underline'
          >
            {copy.home}
          </Link>
        </div>
      </section>
    </PageShell>
  )
}
