'use client'

import { TASK_STATUSES, TASK_STATUS_LABELS } from '@/core/shared/domain/TaskStatus'
import { TaskCard } from './TaskCard'
import type { TaskDto } from './taskdto'

interface KanbanPanelProps {
  tasks: TaskDto[]
}

export function KanbanPanel({ tasks }: KanbanPanelProps) {
  return (
    <div className='flex min-h-0 flex-1 divide-x divide-foreground/10 overflow-x-auto pb-16 lg:pb-0'>
      {TASK_STATUSES.map((status) => {
        const statusTasks = tasks.filter((task) => task.status === status)

        return (
          <section
            key={status}
            className='flex h-full w-80 shrink-0 flex-col px-4 lg:w-auto lg:flex-1'
          >
            <header className='flex items-center justify-between border-b pb-2'>
              <h3 className='font-medium'>{TASK_STATUS_LABELS[status]}</h3>
              <span className='rounded-full bg-foreground/10 px-2 py-0.5 text-xs'>{statusTasks.length}</span>
            </header>
            <ul className='flex flex-1 flex-col gap-2 overflow-y-auto py-2'>
              {statusTasks.length > 0 ? (
                statusTasks.map((task) => (
                  <TaskCard key={task.id} task={task} showStatus={false} />
                ))
              ) : (
                <li className='text-sm text-gray-500'>Sin tareas</li>
              )}
            </ul>
          </section>
        )
      })}
    </div>
  )
}
