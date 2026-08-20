'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { navItems } from '@/framework/shared/presentation/navItems'

export function Sidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const close = () => setOpen(false)

  return (
    <>
      <header className='flex lg:hidden items-center justify-between px-4 border-b bg-background'>
        <span className='font-semibold text-lg'>Clean Task</span>
        <button
          type='button'
          onClick={() => setOpen(true)}
          aria-label='Abrir menú'
          aria-expanded={open}
          aria-controls='app-sidebar'
          className='p-3 hover:bg-foreground/5 transition-colors'
        >
          <Menu className='w-6 h-6' />
        </button>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key='sidebar-backdrop'
            className='fixed inset-0 z-40 bg-black/50 lg:hidden'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            aria-hidden='true'
          />
        )}
      </AnimatePresence>

      <aside
        id='app-sidebar'
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r bg-background transition-transform duration-200 lg:static lg:h-dvh lg:translate-x-0 lg:sticky lg:top-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='flex items-center justify-between px-4 py-4'>
          <span className='font-semibold text-lg'>Clean Task</span>
          <button
            type='button'
            onClick={close}
            aria-label='Cerrar menú'
            className='p-2 hover:bg-foreground/5 rounded-md transition-colors lg:hidden'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        <nav className='flex flex-col gap-1 p-3'>
          {navItems.map(({ label, href, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={close}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active
                    ? 'bg-foreground/10 font-medium'
                    : 'hover:bg-foreground/5'
                }`}
              >
                <Icon className='w-4 h-4' />
                {label}
              </Link>
            )
          })}
        </nav>
      </aside>
    </>
  )
}
