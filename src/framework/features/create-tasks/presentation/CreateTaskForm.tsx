'use client'

import { useTaskAction } from '@/framework/shared/useTaskAction'
import { createTask } from '@/framework/features/create-tasks/presentation/createTask.action'
import { showToast } from '@/framework/shared/showToast'

interface CreateTaskFormProps {
  onCreated?: () => void
}

export function CreateTaskForm({ onCreated }: CreateTaskFormProps) {
  const { pending, formRef, formAction } = useTaskAction(createTask, (state) => {
    showToast(state)
    if (state.ok) onCreated?.()
  })

  return (
    <form ref={formRef} action={formAction} className='space-y-4'>
      <label htmlFor='title' className='block'>
        Título
        <input type='text' name='title' className='w-full p-2 border border-gray-300 rounded-md'/>
      </label>
      <label htmlFor='description' className='block'>
        Descripción
        <input type='textarea' name='description' className='w-full p-2 border border-gray-300 rounded-md' />
      </label>
      <button type='submit' disabled={pending} className='w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50'>
        {pending ? 'Creando...' : 'Crear'}
      </button>
    </form>
  )
}
