'use client'

import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'

type WizardContextValue = {
  isOpen: boolean
  openWaitlist: () => void
  close: () => void
}

const WizardContext = createContext<WizardContextValue | null>(null)

export const WizardProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setOpen] = useState(false)
  const openWaitlist = useCallback(() => setOpen(true), [])
  const close = useCallback(() => setOpen(false), [])
  return (
    <WizardContext.Provider value={{ isOpen, openWaitlist, close }}>{children}</WizardContext.Provider>
  )
}

export const useWizard = () => {
  const ctx = useContext(WizardContext)
  if (!ctx) throw new Error('useWizard must be used inside WizardProvider')
  return ctx
}
