'use client'

import { useEffect } from 'react'
import { consumeLeadSubmitted, trackLeadEvent } from '@/lib/analytics/google-ads'

/**
 * Fires `generate_lead` on the thank-you page — but only when the waitlist form
 * just submitted successfully in this tab. Visiting, reloading or sharing the
 * thank-you URL fires nothing.
 */
export const LeadConversion = () => {
  useEffect(() => {
    if (consumeLeadSubmitted()) trackLeadEvent('generate_lead', { form: 'waiting_list' })
  }, [])

  return null
}
