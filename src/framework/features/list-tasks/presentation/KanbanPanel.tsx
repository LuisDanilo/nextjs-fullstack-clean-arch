'use client'

import { TASK_STATUSES, TASK_STATUS_LABELS } from '@/core/shared/domain/TaskStatus'
import { TaskCard } from './TaskCard'
import type { TaskDto } from './taskdto'

interface KanbanPanelProps {
  tasks: TaskDto[]
}

export function KanbanPanel({ tasks }: KanbanPanelProps) {
  return (
    <div className='flex h-[calc(100dvh-10rem)] gap-4 overflow-x-auto pb-4 lg:h-[calc(100dvh-7rem)]'>
      {TASK_STATUSES.map((status) => {
        const statusTasks = tasks.filter((task) => task.status === status)

        return (
          <section
            key={status}
            className='flex h-full w-80 shrink-0 flex-col gap-2 rounded-lg border bg-foreground/5 p-3 lg:w-auto lg:flex-1'
          >
            <header className='flex items-center justify-between'>
              <h3 className='font-medium'>{TASK_STATUS_LABELS[status]}</h3>
              <span className='rounded-full bg-foreground/10 px-2 py-0.5 text-xs'>{statusTasks.length}</span>
            </header>
            <ul className='flex flex-1 flex-col gap-2 overflow-y-auto'>
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
