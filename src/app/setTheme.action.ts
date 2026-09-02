'use server'

import { cookies } from 'next/headers'

import { type ThemePreference } from '@/app/theme'

export async function setTheme(theme: ThemePreference) {
  const cookieStore = await cookies()

  if (theme === 'system') {
    cookieStore.delete('theme-mode')
    return
  }

  cookieStore.set('theme-mode', theme, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
  })
}
