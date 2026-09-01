'use client'

import { useTaskAction } from '@/framework/shared/useTaskAction'
import { deleteTask } from '@/framework/features/delete-tasks/presentation/deleteTask.action'
import { showToast } from '@/framework/shared/showToast'
import Button from '@mui/material/Button'

interface DeleteTaskFormProps {
  id: string
}

export function DeleteTaskForm({ id }: DeleteTaskFormProps) {
  const { pending, formRef, formAction } = useTaskAction(deleteTask, showToast)

  return (
    <form
      ref={formRef}
      action={formAction}
      onClick={(event) => event.stopPropagation()}
    >
      <input type='hidden' name='id' value={id} />
      <Button type='submit' variant='contained' color='error' size='small' disabled={pending}>
        Delete
      </Button>
    </form>
  )
}
