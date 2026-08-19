'use client'

import { TASK_STATUSES, TASK_STATUS_LABELS } from '@/core/shared/domain/TaskStatus'
import { TaskCard } from './TaskCard'
import type { TaskDto } from './taskdto'

interface KanbanPanelProps {
  tasks: TaskDto[]
}

export function KanbanPanel({ tasks }: KanbanPanelProps) {
  return (
    <div className='flex gap-4 overflow-x-auto pb-4'>
      {TASK_STATUSES.map((status) => {
        const statusTasks = tasks.filter((task) => task.status === status)

        return (
          <section
            key={status}
            className='flex w-80 shrink-0 flex-col gap-2 rounded-lg border bg-foreground/5 p-3 lg:w-auto lg:flex-1'
          >
            <header className='flex items-center justify-between'>
              <h3 className='font-medium'>{TASK_STATUS_LABELS[status]}</h3>
              <span className='rounded-full bg-foreground/10 px-2 py-0.5 text-xs'>{statusTasks.length}</span>
            </header>
            {statusTasks.length > 0 ? (
              <ul className='flex flex-col gap-2'>
                {statusTasks.map((task) => (
                  <TaskCard key={task.id} task={task} showStatus={false} />
                ))}
              </ul>
            ) : (
              <p className='text-sm text-gray-500'>Sin tareas</p>
            )}
          </section>
        )
      })}
    </div>
  )
}
