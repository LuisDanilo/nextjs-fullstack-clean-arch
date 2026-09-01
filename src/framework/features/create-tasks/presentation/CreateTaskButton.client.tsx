'use client'

import { useState } from 'react'
import AddIcon from '@mui/icons-material/Add'
import Fab from '@mui/material/Fab'
import Button from '@mui/material/Button'
import { CreateTaskDialog } from '@/framework/features/create-tasks/presentation/CreateTaskDialog.client'

export function CreateTaskButton() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Fab
        color='primary'
        aria-label='Crear nueva tarea'
        aria-expanded={open}
        aria-controls='create-task-dialog'
        onClick={() => setOpen(true)}
        sx={{
          position: { xs: 'fixed', lg: 'static' },
          bottom: { xs: 80, lg: 'auto' },
          right: { xs: 24, lg: 'auto' },
          zIndex: 30,
          display: { xs: 'flex', lg: 'none' },
        }}
      >
        <AddIcon />
      </Fab>

      <Button
        variant='contained'
        startIcon={<AddIcon />}
        onClick={() => setOpen(true)}
        aria-label='Crear nueva tarea'
        sx={{
          display: { xs: 'none', lg: 'flex' },
        }}
      >
        Nueva tarea
      </Button>

      <CreateTaskDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
