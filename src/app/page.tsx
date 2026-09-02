import Stack from '@mui/material/Stack'

import { getTasks } from '@/framework/features/list-tasks/presentation/getTasks.action'
import { TaskViews } from '@/framework/features/list-tasks/presentation/TaskViews.client'

export default async function Home() {
  const tasks = await getTasks()

  return (
    <Stack direction='column' component='main' sx={{ flex: 1, minHeight: 0 }}>
      <TaskViews tasks={tasks} />
    </Stack>
  )
}
