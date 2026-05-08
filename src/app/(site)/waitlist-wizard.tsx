'use client'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Loader2, X } from 'lucide-react'
import { ZodError, type ZodSchema } from 'zod'
import { cn } from '@/lib/utils/css'
import {
  WaitlistStep1Schema,
  WaitlistStep2Schema,
  WaitlistStep3Schema,
  WaitlistSubmissionSchema,
  computeAge,
  type CareType,
  type PreferredLocation,
  type WaitlistSubmission,
} from '@/lib/waitlist/schemas'
import { useSubmitWaitlist } from '@/lib/waitlist/hooks'
import { COPY } from './copy'
import { useLang } from './lang-context'
import { useWizard } from './wizard-context'
import { Bloom, IleCocoLogo, Sparkle } from './doodles'

const TOTAL_STEPS = 3

type FormState = {
  childFirstName: string
  childDob: string
  preferredLocation: PreferredLocation | ''
  desiredStartDate: string
  careType: CareType | ''
  parentName: string
  parentEmail: string
  parentPhone: string
  heardFrom: string
  notes: string
}

const blank = (): FormState => ({
  childFirstName: '',
  childDob: '',
  preferredLocation: '',
  desiredStartDate: '',
  careType: '',
  parentName: '',
  parentEmail: '',
  parentPhone: '',
  heardFrom: '',
  notes: '',
})

const STEP_SCHEMAS: ZodSchema[] = [WaitlistStep1Schema, WaitlistStep2Schema, WaitlistStep3Schema]

type Errors = Partial<Record<keyof FormState, string>>

export const WaitlistWizard = () => {
  const { lang } = useLang()
  const { isOpen, close } = useWizard()
  const c = COPY.wizard[lang]

  const [step, setStep] = useState(0) // 0..2 = form, 3 = success
  const [form, setForm] = useState<FormState>(blank)
  const [errors, setErrors] = useState<Errors>({})

  const submit = useSubmitWaitlist()

  // Reset on close
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setStep(0)
        setForm(blank())
        setErrors({})
        submit.reset()
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen, submit])

  // Lock body scroll while open
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  // ESC closes
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !submit.isPending) close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close, submit.isPending])

  const setField = <K extends keyof FormState>(key: K, val: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: val }))
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  const validateStep = (idx: number): boolean => {
    const schema = STEP_SCHEMAS[idx]
    if (!schema) return true
    try {
      const slice =
        idx === 0
          ? { childFirstName: form.childFirstName, childDob: form.childDob }
          : idx === 1
            ? {
                preferredLocation: form.preferredLocation,
                desiredStartDate: form.desiredStartDate,
                careType: form.careType,
              }
            : {
                parentName: form.parentName,
                parentEmail: form.parentEmail,
                parentPhone: form.parentPhone,
                heardFrom: form.heardFrom,
                notes: form.notes,
              }
      schema.parse(slice)
      setErrors({})
      return true
    } catch (err) {
      if (err instanceof ZodError) {
        const next: Errors = {}
        for (const issue of err.issues) {
          const key = issue.path[0]
          if (typeof key === 'string') next[key as keyof FormState] = issue.message
        }
        setErrors(next)
      }
      return false
    }
  }

  const handleNext = () => {
    if (!validateStep(step)) return
    setStep((s) => s + 1)
  }

  const handleBack = () => {
    setErrors({})
    setStep((s) => Math.max(0, s - 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(2)) return
    try {
      const payload: WaitlistSubmission = WaitlistSubmissionSchema.parse({ ...form, lang })
      await submit.mutateAsync(payload)
      setStep(TOTAL_STEPS) // success
    } catch (err) {
      if (err instanceof ZodError) {
        const next: Errors = {}
        for (const issue of err.issues) {
          const key = issue.path[0]
          if (typeof key === 'string') next[key as keyof FormState] = issue.message
        }
        setErrors(next)
      }
    }
  }

  if (typeof window === 'undefined') return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key='wizard'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className='fixed inset-0 z-[100] flex items-end justify-center overflow-y-auto bg-charcoal-deep/55 px-4 py-6 backdrop-blur-sm sm:items-center sm:px-6'
          role='dialog'
          aria-modal='true'
          aria-labelledby='wizard-title'
          onClick={() => !submit.isPending && close()}
        >
          <motion.div
            initial={{ y: 40, scale: 0.96, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.97, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 230 }}
            className='relative w-full max-w-[640px] overflow-hidden rounded-[28px] bg-porcelain shadow-[0_30px_80px_rgba(0,0,0,0.35)]'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative band */}
            <div className='relative bg-ash-green px-6 pb-5 pt-7 sm:px-9'>
              <Bloom
                size={36}
                color='var(--color-charcoal-deep)'
                className='animate-wiggle'
                style={{ position: 'absolute', top: 18, right: 22, opacity: 0.55 }}
              />
              <Sparkle
                size={20}
                color='var(--color-sunlit-clay)'
                style={{ position: 'absolute', bottom: 14, left: 24 }}
              />
              <button
                type='button'
                onClick={() => !submit.isPending && close()}
                aria-label={c.cancel}
                disabled={submit.isPending}
                className='absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-porcelain/80 text-charcoal-deep transition-colors hover:bg-porcelain disabled:opacity-50'
              >
                <X size={18} />
              </button>
              <div className='flex items-center gap-3'>
                <IleCocoLogo size={42} />
                <div>
                  <h2
                    id='wizard-title'
                    className='font-display text-[22px] font-bold text-charcoal-deep sm:text-[24px]'
                  >
                    {c.title}
                  </h2>
                  <p className='text-[13px] text-charcoal-deep/75'>{c.subtitle}</p>
                </div>
              </div>

              {step < TOTAL_STEPS && (
                <div className='mt-5'>
                  <ProgressDots step={step} labels={c.stepLabels} />
                  <p className='mt-1.5 font-display text-[12px] font-semibold uppercase tracking-[0.06em] text-charcoal-deep/60'>
                    {c.step(step + 1, TOTAL_STEPS)} · {c.stepLabels[step]}
                  </p>
                </div>
              )}
            </div>

            {/* Body */}
            <div className='px-6 pb-6 pt-7 sm:px-9 sm:pb-8'>
              <AnimatePresence mode='wait' initial={false}>
                {step === 0 && (
                  <StepShell key='s1'>
                    <Field label={c.child.firstName} error={errors.childFirstName}>
                      <input
                        type='text'
                        value={form.childFirstName}
                        onChange={(e) => setField('childFirstName', e.target.value)}
                        placeholder={c.child.firstNamePh}
                        maxLength={120}
                        className={inputCls(!!errors.childFirstName)}
                      />
                    </Field>

                    <Field label={c.child.dob} error={errors.childDob}>
                      <input
                        type='date'
                        value={form.childDob}
                        onChange={(e) => setField('childDob', e.target.value)}
                        max={today()}
                        className={inputCls(!!errors.childDob)}
                      />
                      {form.childDob && !errors.childDob && (
                        <span className='mt-1.5 block font-hand text-[18px] text-ash-green-deep'>
                          {(() => {
                            const { years, months } = computeAge(form.childDob)
                            return c.child.ageHint(years, months)
                          })()}
                        </span>
                      )}
                    </Field>
                  </StepShell>
                )}

                {step === 1 && (
                  <StepShell key='s2'>
                    <Field label={c.preferences.location} error={errors.preferredLocation}>
                      <div className='grid grid-cols-1 gap-2 sm:grid-cols-3'>
                        {(['somerled', 'lachine', 'either'] as const).map((opt) => (
                          <SelectableCard
                            key={opt}
                            selected={form.preferredLocation === opt}
                            onClick={() => setField('preferredLocation', opt)}
                          >
                            {c.preferences.locations[opt]}
                          </SelectableCard>
                        ))}
                      </div>
                    </Field>

                    <Field
                      label={c.preferences.startDate}
                      error={errors.desiredStartDate}
                      hint={c.preferences.startDateHint}
                    >
                      <input
                        type='date'
                        value={form.desiredStartDate}
                        onChange={(e) => setField('desiredStartDate', e.target.value)}
                        min={today()}
                        className={inputCls(!!errors.desiredStartDate)}
                      />
                    </Field>

                    <Field label={c.preferences.careType} error={errors.careType}>
                      <div className='grid grid-cols-2 gap-2'>
                        {(['full-time', 'part-time'] as const).map((opt) => (
                          <SelectableCard
                            key={opt}
                            selected={form.careType === opt}
                            onClick={() => setField('careType', opt)}
                          >
                            {c.preferences.careTypes[opt]}
                          </SelectableCard>
                        ))}
                      </div>
                    </Field>
                  </StepShell>
                )}

                {step === 2 && (
                  <StepShell key='s3'>
                    <Field label={c.contact.parentName} error={errors.parentName}>
                      <input
                        type='text'
                        value={form.parentName}
                        onChange={(e) => setField('parentName', e.target.value)}
                        placeholder={c.contact.parentNamePh}
                        maxLength={160}
                        className={inputCls(!!errors.parentName)}
                      />
                    </Field>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                      <Field label={c.contact.email} error={errors.parentEmail}>
                        <input
                          type='email'
                          value={form.parentEmail}
                          onChange={(e) => setField('parentEmail', e.target.value)}
                          placeholder={c.contact.emailPh}
                          maxLength={254}
                          autoComplete='email'
                          className={inputCls(!!errors.parentEmail)}
                        />
                      </Field>
                      <Field label={c.contact.phone} error={errors.parentPhone}>
                        <input
                          type='tel'
                          value={form.parentPhone}
                          onChange={(e) => setField('parentPhone', e.target.value)}
                          placeholder={c.contact.phonePh}
                          maxLength={40}
                          autoComplete='tel'
                          className={inputCls(!!errors.parentPhone)}
                        />
                      </Field>
                    </div>
                    <Field label={c.contact.heardFrom}>
                      <input
                        type='text'
                        value={form.heardFrom}
                        onChange={(e) => setField('heardFrom', e.target.value)}
                        placeholder={c.contact.heardFromPh}
                        maxLength={240}
                        className={inputCls(false)}
                      />
                    </Field>
                    <Field label={c.contact.notes}>
                      <textarea
                        value={form.notes}
                        onChange={(e) => setField('notes', e.target.value)}
                        placeholder={c.contact.notesPh}
                        rows={3}
                        maxLength={2000}
                        className={cn(inputCls(false), 'resize-none')}
                      />
                    </Field>
                    {submit.isError && (
                      <div className='rounded-2xl border border-red-300 bg-red-50 p-4 text-[14px] text-red-800'>
                        <strong className='block font-display font-semibold'>
                          {c.error.title}
                        </strong>
                        <span className='mt-1 block opacity-80'>{submit.error?.message ?? ''}</span>
                      </div>
                    )}
                  </StepShell>
                )}

                {step === TOTAL_STEPS && (
                  <motion.div
                    key='success'
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className='flex flex-col items-center py-6 text-center'
                  >
                    <span className='grid h-16 w-16 place-items-center rounded-full bg-ash-green text-charcoal-deep'>
                      <Check size={28} strokeWidth={2.5} />
                    </span>
                    <h3 className='mt-5 font-display text-[26px] font-bold text-charcoal-deep'>
                      {c.success.title}
                    </h3>
                    <p className='mt-2 max-w-[420px] text-[15px] text-ink-soft'>{c.success.body}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer actions */}
              {step < TOTAL_STEPS ? (
                <div className='mt-7 flex items-center justify-between gap-3'>
                  <button
                    type='button'
                    onClick={handleBack}
                    disabled={step === 0 || submit.isPending}
                    className='inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 font-display text-[14px] font-semibold text-charcoal-deep transition-colors enabled:hover:bg-charcoal-deep/[0.08] disabled:opacity-30'
                  >
                    <ArrowLeft size={16} /> {c.back}
                  </button>
                  {step < 2 ? (
                    <button
                      type='button'
                      onClick={handleNext}
                      className='inline-flex items-center gap-2.5 rounded-full bg-charcoal-deep px-6 py-3 font-display text-[15px] font-semibold text-porcelain transition-all hover:-translate-y-0.5 hover:bg-black'
                    >
                      {c.next}
                      <span className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-porcelain text-[13px] text-charcoal-deep'>
                        <ArrowRight size={14} />
                      </span>
                    </button>
                  ) : (
                    <button
                      type='button'
                      onClick={handleSubmit}
                      disabled={submit.isPending}
                      className='inline-flex items-center gap-2.5 rounded-full bg-sunlit-clay px-6 py-3 font-display text-[15px] font-semibold text-charcoal-deep transition-all hover:-translate-y-0.5 hover:bg-sunlit-clay-soft disabled:translate-y-0 disabled:opacity-70'
                    >
                      {submit.isPending ? (
                        <>
                          <Loader2 size={16} className='animate-spin' />
                          {c.sending}
                        </>
                      ) : (
                        <>
                          {c.submit}
                          <span className='inline-flex h-7 w-7 items-center justify-center rounded-full bg-charcoal-deep text-[13px] text-porcelain'>
                            <Check size={14} />
                          </span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              ) : (
                <div className='mt-2 text-center'>
                  <button
                    type='button'
                    onClick={close}
                    className='inline-flex items-center gap-2 rounded-full bg-charcoal-deep px-6 py-3 font-display text-[14px] font-semibold text-porcelain hover:bg-black'
                  >
                    {c.success.secondary}
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// =============================================================================
// Sub-components
// =============================================================================

const StepShell = ({ children }: { children: ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, x: 12 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -12 }}
    transition={{ duration: 0.25, ease: 'easeOut' }}
    className='flex flex-col gap-5'
  >
    {children}
  </motion.div>
)

const Field = ({
  label,
  error,
  hint,
  children,
}: {
  label: string
  error?: string
  hint?: string
  children: ReactNode
}) => {
  const id = useMemo(() => `field-${Math.random().toString(36).slice(2, 9)}`, [])
  return (
    <label htmlFor={id} className='block'>
      <span className='mb-1.5 block font-display text-[13px] font-semibold text-charcoal-deep'>
        {label}
      </span>
      <span className='block'>{children}</span>
      {hint && !error && <span className='mt-1 block text-[12px] text-ink-faint'>{hint}</span>}
      {error && <span className='mt-1 block text-[12px] font-medium text-red-700'>{error}</span>}
    </label>
  )
}

const SelectableCard = ({
  selected,
  onClick,
  children,
}: {
  selected: boolean
  onClick: () => void
  children: ReactNode
}) => (
  <button
    type='button'
    onClick={onClick}
    aria-pressed={selected}
    className={cn(
      'rounded-2xl border-2 px-4 py-3 text-left font-display text-[14px] font-semibold transition-all',
      selected
        ? 'border-charcoal-deep bg-charcoal-deep text-porcelain shadow-[0_8px_20px_rgba(58,58,58,0.18)]'
        : 'border-charcoal-deep/12 bg-porcelain text-charcoal-deep hover:border-charcoal-deep/30 hover:bg-porcelain-warm'
    )}
  >
    {children}
  </button>
)

const ProgressDots = ({ step, labels }: { step: number; labels: readonly string[] }) => (
  <div className='flex items-center gap-1.5'>
    {labels.map((_, i) => (
      <span
        key={i}
        className={cn(
          'h-1.5 flex-1 rounded-full transition-colors',
          i < step ? 'bg-charcoal-deep' : i === step ? 'bg-charcoal-deep/70' : 'bg-charcoal-deep/15'
        )}
      />
    ))}
  </div>
)

const inputCls = (hasError: boolean) =>
  cn(
    'w-full rounded-2xl border-2 px-4 py-3 font-display text-[15px] text-charcoal-deep outline-none transition-colors placeholder:text-ink-faint',
    'bg-porcelain focus:border-charcoal-deep',
    hasError
      ? 'border-red-400 bg-red-50/40'
      : 'border-charcoal-deep/12 hover:border-charcoal-deep/25'
  )

const today = () => new Date().toISOString().slice(0, 10)
