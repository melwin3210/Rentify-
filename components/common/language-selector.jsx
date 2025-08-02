"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Globe } from "lucide-react"
import { useTranslation } from "@/hooks/use-translation"

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' }
]

export default function LanguageSelector() {
  const { locale, setLocale } = useTranslation()

  const handleLanguageChange = (newLocale) => {
    setLocale(newLocale)
  }

  const currentLanguage = languages.find(lang => lang.code === locale)

  return (
    <Select value={locale} onValueChange={handleLanguageChange}>
      <SelectTrigger className="w-32">
        <div className="flex items-center gap-2">
          <Globe className="h-4 w-4" />
          <SelectValue>
            {currentLanguage?.flag} {currentLanguage?.code.toUpperCase()}
          </SelectValue>
        </div>
      </SelectTrigger>
      <SelectContent>
        {languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span>{language.flag}</span>
              <span>{language.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}