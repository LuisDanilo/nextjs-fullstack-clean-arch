import { CreateTaskButton } from '@/framework/features/create-tasks/presentation/CreateTaskButton'
import { TaskList } from '@/framework/features/list-tasks/presentation/TaskList'

export default function Home() {
  return <main>
    <h1>Mis tareas</h1>
    <CreateTaskButton />
    <TaskList />
  </main> 
}
