import { CreateTodoForm } from '@/framework/features/create-todos/presentation/CreateTodoForm'
import { TodoList } from '@/framework/features/list-todos/presentation/TodoList'

export default function Home() {
  return <main>
    <h1>Mis TODOs</h1>
    <CreateTodoForm />
    <TodoList />
  </main> 
}
