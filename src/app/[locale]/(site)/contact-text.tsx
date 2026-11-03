import { Fragment } from 'react'
import { CONTACT_EMAIL, EMAIL_HREF, PHONE_DISPLAY, PHONE_HREF } from './links'

const escapeRegExp = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const CONTACT_PATTERN = new RegExp(`(${escapeRegExp(PHONE_DISPLAY)}|${escapeRegExp(CONTACT_EMAIL)})`)

const LINK_CLASS = 'font-semibold underline underline-offset-2 hover:text-charcoal-deep'

/**
 * Renders copy text with the phone number and email turned into tel:/mailto:
 * links, so every number and address on the site is clickable (and tracked as
 * phone_click / email_click).
 */
export const ContactText = ({ children }: { children: string }) => (
  <>
    {children.split(CONTACT_PATTERN).map((part, i) => {
      if (part === PHONE_DISPLAY) {
        return (
          <a key={i} href={PHONE_HREF} className={LINK_CLASS}>
            {part}
          </a>
        )
      }
      if (part === CONTACT_EMAIL) {
        return (
          <a key={i} href={EMAIL_HREF} className={LINK_CLASS}>
            {part}
          </a>
        )
      }
      return <Fragment key={i}>{part}</Fragment>
    })}
  </>
)
