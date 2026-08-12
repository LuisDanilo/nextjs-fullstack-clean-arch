'use client'

import { useTodoAction } from '@/framework/shared/useTodoAction'
import { createTodo } from './createTodo.action'
import { showToast } from '@/framework/shared/showToast'

export function CreateTodoForm() {
  const { pending, formRef, formAction } = useTodoAction(createTodo, showToast)

  return (
    <fieldset className='border border-gray-300 p-4 rounded-lg'>
      <legend className='text-lg font-semibold'>Create Todo</legend>
      <form ref={formRef} action={formAction} className='space-y-4'>
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
