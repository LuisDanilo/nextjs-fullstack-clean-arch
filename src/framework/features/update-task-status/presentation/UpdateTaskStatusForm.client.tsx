'use client'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import { useTranslations } from 'next-intl'

import { TASK_STATUSES, type TaskStatus } from '@/core/shared/domain/TaskStatus'
import { updateTaskStatus } from '@/framework/features/update-task-status/presentation/updateTaskStatus.action'
import { showToast } from '@/framework/shared/showToast'
import { useTaskAction } from '@/framework/shared/useTaskAction'

interface UpdateTaskStatusFormProps {
  id: string
  status: TaskStatus
}

export function UpdateTaskStatusForm({ id, status }: UpdateTaskStatusFormProps) {
  const { pending, formRef, formAction } = useTaskAction(updateTaskStatus, showToast)
  const t = useTranslations('status')
  const tForm = useTranslations()

  return (
    <form
      ref={formRef}
      action={formAction}
      onClick={(event) => event.stopPropagation()}
    >
      <input type='hidden' name='id' value={id} />
      <FormControl size='small' sx={{ minWidth: 130 }}>
        <InputLabel id={`status-label-${id}`} sx={{ display: 'none' }}>{tForm('common.status')}</InputLabel>
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
              {t(option)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </form>
  )
}
