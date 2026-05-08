import { NextResponse } from 'next/server'
import { desc, sql } from 'drizzle-orm'
import { db } from '@/database'
import { newsletterSubscriber } from '@/database/schema'
import { requireAdmin } from '@/lib/auth/admin'

export async function GET(req: Request) {
  const gate = await requireAdmin()
  if (!gate.ok) {
    return NextResponse.json({ success: false, error: 'Forbidden' }, { status: gate.status })
  }

  const url = new URL(req.url)
  const limit = Math.min(Number(url.searchParams.get('limit') ?? 200), 1000)

  const rows = await db
    .select()
    .from(newsletterSubscriber)
    .orderBy(desc(newsletterSubscriber.createdAt))
    .limit(limit)

  const [{ total }] = await db
    .select({ total: sql<number>`count(*)::int` })
    .from(newsletterSubscriber)

  return NextResponse.json({ success: true, data: rows, meta: { total } })
}
