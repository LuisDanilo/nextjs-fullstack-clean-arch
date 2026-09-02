import '@/app/globals.css'

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import Stack from '@mui/material/Stack'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import { Geist, Geist_Mono } from 'next/font/google'
import { cookies } from 'next/headers'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale,getMessages } from 'next-intl/server'
import { type PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

import { MuiTheme } from '@/app/MuiTheme.client'
import { type ThemePreference } from '@/app/theme'
import { Sidebar } from '@/framework/shared/presentation/Sidebar.client'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default async function RootLayout({ children }: PropsWithChildren) {
  const cookieStore = await cookies()
  const storedTheme = cookieStore.get('theme-mode')?.value
  const initialTheme: ThemePreference =
    storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : 'system'

  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <InitColorSchemeScript defaultMode={initialTheme} />
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppRouterCacheProvider>
            <MuiTheme initialTheme={initialTheme}>
              <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ minHeight: '100vh' }}>
                <Sidebar />
                <Stack direction='column' sx={{ flex: 1, minWidth: 0 }}>{children}</Stack>
                <Toaster richColors position='bottom-center' />
              </Stack>
            </MuiTheme>
          </AppRouterCacheProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
