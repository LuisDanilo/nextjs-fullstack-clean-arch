'use client'

import AddIcon from '@mui/icons-material/Add'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { CreateTaskDialog } from '@/framework/features/create-tasks/presentation/CreateTaskDialog.client'

export function CreateTaskButton() {
  const [open, setOpen] = useState(false)
  const t = useTranslations('tasks.create')

  return (
    <>
      <Fab
        color='primary'
        aria-label={t('ariaLabel')}
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
        aria-label={t('ariaLabel')}
        sx={{
          display: { xs: 'none', lg: 'flex' },
        }}
      >
        {t('button')}
      </Button>

      <CreateTaskDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
