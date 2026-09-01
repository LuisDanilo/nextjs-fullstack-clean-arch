'use client'

import { useTaskAction } from '@/framework/shared/useTaskAction'
import { TASK_STATUSES, TASK_STATUS_LABELS, type TaskStatus } from '@/core/shared/domain/TaskStatus'
import { updateTaskStatus } from '@/framework/features/update-task-status/presentation/updateTaskStatus.action'
import { showToast } from '@/framework/shared/showToast'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import InputLabel from '@mui/material/InputLabel'

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
    >
      <input type='hidden' name='id' value={id} />
      <FormControl size='small' sx={{ minWidth: 130 }}>
        <InputLabel id={`status-label-${id}`} sx={{ display: 'none' }}>Estado</InputLabel>
        <Select
          key={status}
          labelId={`status-label-${id}`}
          name='status'
          defaultValue={status}
          disabled={pending}
          size='small'
          onClick={(e) => e.stopPropagation()}
        >
          {TASK_STATUSES.map((option) => (
            <MenuItem key={option} value={option}>
              {TASK_STATUS_LABELS[option]}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  )
}
