'use client'

import { useActionState, useEffect } from 'react'
import { toast } from 'sonner'
import type { TodoActionResult } from '@/framework/shared/runTodoAction'
import { createTodo } from './createTodo.action'

const initialState: TodoActionResult = { ok: false, message: '' }

export function CreateTodoForm() {
  const [state, formAction, pending] = useActionState(createTodo, initialState)

  useEffect(() => {
    if (!state.message) {
      return 
    }
    
    const t = state.ok  ? toast.success : toast.error

    t(state.message)
  }, [state])

  return (
    <fieldset className='border border-gray-300 p-4 rounded-lg'>
      <legend className='text-lg font-semibold'>Create Todo</legend>
      <form action={formAction} className='space-y-4'>
        <label htmlFor='title' className='block'>
          Title
          <input type='text' name='title' className='w-full p-2 border border-gray-300 rounded-md'/>
        </label>
        <label htmlFor='description' className='block'>
          Description
          <input type='textarea' name='description' className='w-full p-2 border border-gray-300 rounded-md' />
        </label>
        <button type='submit' disabled={pending} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50'>
          {pending ? 'Creating...' : 'Add'}
        </button>
      </form>
    </fieldset>
  )
}
