'use client'

import { type ComponentType, useState } from 'react'
import Stack from '@mui/material/Stack'
import { CreateTaskButton } from '@/framework/features/create-tasks/presentation/CreateTaskButton.client'
import { ViewSwitch, type ViewMode } from '@/framework/features/list-tasks/presentation/ViewSwitch.client'
import { TaskTable, type TaskTableProps } from '@/framework/features/list-tasks/presentation/TaskTable.client'
import { KanbanPanel, type KanbanPanelProps } from '@/framework/features/list-tasks/presentation/KanbanPanel.client'
import { type TaskDto } from '@/framework/features/list-tasks/presentation/taskdto'
import IconButton from '@mui/material/IconButton'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useColorScheme } from '@mui/material'
import { setTheme } from '@/app/setTheme.action'

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
  const { mode, setMode } = useColorScheme()

  const toggleTheme = async () => {
    const next = mode === 'dark' ? 'light' : 'dark'
    setMode(next)
    await setTheme(next)
  }

  return (
    <Stack sx={{ flex: 1, minHeight: 0 }} direction="column">
      <Stack direction='row' spacing={1} sx={{ alignItems: 'center', my: { xs: 0, lg: 2 } }}>
        <CreateTaskButton />
        <ViewSwitch view={view} onChange={setView} />
        <IconButton onClick={toggleTheme} aria-label="Cambiar tema" sx={{ marginLeft: 'auto !important'}}>
          {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
      </Stack>
      <TaskView tasks={tasks} />
    </Stack>
  )
}
