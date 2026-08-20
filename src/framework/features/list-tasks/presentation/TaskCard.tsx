'use client'

import { DeleteTaskForm } from '../../delete-tasks/presentation/DeleteTaskForm'
import { UpdateTaskStatusForm } from '../../update-task-status/presentation/UpdateTaskStatusForm'
import type { TaskDto } from './taskdto'

interface TaskCardProps {
  task: TaskDto
  showStatus?: boolean
}

export function TaskCard({ task, showStatus = true }: TaskCardProps) {
  return <div className='flex flex-col gap-2 p-4 border rounded-lg shadow-md'>
    <span className='text-lg font-semibold'>{task.title}</span>
    <span className='text-sm text-gray-600'>{task.description}</span>
    <div className='flex gap-2'>
      {showStatus && <UpdateTaskStatusForm id={task.id} status={task.status} />}
      <DeleteTaskForm id={task.id} />
    </div>
  </div>
}
