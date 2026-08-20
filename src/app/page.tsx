import { getTasks } from '@/framework/features/list-tasks/presentation/getTasks.action'
import { TaskViews } from '@/framework/features/list-tasks/presentation/TaskViews'

export default async function Home() {
  const tasks = await getTasks()

  return <main className='flex min-h-0 flex-1 flex-col'>
    <TaskViews tasks={tasks} />
  </main> 
}
