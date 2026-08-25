import { Body, Head, Html, Link, Text } from '@react-email/components'
import type { SpotOpenBranch, SpotOpenLang } from './spot-open-email'

/**
 * Branch for the reminder. 'general' is used when the applicant's preferred
 * location is 'either' — the copy then refers to the daycare without naming
 * a specific branch.
 */
export type SpotReminderBranch = SpotOpenBranch | 'general'

export interface SpotReminderEmailProps {
  parentName: string
  lang: SpotOpenLang
  branch: SpotReminderBranch
  /** Calendly booking link */
  bookingUrl: string
}

const LOCATION_PHRASE: Record<SpotOpenLang, Record<SpotReminderBranch, string>> = {
  fr: {
    lachine: 'la Garderie Île Coco 2 à Lachine',
    somerled: 'la Garderie Île Coco à Somerled (NDG)',
    general: 'la Garderie Île Coco',
  },
  en: {
    lachine: 'Garderie Île Coco 2 in Lachine',
    somerled: 'Garderie Île Coco in Somerled (NDG)',
    general: 'Garderie Île Coco',
  },
}

const SIGNOFF: Record<SpotOpenLang, Record<SpotReminderBranch, string>> = {
  fr: {
    lachine: "L'équipe Île Coco Garderie 2",
    somerled: "L'équipe Île Coco",
    general: "L'équipe Île Coco",
  },
  en: {
    lachine: 'The Île Coco Garderie 2 team',
    somerled: 'The Île Coco team',
    general: 'The Île Coco team',
  },
}

interface SpotReminderCopy {
  subject: string
  greeting: string
  intro: string
  alreadyRegistered: string
  stillInterested: string
  changed: string
  thanks: string
  signoff: string
}

const getSpotReminderCopy = (
  lang: SpotOpenLang,
  branch: SpotReminderBranch,
  parentName: string
): SpotReminderCopy => {
  const place = LOCATION_PHRASE[lang][branch]
  const signoff = SIGNOFF[lang][branch]

  if (lang === 'fr') {
    return {
      subject: `Petit suivi — la place à ${place} est toujours disponible`,
      greeting: `Bonjour ${parentName},`,
      intro: `Nous vous avons récemment écrit pour vous offrir une place à ${place} pour votre enfant, et nous n'avons pas encore eu de vos nouvelles. Voici donc un petit suivi amical, simplement pour nous assurer que notre message s'est bien rendu.`,
      alreadyRegistered:
        "Vous avez déjà complété l'inscription ou renvoyé le formulaire? Alors tout est en ordre — vous pouvez simplement ignorer ce courriel.",
      stillInterested:
        "Si vous souhaitez toujours la place, merci de nous le confirmer dès que possible — il suffit de répondre à ce courriel, ou de réserver votre visite et l'inscription ici :",
      changed:
        "Si vos plans ont changé et que vous n'avez plus besoin de place, un petit mot de votre part nous aiderait beaucoup : cela nous permettra d'offrir la place à une autre famille sur la liste d'attente.",
      thanks: 'Merci et au plaisir,',
      signoff,
    }
  }

  return {
    subject: `Quick follow-up — the spot at ${place} is still available`,
    greeting: `Hi ${parentName},`,
    intro: `We recently emailed you to offer a spot at ${place} for your child, and we haven't heard back yet. This is just a friendly follow-up to make sure our message reached you.`,
    alreadyRegistered:
      "Already completed the registration or sent back the form? Then everything is in order — please simply ignore this email.",
    stillInterested:
      "If you'd still like the spot, please let us know as soon as possible — just reply to this email, or book your visit and registration here:",
    changed:
      'If your plans have changed and you no longer need a spot, a quick note back would help us a lot: it lets us offer the place to another family on the waitlist.',
    thanks: 'Thank you, and we look forward to hearing from you,',
    signoff,
  }
}

/** Subject line for the reminder email, localized per language + branch. */
export const getSpotReminderSubject = (lang: SpotOpenLang, branch: SpotReminderBranch): string =>
  getSpotReminderCopy(lang, branch, '').subject

/** Plaintext fallback body, built from the same copy for deliverability. */
export const buildSpotReminderText = ({
  parentName,
  lang,
  branch,
  bookingUrl,
}: SpotReminderEmailProps): string => {
  const c = getSpotReminderCopy(lang, branch, parentName)
  return [
    c.greeting,
    '',
    c.intro,
    '',
    c.alreadyRegistered,
    '',
    c.stillInterested,
    bookingUrl,
    '',
    c.changed,
    '',
    c.thanks,
    c.signoff,
  ].join('\n')
}

// Same plain, "personal email" styling as the spot-open email — no card, no button,
// no logo — so Gmail keeps it in Primary rather than Promotions.
const bodyStyle = {
  margin: 0,
  padding: '20px',
  backgroundColor: '#ffffff',
}

const paragraph = {
  margin: '0 0 14px',
  fontSize: '15px',
  lineHeight: '1.5',
  color: '#222222',
  fontFamily: "-apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
}

const link = {
  color: '#1a56db',
  textDecoration: 'underline',
}

export function SpotReminderEmail({
  parentName,
  lang,
  branch,
  bookingUrl,
}: SpotReminderEmailProps) {
  const copy = getSpotReminderCopy(lang, branch, parentName)

  return (
    <Html lang={lang}>
      <Head />
      <Body style={bodyStyle}>
        <Text style={paragraph}>{copy.greeting}</Text>
        <Text style={paragraph}>{copy.intro}</Text>
        <Text style={paragraph}>
          <strong>{copy.alreadyRegistered}</strong>
        </Text>
        <Text style={paragraph}>
          {copy.stillInterested}
          <br />
          <Link href={bookingUrl} style={link}>
            {bookingUrl}
          </Link>
        </Text>
        <Text style={paragraph}>{copy.changed}</Text>
        <Text style={paragraph}>
          {copy.thanks}
          <br />
          {copy.signoff}
        </Text>
      </Body>
    </Html>
  )
}

export default SpotReminderEmail
