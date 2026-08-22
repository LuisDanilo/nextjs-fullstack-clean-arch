'use client'

import { type ComponentType, useState } from 'react'
import { CreateTaskButton } from '@/framework/features/create-tasks/presentation/CreateTaskButton.client'
import { ViewSwitch, type ViewMode } from '@/framework/features/list-tasks/presentation/ViewSwitch.client'
import { TaskTable, type TaskTableProps } from '@/framework/features/list-tasks/presentation/TaskTable.client'
import { KanbanPanel, type KanbanPanelProps } from '@/framework/features/list-tasks/presentation/KanbanPanel.client'
import { type TaskDto } from '@/framework/features/list-tasks/presentation/taskdto'

interface TaskViewsProps {
  tasks: Array<TaskDto>
}

const TaskViewMap: Record<ViewMode, ComponentType<TaskTableProps | KanbanPanelProps>> = {
  table: TaskTable,
  kanban: KanbanPanel,
}

export function TaskViews({ tasks }: TaskViewsProps) {
  const [view, setView] = useState<ViewMode>('table')
  const TaskView = TaskViewMap[view]

  return (
    <div className='flex min-h-0 flex-1 flex-col'>
      <div className='flex items-center gap-2'>
        <CreateTaskButton />
        <ViewSwitch view={view} onChange={setView} />
      </div>
      <TaskView tasks={tasks} />
    </div>
  )
}
