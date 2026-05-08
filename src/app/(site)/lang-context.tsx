'use client'

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang } from './copy'

type LangContextValue = {
  lang: Lang
  setLang: (l: Lang) => void
}

const LangContext = createContext<LangContextValue | null>(null)

const STORAGE_KEY = 'ilecoco:lang'

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>('en')

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'en' || stored === 'fr') {
      setLangState(stored)
    } else if (
      typeof navigator !== 'undefined' &&
      navigator.language?.toLowerCase().startsWith('fr')
    ) {
      setLangState('fr')
    }
  }, [])

  const setLang = (l: Lang) => {
    setLangState(l)
    window.localStorage.setItem(STORAGE_KEY, l)
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

export const useLang = () => {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
