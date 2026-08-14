import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import { Sidebar } from '@/framework/shared/presentation/Sidebar'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang='es'
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col lg:flex-row'>
        <Sidebar />
        <div className='flex-1 min-w-0'>{children}</div>
        <Toaster richColors position='bottom-center' />
      </body>
    </html>
  )
}
