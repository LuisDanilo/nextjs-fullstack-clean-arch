import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import { cookies } from 'next/headers'
import { Sidebar } from '@/framework/shared/presentation/Sidebar.client'
import { type PropsWithChildren } from 'react'
import Stack from '@mui/material/Stack'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import '@/app/globals.css'
import { MuiTheme } from '@/app/MuiTheme.client'
import { type ThemePreference } from '@/app/theme'

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

  return (
    <html lang='es' suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <InitColorSchemeScript defaultMode={initialTheme} />
      </head>
      <body>
        <AppRouterCacheProvider>
          <MuiTheme initialTheme={initialTheme}>
            <Stack direction={{ xs: 'column', lg: 'row' }} sx={{ minHeight: '100vh' }}>
              <Sidebar />
              <Stack direction='column' sx={{ flex: 1, minWidth: 0 }}> {children} </Stack>
              <Toaster richColors position='bottom-center' />
            </Stack>
          </MuiTheme>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
