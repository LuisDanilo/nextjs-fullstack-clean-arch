import type { TaskDto } from './taskdto'
import { getTasks } from './getTasks.action'
import { TaskCard } from './TaskCard'

export async function TaskList() {

  const tasks = await getTasks()

  if(tasks.length === 0) {
    return <div>
      Sin tareas
    </div>
  }
  return <ul className='flex flex-col gap-2'>
    {tasks.map((task: TaskDto) => <TaskCard key={task.id} task={task}/>)}
  </ul>
}
