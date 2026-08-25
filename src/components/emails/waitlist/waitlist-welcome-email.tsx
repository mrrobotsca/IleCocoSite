import { Body, Head, Html, Link, Text } from '@react-email/components'
import type { SpotOpenLang } from './spot-open-email'
import type { SpotReminderBranch } from './spot-reminder-email'

/**
 * Sent immediately when a family completes the waitlist form.
 *
 * The point is not to confirm receipt — it is to get them booking a visit now.
 * Waiting until a spot opens means competing with every other daycare the family
 * applied to that week; a family that has already toured and registered for a
 * specific start date is a family that does not drift away.
 */
export type WaitlistWelcomeBranch = SpotReminderBranch

export interface WaitlistWelcomeEmailProps {
  parentName: string
  childFirstName: string
  lang: SpotOpenLang
  branch: WaitlistWelcomeBranch
  /** Desired start date, ISO `YYYY-MM-DD`. */
  desiredStartDate: string
  /** Calendly booking link */
  bookingUrl: string
}

const LOCATION_PHRASE: Record<SpotOpenLang, Record<WaitlistWelcomeBranch, string>> = {
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

const SIGNOFF: Record<SpotOpenLang, Record<WaitlistWelcomeBranch, string>> = {
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

/**
 * `YYYY-MM-DD` → "1 September 2026" / "1 septembre 2026".
 * Built in UTC because a bare ISO date parses as UTC midnight, which would shift
 * to the previous day when formatted in a negative-offset timezone like Montréal.
 */
const formatStartDate = (iso: string, lang: SpotOpenLang): string => {
  const [y, m, d] = iso.split('-').map(Number)
  if (!y || !m || !d) return iso
  return new Intl.DateTimeFormat(lang === 'fr' ? 'fr-CA' : 'en-CA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(y, m - 1, d)))
}

interface WelcomeCopy {
  subject: string
  greeting: string
  confirmed: string
  why: string
  bookLead: string
  onTheSpot: string
  questions: string
  thanks: string
  signoff: string
}

const getWelcomeCopy = (
  lang: SpotOpenLang,
  branch: WaitlistWelcomeBranch,
  parentName: string,
  childFirstName: string,
  desiredStartDate: string
): WelcomeCopy => {
  const place = LOCATION_PHRASE[lang][branch]
  const signoff = SIGNOFF[lang][branch]
  const startDate = formatStartDate(desiredStartDate, lang)

  if (lang === 'fr') {
    return {
      subject: `${childFirstName} est sur la liste — réservons votre visite`,
      greeting: `Bonjour ${parentName},`,
      confirmed: `Merci d'avoir inscrit ${childFirstName} sur la liste d'attente de ${place}. Nous avons bien reçu vos informations et votre demande est enregistrée pour un début le ${startDate}.`,
      why: "Une chose que nous avons apprise : les familles qui viennent nous voir tôt sont celles qui trouvent une place au bon moment. Attendre qu'une place se libère, c'est souvent attendre trop longtemps.",
      bookLead:
        'Nous aimerions donc vous rencontrer dès maintenant. Choisissez le moment qui vous convient ici :',
      onTheSpot: `La visite dure environ 30 minutes : vous voyez chaque salle, vous rencontrez les éducatrices, et vous posez toutes vos questions. Et si vous sentez que c'est le bon endroit pour ${childFirstName}, vous pouvez compléter l'inscription sur place, pour la date du ${startDate} — c'est la façon la plus sûre de réserver une place plutôt que d'en attendre une.`,
      questions:
        "Vous préférez d'abord poser une question? Répondez simplement à ce courriel — une vraie personne vous répondra, souvent le jour même.",
      thanks: 'Au plaisir de vous rencontrer,',
      signoff,
    }
  }

  return {
    subject: `${childFirstName} is on the list — let's book your visit`,
    greeting: `Hi ${parentName},`,
    confirmed: `Thank you for adding ${childFirstName} to the waitlist at ${place}. We have your details, and your request is on file for a ${startDate} start.`,
    why: 'One thing we have learned: the families who come and see us early are the ones who find a place at the right moment. Waiting for a spot to open often means waiting too long.',
    bookLead: 'So we would love to meet you now. Pick a time that suits you here:',
    onTheSpot: `A visit takes about 30 minutes: you see every room, meet the educators, and ask us anything. And if it feels like the right place for ${childFirstName}, you can complete the registration right there, for your ${startDate} start date — which is the surest way to hold a place rather than wait for one.`,
    questions:
      'Would you rather ask a question first? Just reply to this email — a real person answers, usually the same day.',
    thanks: 'We look forward to meeting you,',
    signoff,
  }
}

/** Subject line, localized per language + branch. */
export const getWaitlistWelcomeSubject = (
  lang: SpotOpenLang,
  childFirstName: string
): string => getWelcomeCopy(lang, 'general', '', childFirstName, '').subject

/** Plaintext fallback body, built from the same copy for deliverability. */
export const buildWaitlistWelcomeText = ({
  parentName,
  childFirstName,
  lang,
  branch,
  desiredStartDate,
  bookingUrl,
}: WaitlistWelcomeEmailProps): string => {
  const c = getWelcomeCopy(lang, branch, parentName, childFirstName, desiredStartDate)
  return [
    c.greeting,
    '',
    c.confirmed,
    '',
    c.why,
    '',
    c.bookLead,
    bookingUrl,
    '',
    c.onTheSpot,
    '',
    c.questions,
    '',
    c.thanks,
    c.signoff,
  ].join('\n')
}

// Same plain, "personal email" styling as the other waitlist emails — no card, no
// button, no logo — so Gmail keeps it in Primary rather than Promotions.
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

export function WaitlistWelcomeEmail({
  parentName,
  childFirstName,
  lang,
  branch,
  desiredStartDate,
  bookingUrl,
}: WaitlistWelcomeEmailProps) {
  const copy = getWelcomeCopy(lang, branch, parentName, childFirstName, desiredStartDate)

  return (
    <Html lang={lang}>
      <Head />
      <Body style={bodyStyle}>
        <Text style={paragraph}>{copy.greeting}</Text>
        <Text style={paragraph}>{copy.confirmed}</Text>
        <Text style={paragraph}>{copy.why}</Text>
        <Text style={paragraph}>
          {copy.bookLead}
          <br />
          <Link href={bookingUrl} style={link}>
            {bookingUrl}
          </Link>
        </Text>
        <Text style={paragraph}>{copy.onTheSpot}</Text>
        <Text style={paragraph}>{copy.questions}</Text>
        <Text style={paragraph}>
          {copy.thanks}
          <br />
          {copy.signoff}
        </Text>
      </Body>
    </Html>
  )
}

export default WaitlistWelcomeEmail
