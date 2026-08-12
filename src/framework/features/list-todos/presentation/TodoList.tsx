import type { TodoDto } from './tododto'
import { getTodos } from './getTodos.action'
import { TodoCard } from './TodoCard'

export async function TodoList() {

  const todos = await getTodos()

  if(todos.length === 0) {
    return <div>
      Sin Todos
    </div>
  }
  return <ul className='flex flex-col gap-2'>
    {todos.map((todo: TodoDto) => <TodoCard key={todo.id} todo={todo}/>)}
  </ul>
}
