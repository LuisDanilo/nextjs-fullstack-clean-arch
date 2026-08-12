'use client'

import type { TodoActionResult } from '@/framework/shared/runTodoAction'
import { useTodoAction } from '@/framework/shared/useTodoAction'
import { deleteTodo } from './deleteTodo.action'
import { showToast } from '@/framework/shared/showToast'

interface DeleteTodoFormProps {
  id: string
}

export function DeleteTodoForm({ id }: DeleteTodoFormProps) {
  const { pending, formRef, formAction } = useTodoAction(deleteTodo, showToast)

  return (
    <form ref={formRef} action={formAction}>
      <input type='hidden' name='id' value={id} />
      <button type='submit' disabled={pending} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50'>
        Delete
      </button>
    </form>
  )
}
