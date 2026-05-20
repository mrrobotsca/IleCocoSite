import Link from 'next/link'
import { headers } from 'next/headers'

type Lang = 'en' | 'fr'

// The locale prefix is on the URL the visitor tried to reach; the middleware
// exposes it via the x-pathname header. Default to English to match the
// <html lang> the root layout picks for unprefixed paths.
const detectLang = (pathname: string | null): Lang =>
  pathname === '/fr' || pathname?.startsWith('/fr/') ? 'fr' : 'en'

const COPY: Record<Lang, Record<string, string>> = {
  en: {
    badge: 'Page not found',
    title: 'This little page wandered off',
    body: 'The page you’re looking for doesn’t exist or has moved — but our two daycare homes in Montréal are right here.',
    home: 'Back to home',
    somerled: 'NDG (Somerled) daycare',
    lachine: 'Lachine daycare',
    help: 'Still stuck? Email us at',
  },
  fr: {
    badge: 'Page introuvable',
    title: 'Cette petite page s’est égarée',
    body: 'La page que vous cherchez n’existe pas ou a été déplacée — mais nos deux foyers de garderie à Montréal sont juste ici.',
    home: 'Retour à l’accueil',
    somerled: 'Garderie NDG (Somerled)',
    lachine: 'Garderie Lachine',
    help: 'Toujours coincé·e ? Écrivez-nous à',
  },
}

const pillDark =
  'inline-flex items-center justify-center rounded-full bg-charcoal-deep px-7 py-3.5 font-display text-[15px] font-semibold text-porcelain transition-all hover:-translate-y-0.5 hover:bg-black'
const pillOutline =
  'inline-flex items-center justify-center rounded-full border-[1.5px] border-charcoal-deep/20 px-7 py-3.5 font-display text-[15px] font-semibold text-charcoal-deep transition-all hover:-translate-y-0.5 hover:bg-charcoal-deep/5'

export default async function NotFound() {
  const headerStore = await headers()
  const lang = detectLang(headerStore.get('x-pathname'))
  const t = COPY[lang]

  return (
    <div className='min-h-screen bg-porcelain font-display text-charcoal-deep paper-grain'>
      <div className='mx-auto flex min-h-screen max-w-[660px] flex-col items-center justify-center px-6 py-20 text-center'>
        <p className='font-display text-[clamp(80px,18vw,150px)] font-bold leading-none tracking-[-0.04em] text-sunlit-clay'>
          404
        </p>
        <p className='mt-3 text-[12px] font-bold uppercase tracking-[0.14em] text-charcoal-deep/55'>
          {t.badge}
        </p>
        <h1 className='mt-5 font-display text-[clamp(28px,5vw,42px)] font-medium leading-[1.1] tracking-[-0.02em]'>
          {t.title}
        </h1>
        <p className='mt-4 max-w-[460px] text-[16px] leading-[1.6] text-charcoal-deep/70'>
          {t.body}
        </p>

        <div className='mt-9 flex flex-wrap items-center justify-center gap-3'>
          <Link href={`/${lang}`} className={pillDark}>
            {t.home}
          </Link>
          <Link href={`/${lang}/locations/somerled`} className={pillOutline}>
            {t.somerled}
          </Link>
          <Link href={`/${lang}/locations/lachine`} className={pillOutline}>
            {t.lachine}
          </Link>
        </div>

        <p className='mt-10 text-[13px] text-charcoal-deep/55'>
          {t.help}{' '}
          <a
            href='mailto:info@ilecoco.com'
            className='font-semibold text-charcoal-deep underline underline-offset-4'
          >
            info@ilecoco.com
          </a>
        </p>
      </div>
    </div>
  )
}
