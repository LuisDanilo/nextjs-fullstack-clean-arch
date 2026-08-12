'use client'

import { CompleteTodoForm } from '../../complete-todos/presentation/CompleteTodoForm'
import { DeleteTodoForm } from '../../delete-todos/presentation/DeleteTodoForm'
import type { TodoDto } from './tododto'

interface TodoCardProps {
  todo: TodoDto
}

export function TodoCard({ todo }: TodoCardProps) {
  return <li key={todo.id} className='flex flex-col gap-2 p-4 border rounded-lg shadow-md'>
    <span className='text-lg font-semibold'>{todo.title}</span>
    <span className='text-sm text-gray-600'>{todo.description}</span>
    <div className='flex gap-2'>
      <CompleteTodoForm id={todo.id} completed={todo.completed} />
      <DeleteTodoForm id={todo.id} />
    </div>
  </li>  
}
