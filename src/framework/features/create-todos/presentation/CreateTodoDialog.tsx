'use client'

import { useEffect } from 'react'
import { X } from 'lucide-react'
import { CreateTodoForm } from './CreateTodoForm'

interface CreateTodoDialogProps {
  open: boolean
  onClose: () => void
}

export function CreateTodoDialog({ open, onClose }: CreateTodoDialogProps) {
  useEffect(() => {
    if (!open) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className='fixed inset-0 z-50 flex items-end justify-center lg:items-center lg:p-4'>
      <div
        className='absolute inset-0 bg-black/50'
        onClick={onClose}
        aria-hidden='true'
      />
      <div
        id='create-todo-dialog'
        role='dialog'
        aria-modal='true'
        aria-labelledby='create-todo-title'
        className='relative z-10 flex w-full max-h-[90dvh] flex-col gap-4 rounded-t-2xl bg-background p-6 shadow-lg lg:max-w-md lg:rounded-2xl'
      >
        <div className='mx-auto h-1 w-10 shrink-0 rounded-full bg-foreground/20 lg:hidden'/>
        <div className='flex items-center justify-between'>
          <h2 id='create-todo-title' className='text-lg font-semibold'>
            Nuevo TODO
          </h2>
          <button
            type='button'
            onClick={onClose}
            aria-label='Cerrar'
            className='p-1 rounded-md hover:bg-foreground/5 transition-colors'
          >
            <X className='h-5 w-5' />
          </button>
        </div>
        <CreateTodoForm onCreated={onClose} />
      </div>
    </div>
  )
}
