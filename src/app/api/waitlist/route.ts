import { NextResponse, after } from 'next/server'
import { ZodError } from 'zod'
import { randomUUID } from 'node:crypto'
import { db } from '@/database'
import { waitlistApplicant } from '@/database/schema'
import { WaitlistSubmissionSchema } from '@/lib/waitlist/schemas'
import { sendWaitlistWelcome } from '@/lib/waitlist/send-welcome'

export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ success: false, error: 'Invalid JSON' }, { status: 400 })
  }

  let data
  try {
    data = WaitlistSubmissionSchema.parse(body)
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', issues: err.issues },
        { status: 400 }
      )
    }
    throw err
  }

  try {
    const [row] = await db
      .insert(waitlistApplicant)
      .values({
        id: randomUUID(),
        childFirstName: data.childFirstName,
        childDob: data.childDob,
        preferredLocation: data.preferredLocation,
        desiredStartDate: data.desiredStartDate,
        careType: data.careType,
        parentName: data.parentName,
        parentEmail: data.parentEmail,
        parentPhone: data.parentPhone,
        heardFrom: data.heardFrom || null,
        notes: data.notes || null,
        lang: data.lang,
        status: 'new',
      })
      .returning()

    // Invite them to book a visit straight away. Waiting until a spot opens means
    // competing with every other daycare they applied to that week — a family that
    // has already toured and registered for a start date does not drift away.
    //
    // `after()` runs this once the response has been sent, so the form still
    // returns immediately, and Vercel keeps the function alive to finish it.
    // The application is already saved, so a send failure must never fail signup.
    after(async () => {
      try {
        const result = await sendWaitlistWelcome(row)
        if (!result.ok && result.error === 'send-failed') {
          console.error('[waitlist] welcome email failed to send', { id: row.id })
        }
      } catch (err) {
        console.error('[waitlist] welcome email threw', err)
      }
    })

    return NextResponse.json({ success: true, data: { id: row.id } }, { status: 201 })
  } catch (err) {
    console.error('[waitlist] insert failed', err)
    return NextResponse.json(
      { success: false, error: 'Could not save your application. Please try again.' },
      { status: 500 }
    )
  }
}
