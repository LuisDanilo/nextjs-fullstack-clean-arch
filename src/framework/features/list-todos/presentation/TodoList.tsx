import type { TodoDto } from './tododto'
import { getTodos } from './getTodos.action'
import { CompleteTodoForm } from '@/framework/features/complete-todos/presentation/CompleteTodoForm'
import { DeleteTodoForm } from '@/framework/features/delete-todos/presentation/DeleteTodoForm'

export async function TodoList() {

  const todos = await getTodos()

  if(todos.length === 0) {
    return <div>
      Sin Todos
    </div>
  }
  return <ul className='flex flex-col gap-2'>
    {todos.map((todo: TodoDto) => (
        <li key={todo.id} className='flex flex-col gap-2 p-4 border rounded-lg shadow-md'>
          <span className='text-lg font-semibold'>{todo.title}</span>
          <span className='text-sm text-gray-600'>{todo.description}</span>
          <div className='flex gap-2'>
            <CompleteTodoForm id={todo.id} completed={todo.completed} />
            <DeleteTodoForm id={todo.id} />
          </div>
        </li>  
    ))}
  </ul>
}
