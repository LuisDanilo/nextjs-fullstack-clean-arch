'use client'

import { useTaskAction } from '@/framework/shared/useTaskAction'
import { deleteTask } from './deleteTask.action'
import { showToast } from '@/framework/shared/showToast'

interface DeleteTaskFormProps {
  id: string
}

export function DeleteTaskForm({ id }: DeleteTaskFormProps) {
  const { pending, formRef, formAction } = useTaskAction(deleteTask, showToast)

  return (
    <form ref={formRef} action={formAction}>
      <input type='hidden' name='id' value={id} />
      <button type='submit' disabled={pending} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50'>
        Delete
      </button>
    </form>
  )
}
