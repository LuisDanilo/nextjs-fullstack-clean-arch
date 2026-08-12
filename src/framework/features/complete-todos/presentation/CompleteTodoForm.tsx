'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import { TodoActionResult } from '@/framework/shared/runTodoAction'
import { completeTodo } from './updateTodo.action'

const initialState: TodoActionResult = { ok: false, message: '' }

interface CompleteTodoFormProps {
  id: string
  completed: boolean
}

export function CompleteTodoForm({ id, completed }: CompleteTodoFormProps) {
  const [state, formAction, pending] = useActionState(completeTodo, initialState)

  useEffect(() => {
    if (!state.message) return

    if (state.ok) toast.success(state.message)
    else toast.error(state.message)
  }, [state])

  const isDisabled = completed || pending

  return (
    <form action={formAction}>
      <input type='hidden' name='id' value={id} />
      <button
        type='submit'
        disabled={isDisabled}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {completed ? 'Completada' : 'Completar'}
      </button>
    </form>
  )
}
