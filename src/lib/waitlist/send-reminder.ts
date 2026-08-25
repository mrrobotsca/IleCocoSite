import 'server-only'

import { eq } from 'drizzle-orm'
import { db } from '@/database'
import { waitlistApplicant } from '@/database/schema'
import { getBrandConfig } from '@/config/branding'
import { getFromEmailAddress, sendEmail } from '@/lib/messaging/email'
import { renderSpotReminderEmail } from '@/components/emails/render'
import {
  buildSpotReminderText,
  getSpotReminderSubject,
  type SpotOpenLang,
  type SpotReminderBranch,
  type SpotReminderEmailProps,
} from '@/components/emails/waitlist'

type Applicant = typeof waitlistApplicant.$inferSelect

export type SendReminderResult =
  | { ok: true; applicant: Applicant }
  | { ok: false; error: 'not-offered' | 'send-failed' }

/**
 * Sends the friendly follow-up reminder to one applicant and stamps `remindedAt`.
 * Only applicants currently in `offered` status are eligible — placed/closed
 * families must never receive it.
 */
export const sendWaitlistReminder = async (applicant: Applicant): Promise<SendReminderResult> => {
  if (applicant.status !== 'offered') {
    return { ok: false, error: 'not-offered' }
  }

  const brand = getBrandConfig()
  const lang: SpotOpenLang = applicant.lang === 'en' ? 'en' : 'fr'
  const branch: SpotReminderBranch =
    applicant.preferredLocation === 'somerled' || applicant.preferredLocation === 'lachine'
      ? applicant.preferredLocation
      : 'general'

  const emailProps: SpotReminderEmailProps = {
    parentName: applicant.parentName,
    lang,
    branch,
    bookingUrl: brand.bookingUrl ?? 'https://calendly.com/ilecocodaycare',
  }

  const html = await renderSpotReminderEmail(emailProps)
  const text = buildSpotReminderText(emailProps)

  const result = await sendEmail({
    to: applicant.parentEmail,
    subject: getSpotReminderSubject(lang, branch),
    html,
    text,
    from: getFromEmailAddress(),
    replyTo: brand.supportEmail,
    emailType: 'transactional',
  })

  if (!result.success) {
    return { ok: false, error: 'send-failed' }
  }

  const [updated] = await db
    .update(waitlistApplicant)
    .set({ remindedAt: new Date() })
    .where(eq(waitlistApplicant.id, applicant.id))
    .returning()

  return { ok: true, applicant: updated }
}
