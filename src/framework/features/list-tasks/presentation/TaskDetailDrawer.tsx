'use client'

import { useCallback, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { UpdateTaskStatusForm } from '../../update-task-status/presentation/UpdateTaskStatusForm'
import { DeleteTaskForm } from '../../delete-tasks/presentation/DeleteTaskForm'
import type { TaskDto } from './taskdto'

interface TaskDetailDrawerProps {
  task: TaskDto | null
  onClose: () => void
}

export function TaskDetailDrawer({ task, onClose }: TaskDetailDrawerProps) {
  const [closing, setClosing] = useState(false)

  const handleClose = useCallback(() => {
    setClosing(true)
  }, [])

  useEffect(() => {
    if (!task || closing) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handleClose()
    }

    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [task, closing, handleClose])

  const handleAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget || !closing) return
    setClosing(false)
    onClose()
  }

  if (!task && !closing) return null

  return (
    <div className='fixed inset-0 z-50'>
      <div
        className={`absolute inset-0 bg-black/50 ${closing ? 'animate-fade-out' : 'animate-fade-in'}`}
        onClick={handleClose}
        aria-hidden='true'
      />
      <div
        id='task-detail-drawer'
        role='dialog'
        aria-modal='true'
        aria-labelledby='task-detail-title'
        onAnimationEnd={handleAnimationEnd}
        className={`flex flex-col bg-background shadow-lg lg:absolute lg:inset-y-0 lg:right-0 lg:left-auto lg:w-[80%] lg:max-w-2xl lg:max-h-none lg:rounded-none ${
          closing
            ? 'animate-dialog-slide-down lg:animate-drawer-slide-out'
            : 'animate-dialog-slide-up lg:animate-drawer-slide-in'
        } fixed inset-x-0 bottom-0 z-10 max-h-[90dvh] rounded-t-2xl p-6`}
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
      </div>
    </div>
  )
}
