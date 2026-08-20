'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { CreateTaskDialog } from './CreateTaskDialog'

export function CreateTaskButton() {
  // State to control the dialog visibility
  const [open, setOpen] = useState(false)

  // Define the styles for the button
  const positionStyles = 'fixed bottom-20 right-6 z-30'
  const flexStyles = 'flex h-14 w-14 items-center justify-center'
  const baseStyles = 'rounded-full bg-blue-500 text-white shadow-lg'
  const hoverStyles = 'transition-colors hover:bg-blue-600'
  const responsiveStyles = 'lg:static lg:h-auto lg:w-auto lg:rounded-md lg:px-4 lg:py-2 lg:shadow-none'

  return (
    <>
      <button
        type='button'
        onClick={() => setOpen(true)}
        aria-label='Crear nueva tarea'
        aria-expanded={open}
        aria-controls='create-task-dialog'
        className={`${positionStyles} ${flexStyles} ${baseStyles} ${hoverStyles} ${responsiveStyles}`}
      >
        <Plus className='h-6 w-6' />
        <span className='hidden lg:inline lg:ml-2'>Nueva tarea</span>
      </button>
      <CreateTaskDialog open={open} onClose={() => setOpen(false)} />
    </>
  )
}
