'use client'

import { useState } from 'react'
import { CreateTaskButton } from '../../create-tasks/presentation/CreateTaskButton'
import { ViewSwitch, ViewMode } from './ViewSwitch'
import { TaskTable } from './TaskTable'
import { KanbanPanel } from './KanbanPanel'
import type { TaskDto } from './taskdto'

interface TaskViewsProps {
  tasks: TaskDto[]
}

export function TaskViews({ tasks }: TaskViewsProps) {
  const [view, setView] = useState<ViewMode>('table')

  if (tasks.length === 0) {
    return (
      <div className='flex items-center gap-2'>
        <CreateTaskButton />
        <ViewSwitch view={view} onChange={setView} />
        <div>Sin tareas</div>
      </div>
    )
  }

  return (
    <>
      <div className='flex items-center gap-2'>
        <CreateTaskButton />
        <ViewSwitch view={view} onChange={setView} />
      </div>
      {view === 'table' ? <TaskTable tasks={tasks} /> : <KanbanPanel tasks={tasks} />}
    </>
  )
}
