import type { TodoDto } from './tododto'
import { getTodos } from './getTodos.action'
import { DeleteTodoButton } from '@/framework/features/delete-todos/presentation/DeleteTodoButton'
import { CheckTodoInput } from '@/framework/features/complete-todos/presentation/CheckTodoInput'
import { completeTodo } from '@/framework/features/complete-todos/presentation/updateTodo.action'
import { deleteTodo } from '@/framework/features/delete-todos/presentation/deleteTodo.action'

export async function TodoList() {

  const todos = await getTodos()

  return <ul>
    {todos.map((todo: TodoDto) => (
        <li key={todo.id} className='flex gap-2 flex-row'>
        <form action={completeTodo}>
          <input type='hidden' name='id' value={todo.id} />
          <CheckTodoInput checked={todo.completed}/> 
        </form>
          <span className=''>{todo.title}</span>
          <form action={deleteTodo}>
            <input type='hidden' name='id' value={todo.id} />
            <DeleteTodoButton />
          </form>
        </li> 
    ))}
  </ul>
}