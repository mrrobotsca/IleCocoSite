import { NextResponse } from 'next/server'
import { desc, eq, sql } from 'drizzle-orm'
import { db } from '@/database'
import { waitlistApplicant } from '@/database/schema'
import { requireAdmin } from '@/lib/auth/admin'
import { WaitlistStatusEnum, type WaitlistStatus } from '@/lib/waitlist/schemas'

export async function GET(req: Request) {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: gate.status })
  }

  const url = new URL(req.url)
  const statusParam = url.searchParams.get('status') ?? undefined
  const limit = Math.min(Number(url.searchParams.get('limit') ?? 100), 500)

  const parsedStatus = statusParam ? WaitlistStatusEnum.safeParse(statusParam) : null
  const statusFilter: WaitlistStatus | null = parsedStatus?.success ? parsedStatus.data : null

  const whereClause = statusFilter ? eq(waitlistApplicant.status, statusFilter) : undefined

  const rows = await db
    .select()
    .from(waitlistApplicant)
    .where(whereClause)
    .orderBy(desc(waitlistApplicant.createdAt))
    .limit(limit)

  // Counts by status for dashboard chips
  const counts = await db
    .select({ status: waitlistApplicant.status, count: sql<number>`count(*)::int` })
    .from(waitlistApplicant)
    .groupBy(waitlistApplicant.status)

  return NextResponse.json({
    success: true,
    data: rows,
    meta: { total: rows.length, counts },
  })
}
