'use client'

import { useTaskAction } from '@/framework/shared/useTaskAction'
import { completeTask } from './updateTask.action'
import { showToast } from '@/framework/shared/showToast'

interface CompleteTaskFormProps {
  id: string
  completed: boolean
}

export function CompleteTaskForm({ id, completed }: CompleteTaskFormProps) {
  const { pending, formRef, formAction } = useTaskAction(completeTask, showToast)

  const isDisabled = completed || pending

  return (
    <form ref={formRef} action={formAction}>
      <input type='hidden' name='id' value={id} />
      <button
        type='submit'
        disabled={isDisabled}
        className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50'
      >
        {completed ? 'Completada' : 'Completar'}
      </button>
    </form>
  )
}
