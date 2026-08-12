'use client'

import { useTodoAction } from '@/framework/shared/useTodoAction'
import { completeTodo } from './updateTodo.action'
import { showToast } from '@/framework/shared/showToast'

interface CompleteTodoFormProps {
  id: string
  completed: boolean
}

export function CompleteTodoForm({ id, completed }: CompleteTodoFormProps) {
  const { pending, formRef, formAction } = useTodoAction(completeTodo, showToast)

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
