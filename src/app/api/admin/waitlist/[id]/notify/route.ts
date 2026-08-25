import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/database'
import { waitlistApplicant } from '@/database/schema'
import { requireAdmin } from '@/lib/auth/admin'
import { sendWaitlistReminder } from '@/lib/waitlist/send-reminder'
import { getBrandConfig, getLocation } from '@/config/branding'
import { getFromEmailAddress, hasEmailService, sendEmail } from '@/lib/messaging/email'
import { renderSpotOpenEmail } from '@/components/emails/render'
import {
  buildSpotOpenText,
  getSpotOpenSubject,
  type SpotOpenEmailProps,
  type SpotOpenLang,
} from '@/components/emails/waitlist'

const BodySchema = z
  .object({
    type: z.enum(['offer', 'reminder']).default('offer'),
    branch: z.enum(['somerled', 'lachine']).optional(),
  })
  .refine((b) => b.type === 'reminder' || b.branch !== undefined, {
    message: 'branch is required for offer emails',
    path: ['branch'],
  })

/**
 * Sends a waitlist email to a single applicant. Admin-only.
 *
 * - `type: 'offer'` (default) — the "a spot is open" email; on success marks the
 *   applicant `offered` and stamps `notifiedAt`.
 * - `type: 'reminder'` — the friendly follow-up; only allowed while the applicant
 *   is still `offered` (never placed/closed), stamps `remindedAt`.
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: gate.status })
  }

  const { id } = await ctx.params

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 }
    )
  }
  const { type, branch } = parsed.data

  // Guard against the mailer silently falling back to the log provider — we don't want
  // to mark someone "offered" when no real email actually went out.
  if (!hasEmailService()) {
    return NextResponse.json(
      { success: false, error: 'Email service not configured' },
      { status: 503 }
    )
  }

  const [applicant] = await db
    .select()
    .from(waitlistApplicant)
    .where(eq(waitlistApplicant.id, id))
    .limit(1)

  if (!applicant) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  if (type === 'reminder') {
    const result = await sendWaitlistReminder(applicant)
    if (!result.ok) {
      return result.error === 'not-offered'
        ? NextResponse.json(
            { success: false, error: 'Reminders can only be sent to applicants with an active offer' },
            { status: 409 }
          )
        : NextResponse.json({ success: false, error: 'Email failed to send' }, { status: 502 })
    }
    return NextResponse.json({ success: true, data: result.applicant })
  }

  // The schema refine guarantees branch is present for offer emails.
  if (!branch) {
    return NextResponse.json({ success: false, error: 'Validation failed' }, { status: 400 })
  }

  const brand = getBrandConfig()
  const location = getLocation(branch)
  const lang: SpotOpenLang = applicant.lang === 'en' ? 'en' : 'fr'

  const emailProps: SpotOpenEmailProps = {
    parentName: applicant.parentName,
    lang,
    branch,
    bookingUrl: brand.bookingUrl ?? 'https://calendly.com/ilecocodaycare',
    googleMapsUrl: location.googleMapsUrl,
  }

  const html = await renderSpotOpenEmail(emailProps)
  const text = buildSpotOpenText(emailProps)

  const result = await sendEmail({
    to: applicant.parentEmail,
    subject: getSpotOpenSubject(lang, branch),
    html,
    text,
    from: getFromEmailAddress(),
    replyTo: brand.supportEmail,
    emailType: 'transactional',
  })

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: 'Email failed to send' },
      { status: 502 }
    )
  }

  const [updated] = await db
    .update(waitlistApplicant)
    .set({ status: 'offered', notifiedAt: new Date() })
    .where(eq(waitlistApplicant.id, id))
    .returning()

  return NextResponse.json({ success: true, data: updated })
}
