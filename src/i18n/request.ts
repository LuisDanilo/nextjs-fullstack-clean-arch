import { cookies, headers } from 'next/headers'
import { getRequestConfig } from 'next-intl/server'

import { defaultLocale, detectLocale, isLocale } from '@/i18n/routing'

export const LOCALE_COOKIE = 'locale'

export default getRequestConfig(async () => {
  const cookieStore = await cookies()
  const headerStore = await headers()

  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value
  const locale = isLocale(cookieLocale)
    ? cookieLocale
    : detectLocale(headerStore.get('accept-language'))

  return {
    locale,
    defaultLocale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
