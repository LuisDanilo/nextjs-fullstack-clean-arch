export const defaultLocale = 'es'

export const locales = ['es', 'en'] as const

export type Locale = (typeof locales)[number]

export function isLocale(value: string | undefined): value is Locale {
  return value != null && (locales as ReadonlyArray<string>).includes(value)
}

export function detectLocale(acceptLanguage?: string | null): Locale {
  if (!acceptLanguage) return defaultLocale

  const accepted = acceptLanguage
    .split(',')
    .map((part) => part.split(';')[0].trim().toLowerCase())
    .find((lang) => isLocale(lang))

  return accepted ?? defaultLocale
}
