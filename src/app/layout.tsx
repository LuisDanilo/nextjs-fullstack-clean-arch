import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import { Sidebar } from '@/framework/shared/presentation/Sidebar'
import '@/app/globals.css'
import { type PropsWithChildren } from 'react'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

type RootLayoutProps = PropsWithChildren

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
  return (
    <html
      lang='es'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className='min-h-full flex flex-col lg:flex-row' suppressHydrationWarning>
        <Sidebar />
        <div className='flex min-w-0 flex-1 flex-col'>{children}</div>
        <Toaster richColors position='bottom-center' />
      </body>
    </html>
  )
}
