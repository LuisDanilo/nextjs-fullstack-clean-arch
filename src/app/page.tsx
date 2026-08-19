import { getTasks } from '@/framework/features/list-tasks/presentation/getTasks.action'
import { TaskViews } from '@/framework/features/list-tasks/presentation/TaskViews'

export default async function Home() {
  const tasks = await getTasks()

  return <main>
    <h1>Mis tareas</h1>
    <TaskViews tasks={tasks} />
  </main> 
}
