'use client'

import { useTaskAction } from '@/framework/shared/useTaskAction'
import { TASK_STATUSES, TASK_STATUS_LABELS, type TaskStatus } from '@/core/shared/domain/TaskStatus'
import { updateTaskStatus } from '@/framework/features/update-task-status/presentation/updateTaskStatus.action'
import { showToast } from '@/framework/shared/showToast'

interface UpdateTaskStatusFormProps {
  id: string
  status: TaskStatus
}

export function UpdateTaskStatusForm({ id, status }: UpdateTaskStatusFormProps) {
  const { pending, formRef, formAction } = useTaskAction(updateTaskStatus, showToast)

  return (
    <form
      ref={formRef}
      action={formAction}
      onClick={(event) => event.stopPropagation()}
      onChange={(event) => {
        if (event.target instanceof HTMLSelectElement) {
          event.currentTarget.requestSubmit()
        }
      }}
    >
      <input type='hidden' name='id' value={id} />
      <label className='sr-only' htmlFor={`status-${id}`}>
        Estado
      </label>
      <select
        key={status}
        id={`status-${id}`}
        name='status'
        defaultValue={status}
        disabled={pending}
        className='rounded-md border border-gray-300 bg-transparent px-2 py-1 text-sm disabled:opacity-50'
      >
        {TASK_STATUSES.map((option) => (
          <option key={option} value={option}>
            {TASK_STATUS_LABELS[option]}
          </option>
        ))}
      </select>
    </form>
  )
}
