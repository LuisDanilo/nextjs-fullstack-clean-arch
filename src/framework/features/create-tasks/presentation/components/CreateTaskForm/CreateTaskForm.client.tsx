'use client'

import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import { useTranslations } from 'next-intl'

import { createTask } from '@/framework/features/create-tasks/presentation/actions/createTask.action'
import { showToast } from '@/framework/shared/showToast'
import { useTaskAction } from '@/framework/shared/useTaskAction'

interface CreateTaskFormProps {
  onCreated?: () => void
}

export function CreateTaskForm({ onCreated }: CreateTaskFormProps) {
  const t = useTranslations('tasks.create')
  const { pending, formRef, formAction } = useTaskAction(createTask, (state) => {
    showToast(state)
    if (state.ok) onCreated?.()
  })

  return (
    <form ref={formRef} action={formAction}>
      <Stack sx={{ gap: 2 }}>
        <TextField
          id='title'
          name='title'
          label={t('titleField')}
          type='text'
          fullWidth
          size='small'
        />
        <TextField
          id='description'
          name='description'
          label={t('descriptionField')}
          multiline
          rows={3}
          fullWidth
          size='small'
        />
        <Button type='submit' variant='contained' fullWidth disabled={pending}>
          {pending ? t('submitting') : t('submit')}
        </Button>
      </Stack>
    </form>
  )
}
