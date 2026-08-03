import { Body, Head, Html, Link, Text } from '@react-email/components'

export type SpotOpenLang = 'en' | 'fr'
export type SpotOpenBranch = 'somerled' | 'lachine'

export interface SpotOpenEmailProps {
  parentName: string
  lang: SpotOpenLang
  branch: SpotOpenBranch
  /** Calendly booking link */
  bookingUrl: string
  /** Google Business listing / Maps link for the branch */
  googleMapsUrl: string
}

/**
 * The location phrase reads naturally inside a sentence, e.g.
 * "…disponible à {LOCATION_PHRASE} pour votre enfant." The French Lachine variant
 * is the user-provided source of truth; the others are faithful adaptations.
 */
const LOCATION_PHRASE: Record<SpotOpenLang, Record<SpotOpenBranch, string>> = {
  fr: {
    lachine: 'la Garderie Île Coco 2 à Lachine',
    somerled: 'la Garderie Île Coco à Somerled (NDG)',
  },
  en: {
    lachine: 'Garderie Île Coco 2 in Lachine',
    somerled: 'Garderie Île Coco in Somerled (NDG)',
  },
}

const SIGNOFF: Record<SpotOpenLang, Record<SpotOpenBranch, string>> = {
  fr: {
    lachine: "L'équipe Île Coco Garderie 2",
    somerled: "L'équipe Île Coco",
  },
  en: {
    lachine: 'The Île Coco Garderie 2 team',
    somerled: 'The Île Coco team',
  },
}

interface SpotOpenCopy {
  subject: string
  greeting: string
  intro: string
  bookingIntro: string
  confirm: string
  changed: string
  learnMore: string
  learnMoreCta: string
  thanks: string
  signoff: string
}

const getSpotOpenCopy = (
  lang: SpotOpenLang,
  branch: SpotOpenBranch,
  parentName: string
): SpotOpenCopy => {
  const place = LOCATION_PHRASE[lang][branch]
  const signoff = SIGNOFF[lang][branch]

  if (lang === 'fr') {
    return {
      subject: `Une place est disponible à ${place}`,
      greeting: `Bonjour ${parentName},`,
      intro: `Bonne nouvelle : une place est maintenant disponible à ${place} pour votre enfant.`,
      bookingIntro:
        "Si vous êtes toujours intéressé(e), vous pouvez prendre rendez-vous pour une visite et l'inscription ici :",
      confirm: 'SVP, répondez à ce courriel pour nous confirmer votre intérêt.',
      changed:
        "Si votre situation a changé et que vous n'avez plus besoin d'une place, un petit mot de retour nous aiderait beaucoup.",
      learnMore: 'En savoir plus sur notre garderie :',
      learnMoreCta: 'Voir notre garderie sur Google',
      thanks: 'Merci et au plaisir,',
      signoff,
    }
  }

  return {
    subject: `A spot is available at ${place}`,
    greeting: `Hi ${parentName},`,
    intro: `Good news — a spot is now available at ${place} for your child.`,
    bookingIntro: "If you're still interested, you can book a visit and registration here:",
    confirm: 'Please reply to this email to confirm your interest.',
    changed:
      'If your situation has changed and you no longer need a spot, a quick note back would help us a lot.',
    learnMore: 'Learn more about our daycare:',
    learnMoreCta: 'See our daycare on Google',
    thanks: 'Thank you, and we look forward to hearing from you,',
    signoff,
  }
}

/** Subject line for the "spot open" email, localized per language + branch. */
export const getSpotOpenSubject = (lang: SpotOpenLang, branch: SpotOpenBranch): string =>
  getSpotOpenCopy(lang, branch, '').subject

/** Plaintext fallback body, built from the same copy for deliverability. */
export const buildSpotOpenText = ({
  parentName,
  lang,
  branch,
  bookingUrl,
  googleMapsUrl,
}: SpotOpenEmailProps): string => {
  const c = getSpotOpenCopy(lang, branch, parentName)
  return [
    c.greeting,
    '',
    c.intro,
    '',
    c.bookingIntro,
    bookingUrl,
    '',
    c.confirm,
    '',
    c.changed,
    '',
    c.learnMore,
    googleMapsUrl,
    '',
    c.thanks,
    c.signoff,
  ].join('\n')
}

// Intentionally plain, "personal email" styling — no outer canvas, no card, no button,
// no logo, no hidden preheader. A marketing-template look (gray background + white card +
// big centered CTA button) is exactly what pushes Gmail to file this under Promotions;
// a simple text-first message with inline links lands in Primary.
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

export function SpotOpenEmail({
  parentName,
  lang,
  branch,
  bookingUrl,
  googleMapsUrl,
}: SpotOpenEmailProps) {
  const copy = getSpotOpenCopy(lang, branch, parentName)

  return (
    <Html lang={lang}>
      <Head />
      <Body style={bodyStyle}>
        <Text style={paragraph}>{copy.greeting}</Text>
        <Text style={paragraph}>{copy.intro}</Text>
        <Text style={paragraph}>
          {copy.bookingIntro}
          <br />
          <Link href={bookingUrl} style={link}>
            {bookingUrl}
          </Link>
        </Text>
        <Text style={paragraph}>{copy.confirm}</Text>
        <Text style={paragraph}>{copy.changed}</Text>
        <Text style={paragraph}>
          {copy.learnMore}
          <br />
          <Link href={googleMapsUrl} style={link}>
            {copy.learnMoreCta}
          </Link>
        </Text>
        <Text style={paragraph}>
          {copy.thanks}
          <br />
          {copy.signoff}
        </Text>
      </Body>
    </Html>
  )
}

export default SpotOpenEmail
