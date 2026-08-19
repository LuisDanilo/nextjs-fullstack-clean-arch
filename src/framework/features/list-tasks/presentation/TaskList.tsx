import type { TaskDto } from './taskdto'
import { TaskCard } from './TaskCard'

interface TaskListProps {
  tasks: TaskDto[]
}

export function TaskList({ tasks }: TaskListProps) {
  return <ul className='flex flex-col gap-2'>
    {tasks.map((task: TaskDto) => <TaskCard key={task.id} task={task}/>)}
  </ul>
}
