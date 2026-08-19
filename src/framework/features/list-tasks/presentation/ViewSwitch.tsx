'use client'

import { useState } from 'react'
import { Table2, SquareKanban } from 'lucide-react'

type ViewMode = 'table' | 'kanban'

const viewOptions: Array<{ value: ViewMode; label: string; icon: typeof Table2 }> = [
  { value: 'table', label: 'Tabla', icon: Table2 },
  { value: 'kanban', label: 'Kanban', icon: SquareKanban },
]

export function ViewSwitch() {
  const [view, setView] = useState<ViewMode>('table')

  return (
    <>
      <div role='tablist' aria-label='Cambiar vista' className='hidden lg:flex rounded-md border overflow-hidden'>
        {viewOptions.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type='button'
            role='tab'
            aria-selected={view === value}
            onClick={() => setView(value)}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm transition-colors ${
              view === value ? 'bg-foreground/10 font-medium' : 'hover:bg-foreground/5'
            }`}
          >
            <Icon className='h-4 w-4' />
            {label}
          </button>
        ))}
      </div>

      <nav className='fixed bottom-0 inset-x-0 z-20 flex border-t bg-background lg:hidden'>
        {viewOptions.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            type='button'
            onClick={() => setView(value)}
            className={`flex flex-1 flex-col items-center gap-1 py-3 text-xs transition-colors ${
              view === value ? 'text-blue-500' : 'text-foreground/60'
            }`}
          >
            <Icon className='h-5 w-5' />
            {label}
          </button>
        ))}
      </nav>
    </>
  )
}
