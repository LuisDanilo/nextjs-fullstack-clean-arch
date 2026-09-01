'use client'

import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { DeleteTaskForm } from '@/framework/features/delete-tasks/presentation/DeleteTaskForm.client'
import { UpdateTaskStatusForm } from '@/framework/features/update-task-status/presentation/UpdateTaskStatusForm.client'
import { type TaskDto } from '@/framework/features/list-tasks/presentation/taskdto'

type TaskCardVariant = 'default' | 'kanban'

interface TaskCardProps {
  task: TaskDto
  showStatus?: boolean
  variant?: TaskCardVariant
}

export function TaskCard({ task, showStatus = true, variant = 'default' }: TaskCardProps) {
  const kanban = variant === 'kanban'

  return (
    <Card
      variant='outlined'
      sx={{
        // bgcolor: kanban ? (theme) => statusColor(theme).bg : 'background.paper',
        boxShadow: kanban ? 1 : 0,
      }}
    >
      <CardContent sx={{ pb: kanban ? 2 : 1, '&:last-child': { pb: kanban ? 2 : 1 } }}>
        <Typography
          variant='body2'
          // sx={{ fontWeight: 600, ...(kanban ? { color: (theme) => statusColor(theme).text } : {}) }}
          sx={{ fontWeight: 600, }}
        >
          {task.title}
        </Typography>
        {!kanban && (
          <>
            <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
              {task.description}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              {showStatus && <UpdateTaskStatusForm id={task.id} status={task.status} />}
              <DeleteTaskForm id={task.id} />
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  )
}
