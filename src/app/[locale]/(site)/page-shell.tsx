import Link from 'next/link'

import { LangProvider } from './lang-context'
import { WizardProvider } from './wizard-context'
import { DaycareNav } from './daycare-nav'
import DaycareFooter from './footer'
import { WaitlistWizard } from './waitlist-wizard'
import { getLocaleHref, type Locale } from '@/lib/seo'

type Crumb = { name: string; href: string }

type PageShellProps = {
  locale: Locale
  /** Small caps line above the h1. */
  eyebrow: string
  title: string
  /** Lead paragraph under the h1. */
  intro?: string
  /** Breadcrumb trail, excluding Home (added automatically) and the current page. */
  breadcrumbs?: Crumb[]
  /** Label for the current page in the breadcrumb trail. */
  current: string
  children: React.ReactNode
}

/**
 * Shared chrome for the standalone content pages (about, contact, faq, programs,
 * tuition) so they inherit the same nav, footer, waitlist wizard, and heading
 * rhythm as the location pages instead of each re-implementing it.
 */
export const PageShell = ({
  locale,
  eyebrow,
  title,
  intro,
  breadcrumbs = [],
  current,
  children,
}: PageShellProps) => {
  const home = locale === 'fr' ? 'Accueil' : 'Home'

  return (
    <LangProvider initialLang={locale}>
      <WizardProvider>
        <div className='min-h-screen bg-porcelain font-display text-charcoal-deep paper-grain'>
          <DaycareNav />
          <main className='pt-28 sm:pt-32'>
            <article className='mx-auto max-w-[1100px] px-6 sm:px-8'>
              <nav aria-label={current} className='mb-6 text-[13px] text-charcoal-deep/60'>
                <ol className='flex flex-wrap items-center gap-1.5'>
                  <li>
                    <Link
                      href={getLocaleHref(locale, '/')}
                      className='hover:text-charcoal-deep'
                    >
                      {home}
                    </Link>
                  </li>
                  {breadcrumbs.map((crumb) => (
                    <li key={crumb.href} className='flex items-center gap-1.5'>
                      <span aria-hidden='true'>›</span>
                      <Link href={crumb.href} className='hover:text-charcoal-deep'>
                        {crumb.name}
                      </Link>
                    </li>
                  ))}
                  <li aria-hidden='true'>›</li>
                  <li className='text-charcoal-deep' aria-current='page'>
                    {current}
                  </li>
                </ol>
              </nav>

              <header className='max-w-[720px]'>
                <p className='mb-3 font-display text-[12px] font-bold uppercase tracking-[0.12em] text-sunlit-clay'>
                  {eyebrow}
                </p>
                <h1 className='font-display text-[clamp(34px,5vw,56px)] font-medium leading-[1.05] tracking-[-0.02em]'>
                  {title}
                </h1>
                {intro && (
                  <p className='mt-6 text-[17px] leading-[1.6] text-charcoal-deep/75'>{intro}</p>
                )}
              </header>

              {children}
            </article>
          </main>
          <DaycareFooter />
        </div>
        <WaitlistWizard />
      </WizardProvider>
    </LangProvider>
  )
}
