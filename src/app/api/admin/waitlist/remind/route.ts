import { NextResponse } from 'next/server'
import { eq, inArray } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/database'
import { waitlistApplicant } from '@/database/schema'
import { requireAdmin } from '@/lib/auth/admin'
import { hasEmailService } from '@/lib/messaging/email'
import { sendWaitlistReminder } from '@/lib/waitlist/send-reminder'
import type { RemindAllSummary } from '@/lib/waitlist/schemas'

const BodySchema = z.object({
  /** Specific applicants to remind; omitted = every applicant in `offered` status. */
  ids: z.array(z.string().min(1)).min(1).max(500).optional(),
})

/**
 * Sends the follow-up reminder email in batch. Admin-only.
 *
 * With `ids`, only those applicants are targeted; anyone among them who is not
 * in `offered` status is skipped and reported back. Without `ids`, every
 * applicant currently in `offered` status is targeted. Either way a family
 * that already accepted a spot (placed/closed) can never receive the reminder.
 *
 * Emails go out sequentially — the list is small and this stays well within
 * provider rate limits.
 */
export async function POST(req: Request) {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: gate.status })
  }

  let body: unknown = {}
  try {
    body = await req.json()
  } catch {
    // Empty body is fine — it means "all offered".
  }

  const parsed = BodySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 }
    )
  }
  const { ids } = parsed.data

  if (!hasEmailService()) {
    return NextResponse.json(
      { success: false, error: 'Email service not configured' },
      { status: 503 }
    )
  }

  const targets = await db
    .select()
    .from(waitlistApplicant)
    .where(ids ? inArray(waitlistApplicant.id, ids) : eq(waitlistApplicant.status, 'offered'))

  const skipped: RemindAllSummary['skipped'] = []
  const failed: RemindAllSummary['failed'] = []
  let sent = 0

  for (const applicant of targets) {
    const result = await sendWaitlistReminder(applicant)
    if (result.ok) {
      sent += 1
    } else if (result.error === 'not-offered') {
      skipped.push({ id: applicant.id, parentEmail: applicant.parentEmail })
    } else {
      failed.push({ id: applicant.id, parentEmail: applicant.parentEmail })
    }
  }

  const summary: RemindAllSummary = { total: targets.length, sent, skipped, failed }
  return NextResponse.json({ success: true, data: summary })
}
