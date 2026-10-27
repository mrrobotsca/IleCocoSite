import { NextResponse } from 'next/server'
import { env } from '@/config/env'
import { db } from '@/database'
import { waitlistApplicant } from '@/database/schema'

// Supabase pauses free-plan projects after about a week without database activity,
// and the public pages never touch the database — only waitlist sign-ups and admin
// logins do. Vercel Cron (see vercel.json) calls this once a day so the project
// always has recent activity. When CRON_SECRET is set on the Vercel project, Vercel
// sends it as `Authorization: Bearer <CRON_SECRET>`.
export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  if (!env.CRON_SECRET) {
    console.error('[keep-alive] CRON_SECRET is not set — add it in Vercel env vars')
    return NextResponse.json({ success: false, error: 'Not configured' }, { status: 500 })
  }

  if (req.headers.get('authorization') !== `Bearer ${env.CRON_SECRET}`) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // A real table read, not `select 1`, so it counts as app activity.
    await db.select({ id: waitlistApplicant.id }).from(waitlistApplicant).limit(1)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[keep-alive] database query failed', err)
    return NextResponse.json({ success: false, error: 'Database unreachable' }, { status: 503 })
  }
}
