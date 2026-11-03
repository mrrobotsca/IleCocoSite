import { Phone } from 'lucide-react'
import type { Lang } from './copy'
import { PHONE_HREF } from './links'

const LABEL: Record<Lang, string> = {
  fr: 'Appeler le 514-574-4695',
  en: 'Call 514-574-4695',
}

/**
 * Sticky call button on phones. Clicks are tracked as `phone_click` by the
 * site-wide listener (it's a plain tel: link). The spacer keeps the bar from
 * covering the end of the footer.
 */
export const MobileCallBar = ({ lang }: { lang: Lang }) => (
  <>
    <div aria-hidden='true' className='h-[76px] md:hidden' />
    <div className='fixed inset-x-0 bottom-0 z-40 border-t border-charcoal-deep/10 bg-porcelain/95 px-4 backdrop-blur-md pb-[max(env(safe-area-inset-bottom),12px)] pt-3 md:hidden'>
      <a
        href={PHONE_HREF}
        className='flex w-full items-center justify-center gap-2.5 rounded-full bg-charcoal-deep px-6 py-3.5 font-display text-[16px] font-semibold text-porcelain shadow-[0_8px_24px_rgba(0,0,0,0.18)] active:bg-black'
      >
        <Phone size={18} aria-hidden='true' />
        {LABEL[lang]}
      </a>
    </div>
  </>
)
