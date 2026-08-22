'use client'

import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion, usePresence, type Variants } from 'framer-motion'
import { X } from 'lucide-react'
import { useMediaQuery } from '@/framework/shared/presentation/useMediaQuery'
import { CreateTaskForm } from '@/framework/features/create-tasks/presentation/CreateTaskForm.client'

interface CreateTaskDialogProps {
  open: boolean
  onClose: () => void
}

const isDesktopQuery = '(min-width: 1024px)'

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
}

const mobilePanelVariants: Variants = {
  hidden: { y: '100%' },
  visible: { y: 0, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
  exit: { y: '100%', transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
}

const desktopPanelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2, ease: 'easeOut' } },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: 'easeIn' } },
}

interface DialogOverlayProps {
  onClose: () => void
}

function DialogOverlay({ onClose }: DialogOverlayProps) {
  const isDesktop = useMediaQuery(isDesktopQuery)
  const [isPresent, safeToRemove] = usePresence()

  const handleClose = useCallback(() => onClose(), [onClose])

  useEffect(() => {
    if (!isPresent) {
      safeToRemove?.()
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [isPresent, handleClose, safeToRemove])

  return (
    <motion.div
      className='fixed inset-0 z-50 flex items-end justify-center lg:items-center lg:p-4'
      initial='hidden'
      animate='visible'
      exit='exit'
    >
      <motion.div
        className='absolute inset-0 bg-black/50'
        variants={backdropVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        onClick={handleClose}
        aria-hidden='true'
      />
      <motion.div
        id='create-task-dialog'
        role='dialog'
        aria-modal='true'
        aria-labelledby='create-task-title'
        variants={isDesktop ? desktopPanelVariants : mobilePanelVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='relative z-10 flex w-full max-h-[90dvh] flex-col gap-4 rounded-t-2xl bg-background p-6 shadow-lg lg:max-w-md lg:rounded-2xl'
      >
        <div className='mx-auto h-1 w-10 shrink-0 rounded-full bg-foreground/20 lg:hidden' />
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
      </motion.div>
    </motion.div>
  )
}

export function CreateTaskDialog({ open, onClose }: CreateTaskDialogProps) {
  return (
    <AnimatePresence>
      {open && <DialogOverlay key='create-task-dialog' onClose={onClose} />}
    </AnimatePresence>
  )
}
