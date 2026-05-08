import { NextResponse } from 'next/server'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { db } from '@/database'
import { waitlistApplicant } from '@/database/schema'
import { requireAdmin } from '@/lib/auth/admin'
import { WaitlistStatusEnum } from '@/lib/waitlist/schemas'

const PatchSchema = z.object({
  status: WaitlistStatusEnum.optional(),
  notes: z.string().max(2000).optional(),
})

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
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

  const parsed = PatchSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: 'Validation failed', issues: parsed.error.issues },
      { status: 400 },
    )
  }

  const updates = parsed.data
  if (Object.keys(updates).length === 0) {
    return NextResponse.json({ success: false, error: 'Nothing to update' }, { status: 400 })
  }

  const [row] = await db
    .update(waitlistApplicant)
    .set(updates)
    .where(eq(waitlistApplicant.id, id))
    .returning()

  if (!row) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }

  return NextResponse.json({ success: true, data: row })
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: gate.status })
  }

  const { id } = await ctx.params
  const [row] = await db
    .delete(waitlistApplicant)
    .where(eq(waitlistApplicant.id, id))
    .returning({ id: waitlistApplicant.id })

  if (!row) {
    return NextResponse.json({ success: false, error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json({ success: true })
}
