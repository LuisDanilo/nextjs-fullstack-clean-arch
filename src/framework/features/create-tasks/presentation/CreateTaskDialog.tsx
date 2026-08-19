'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { X } from 'lucide-react'
import { CreateTaskForm } from './CreateTaskForm'

interface CreateTaskDialogProps {
  open: boolean
  onClose: () => void
}

export function CreateTaskDialog({ open, onClose }: CreateTaskDialogProps) {
  const [closing, setClosing] = useState(false)

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleClose = useCallback(() => {
    if (closeTimerRef.current) return
    setClosing(true)
    closeTimerRef.current = setTimeout(() => {
      closeTimerRef.current = null
      setClosing(false)
      onClose()
    }, 260)
  }, [onClose])

  useEffect(() => {
    if (!open || closing) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, closing, handleClose])

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || !closing) return
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    closeTimerRef.current = null
    setClosing(false)
    onClose()
  }

  if (!open && !closing) return null

  return (
    <div className='fixed inset-0 z-50 flex items-end justify-center lg:items-center lg:p-4'>
      <div
        className={`absolute inset-0 bg-black/50 ${closing ? 'animate-fade-out' : 'animate-fade-in'}`}
        onClick={handleClose}
        aria-hidden='true'
      />
      <div
        id='create-task-dialog'
        role='dialog'
        aria-modal='true'
        aria-labelledby='create-task-title'
        onAnimationEnd={handleAnimationEnd}
        className={`relative z-10 flex w-full max-h-[90dvh] flex-col gap-4 rounded-t-2xl bg-background p-6 shadow-lg lg:max-w-md lg:rounded-2xl ${
          closing
            ? 'animate-dialog-slide-down lg:animate-dialog-scale-out'
            : 'animate-dialog-slide-up lg:animate-dialog-scale-in'
        }`}
      >
        <div className='mx-auto h-1 w-10 shrink-0 rounded-full bg-foreground/20 lg:hidden'/>
        <div className='flex items-center justify-between'>
          <h2 id='create-task-title' className='text-lg font-semibold'>
            Nueva tarea
          </h2>
          <button
            type='button'
            onClick={handleClose}
            aria-label='Cerrar'
            className='p-1 rounded-md hover:bg-foreground/5 transition-colors'
          >
            <X className='h-5 w-5' />
          </button>
        </div>
        <CreateTaskForm onCreated={handleClose} />
      </div>
    </div>
  )
}
