"use client"

import { createContext, useContext, useState, useEffect } from 'react'

const TranslationContext = createContext()

export function TranslationProvider({ children }) {
  const [locale, setLocale] = useState('en')
  const [translations, setTranslations] = useState({})

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await fetch(`/locales/${locale}/common.json`)
        const data = await response.json()
        setTranslations(data)
      } catch (error) {
        console.error('Failed to load translations:', error)
      }
    }
    loadTranslations()
  }, [locale])

  const t = (key) => translations[key] || key

  return (
    <TranslationContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </TranslationContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(TranslationContext)
  if (!context) {
    throw new Error('useTranslation must be used within TranslationProvider')
  }
  return context
}