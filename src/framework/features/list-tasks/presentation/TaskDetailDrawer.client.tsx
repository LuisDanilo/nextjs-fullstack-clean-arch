'use client'

import { useCallback, useEffect } from 'react'
import { AnimatePresence, motion, usePresence, type Variants } from 'framer-motion'
import { X } from 'lucide-react'
import { UpdateTaskStatusForm } from '@/framework/features/update-task-status/presentation/UpdateTaskStatusForm.client'
import { DeleteTaskForm } from '@/framework/features/delete-tasks/presentation/DeleteTaskForm.client'
import { useMediaQuery } from '@/framework/shared/presentation/useMediaQuery'
import { type TaskDto } from '@/framework/features/list-tasks/presentation/taskdto'

interface TaskDetailDrawerProps {
  task: TaskDto | null
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
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
  exit: { x: '100%', transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] } },
}

function DrawerOverlay({ task, onClose }: TaskDetailDrawerProps) {
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
      className='fixed inset-0 z-50'
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
        id='task-detail-drawer'
        role='dialog'
        aria-modal='true'
        aria-labelledby='task-detail-title'
        variants={isDesktop ? desktopPanelVariants : mobilePanelVariants}
        initial='hidden'
        animate='visible'
        exit='exit'
        className='flex flex-col bg-background shadow-lg lg:absolute lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[80%] lg:max-w-2xl lg:max-h-none lg:rounded-none fixed inset-x-0 bottom-0 z-10 max-h-[90dvh] rounded-t-2xl p-6'
      >
        <div className='mx-auto h-1 w-10 shrink-0 rounded-full bg-foreground/20 lg:hidden'/>
        <div className='flex items-center justify-between'>
          <h2 id='task-detail-title' className='text-lg font-semibold'>
            {task?.title}
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
        {task && (
          <div className='flex flex-col gap-4 overflow-y-auto'>
            <p className='text-sm text-gray-600'>{task.description}</p>
            <div className='flex flex-wrap items-center gap-2'>
              <UpdateTaskStatusForm id={task.id} status={task.status} />
              <DeleteTaskForm id={task.id} />
            </div>
            <dl className='flex flex-col gap-1 text-sm'>
              <div className='flex justify-between gap-2'>
                <dt className='text-gray-500'>Creada</dt>
                <dd>{new Date(task.createdAt).toLocaleDateString('es')}</dd>
              </div>
              <div className='flex justify-between gap-2'>
                <dt className='text-gray-500'>Subtareas</dt>
                <dd>{task.subtasks.length}</dd>
              </div>
            </dl>
            {task.subtasks.length > 0 && (
              <div>
                <h3 className='mb-2 text-sm font-medium'>Subtareas</h3>
                <ul className='flex flex-col gap-2'>
                  {task.subtasks.map((subtask) => (
                    <li key={subtask.id} className='rounded-md border p-3 text-sm'>
                      <span className='font-medium'>{subtask.title}</span>
                      <p className='text-gray-600'>{subtask.description}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}

export function TaskDetailDrawer({ task, onClose }: TaskDetailDrawerProps) {
  return (
    <AnimatePresence>
      {task && <DrawerOverlay task={task} onClose={onClose} />}
    </AnimatePresence>
  )
}
