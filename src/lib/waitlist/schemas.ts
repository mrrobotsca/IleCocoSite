import { z } from 'zod'

export const PreferredLocationEnum = z.enum(['somerled', 'cote-des-neiges', 'either'])
export const CareTypeEnum = z.enum(['full-time', 'part-time'])
export const WaitlistStatusEnum = z.enum([
  'new',
  'contacted',
  'tour-booked',
  'offered',
  'placed',
  'closed',
])
export const LangEnum = z.enum(['en', 'fr'])

export type PreferredLocation = z.infer<typeof PreferredLocationEnum>
export type CareType = z.infer<typeof CareTypeEnum>
export type WaitlistStatus = z.infer<typeof WaitlistStatusEnum>

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Expected YYYY-MM-DD')

// Per-step schemas — used by wizard for client-side step validation
export const WaitlistStep1Schema = z.object({
  childFirstName: z.string().trim().min(1, 'Required').max(120),
  childDob: isoDate.refine((d) => {
    const time = new Date(d).getTime()
    return Number.isFinite(time) && time < Date.now()
  }, 'Date must be in the past'),
})

export const WaitlistStep2Schema = z.object({
  preferredLocation: PreferredLocationEnum,
  desiredStartDate: isoDate,
  careType: CareTypeEnum,
})

export const WaitlistStep3Schema = z.object({
  parentName: z.string().trim().min(1, 'Required').max(160),
  parentEmail: z.string().trim().toLowerCase().email().max(254),
  parentPhone: z.string().trim().min(7, 'Phone too short').max(40),
  heardFrom: z.string().trim().max(240).optional().or(z.literal('')),
  notes: z.string().trim().max(2000).optional().or(z.literal('')),
})

// Full submission schema — what the API expects
export const WaitlistSubmissionSchema = WaitlistStep1Schema.merge(WaitlistStep2Schema)
  .merge(WaitlistStep3Schema)
  .extend({ lang: LangEnum })

export type WaitlistSubmission = z.infer<typeof WaitlistSubmissionSchema>

export const NewsletterSubmissionSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  lang: LangEnum,
  source: z.enum(['newsletter-band', 'cta-band']),
})

export type NewsletterSubmission = z.infer<typeof NewsletterSubmissionSchema>

export const computeAge = (dob: string): { years: number; months: number } => {
  const birth = new Date(dob)
  const now = new Date()
  let years = now.getFullYear() - birth.getFullYear()
  let months = now.getMonth() - birth.getMonth()
  if (now.getDate() < birth.getDate()) months -= 1
  if (months < 0) {
    years -= 1
    months += 12
  }
  return { years: Math.max(0, years), months: Math.max(0, months) }
}
