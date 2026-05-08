import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { randomUUID } from 'node:crypto'
import { sql } from 'drizzle-orm'
import { db } from '@/database'
import { newsletterSubscriber } from '@/database/schema'
import { NewsletterSubmissionSchema } from '@/lib/waitlist/schemas'

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  let data
  try {
    data = NewsletterSubmissionSchema.parse(body)
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', issues: err.issues },
        { status: 400 },
      )
    }
    throw err
  }

  try {
    // Idempotent on email — keeps the latest source/lang on re-subscribe.
    await db
      .insert(newsletterSubscriber)
      .values({
        id: randomUUID(),
        email: data.email,
        lang: data.lang,
        source: data.source,
      })
      .onConflictDoUpdate({
        target: newsletterSubscriber.email,
        set: {
          lang: data.lang,
          source: data.source,
          unsubscribedAt: sql`NULL`,
        },
      })

    return NextResponse.json({ success: true }, { status: 201 })
  } catch (err) {
    console.error('[newsletter] insert failed', err)
    return NextResponse.json(
      { success: false, error: 'Could not subscribe. Please try again.' },
      { status: 500 },
    )
  }
}
