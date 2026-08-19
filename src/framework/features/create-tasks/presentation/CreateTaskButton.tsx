'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { CreateTaskDialog } from './CreateTaskDialog'

export function CreateTaskButton() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        aria-label='Crear nueva tarea'
        aria-expanded={open}
        aria-controls='create-task-dialog'
        className='fixed bottom-20 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-colors hover:bg-blue-600 lg:static lg:h-auto lg:w-auto lg:rounded-md lg:px-4 lg:py-2 lg:shadow-none'
      >
        <Plus className='h-6 w-6' />
        <span className='hidden lg:inline lg:ml-2'>Nueva tarea</span>
      </button>
      <CreateTaskDialog open={open} onClose={close} />
    </>
  )
}
