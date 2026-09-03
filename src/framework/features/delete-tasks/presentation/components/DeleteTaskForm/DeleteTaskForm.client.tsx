'use client'

import Button from '@mui/material/Button'
import { useTranslations } from 'next-intl'

import { deleteTask } from '@/framework/features/delete-tasks/presentation/actions/deleteTask.action'
import { showToast } from '@/framework/shared/showToast'
import { useTaskAction } from '@/framework/shared/useTaskAction'

interface DeleteTaskFormProps {
  id: string
}

export function DeleteTaskForm({ id }: DeleteTaskFormProps) {
  const { pending, formRef, formAction } = useTaskAction(deleteTask, showToast)
  const t = useTranslations('tasks.delete')

  return (
    <form
      ref={formRef}
      action={formAction}
      onClick={(event) => event.stopPropagation()}
    >
      <input type='hidden' name='id' value={id} />
      <Button type='submit' variant='contained' color='error' size='small' disabled={pending}>
        {t('button')}
      </Button>
    </form>
  )
}
