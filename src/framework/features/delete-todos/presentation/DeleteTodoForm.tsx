'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { TodoActionResult } from '@/framework/shared/runTodoAction'
import { deleteTodo } from './deleteTodo.action'

const initialState: TodoActionResult = { ok: false, message: '' }

interface DeleteTodoFormProps {
  id: string
}

export function DeleteTodoForm({ id }: DeleteTodoFormProps) {
  const [state, formAction, pending] = useActionState(deleteTodo, initialState)

  useEffect(() => {
    if (!state.message) return

    if (state.ok) toast.success(state.message)
    else toast.error(state.message)
  }, [state])

  return (
    <form action={formAction}>
      <input type='hidden' name='id' value={id} />
      <button type='submit' disabled={pending} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50">
        Delete
      </button>
    </form>
  )
}
