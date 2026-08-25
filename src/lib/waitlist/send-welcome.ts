import 'server-only'

import { eq } from 'drizzle-orm'
import { db } from '@/database'
import { waitlistApplicant } from '@/database/schema'
import { getBrandConfig } from '@/config/branding'
import { getFromEmailAddress, sendEmail } from '@/lib/messaging/email'
import { renderWaitlistWelcomeEmail } from '@/components/emails/render'
import {
  buildWaitlistWelcomeText,
  getWaitlistWelcomeSubject,
  type SpotOpenLang,
  type WaitlistWelcomeBranch,
  type WaitlistWelcomeEmailProps,
} from '@/components/emails/waitlist'

type Applicant = typeof waitlistApplicant.$inferSelect

export type SendWelcomeResult =
  | { ok: true }
  | { ok: false; error: 'already-sent' | 'send-failed' }

/**
 * Sends the "you're on the list — book a visit" email straight after a family
 * completes the waitlist form, and stamps `welcomedAt`.
 *
 * Sent once per applicant: `welcomedAt` guards against a double POST or a retry
 * re-sending it. Failure here must never fail the signup — the application is
 * already saved by the time this runs.
 */
export const sendWaitlistWelcome = async (applicant: Applicant): Promise<SendWelcomeResult> => {
  if (applicant.welcomedAt) {
    return { ok: false, error: 'already-sent' }
  }

  const brand = getBrandConfig()
  const lang: SpotOpenLang = applicant.lang === 'en' ? 'en' : 'fr'
  const branch: WaitlistWelcomeBranch =
    applicant.preferredLocation === 'somerled' || applicant.preferredLocation === 'lachine'
      ? applicant.preferredLocation
      : 'general'

  const emailProps: WaitlistWelcomeEmailProps = {
    parentName: applicant.parentName,
    childFirstName: applicant.childFirstName,
    lang,
    branch,
    desiredStartDate: applicant.desiredStartDate,
    bookingUrl: brand.bookingUrl ?? 'https://calendly.com/ilecocodaycare',
  }

  const html = await renderWaitlistWelcomeEmail(emailProps)
  const text = buildWaitlistWelcomeText(emailProps)

  const result = await sendEmail({
    to: applicant.parentEmail,
    subject: getWaitlistWelcomeSubject(lang, applicant.childFirstName),
    html,
    text,
    from: getFromEmailAddress(),
    replyTo: brand.supportEmail,
    emailType: 'transactional',
  })

  if (!result.success) {
    return { ok: false, error: 'send-failed' }
  }

  await db
    .update(waitlistApplicant)
    .set({ welcomedAt: new Date() })
    .where(eq(waitlistApplicant.id, applicant.id))

  return { ok: true }
}
