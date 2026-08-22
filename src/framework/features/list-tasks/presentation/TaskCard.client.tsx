'use client'

import { type TaskStatus } from '@/core/shared/domain/TaskStatus'
import { DeleteTaskForm } from '@/framework/features/delete-tasks/presentation/DeleteTaskForm.client'
import { UpdateTaskStatusForm } from '@/framework/features/update-task-status/presentation/UpdateTaskStatusForm.client'
import { type TaskDto } from '@/framework/features/list-tasks/presentation/taskdto'

type TaskCardVariant = 'default' | 'kanban'

interface TaskCardProps {
  task: TaskDto
  showStatus?: boolean
  variant?: TaskCardVariant
}

const STATUS_CARD_STYLES: Record<TaskStatus, string> = {
  pending: 'bg-gray-100 dark:bg-gray-800/80 border-gray-200 dark:border-gray-700',
  'in-progress': 'bg-purple-100 dark:bg-purple-900/50 border-purple-200 dark:border-purple-800',
  review: 'bg-amber-100 dark:bg-amber-900/50 border-amber-200 dark:border-amber-800',
  blocked: 'bg-red-100 dark:bg-red-900/50 border-red-200 dark:border-red-800',
  done: 'bg-green-100 dark:bg-green-900/50 border-green-200 dark:border-green-800',
}

export function TaskCard({ task, showStatus = true, variant = 'default' }: TaskCardProps) {
  const kanban = variant === 'kanban'
  const cardStyle = kanban ? STATUS_CARD_STYLES[task.status] : 'bg-background'

  return (
    <div className={`flex flex-col gap-2 p-2 border rounded-lg shadow-md ${cardStyle}`}>
      <span className='text-sm font-semibold'>{task.title}</span>
      {!kanban && (
        <>
          <span className='text-sm text-gray-600'>{task.description}</span>
          <div className='flex gap-2'>
            {showStatus && <UpdateTaskStatusForm id={task.id} status={task.status} />}
            <DeleteTaskForm id={task.id} />
          </div>
        </>
      )}
    </div>
  )
}
