'use client'

import { useTaskAction } from '@/framework/shared/useTaskAction'
import { createTask } from '@/framework/features/create-tasks/presentation/createTask.action'
import { showToast } from '@/framework/shared/showToast'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

interface CreateTaskFormProps {
  onCreated?: () => void
}

export function CreateTaskForm({ onCreated }: CreateTaskFormProps) {
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
          label='Título'
          type='text'
          fullWidth
          size='small'
        />
        <TextField
          id='description'
          name='description'
          label='Descripción'
          multiline
          rows={3}
          fullWidth
          size='small'
        />
        <Button type='submit' variant='contained' fullWidth disabled={pending}>
          {pending ? 'Creando...' : 'Crear'}
        </Button>
      </Stack>
    </form>
  )
}
