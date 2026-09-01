'use client'

import { useDroppable } from '@dnd-kit/core'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import { TASK_STATUS_LABELS, type TaskStatus } from '@/core/shared/domain/TaskStatus'
import { DraggableTaskCard } from '@/framework/features/list-tasks/presentation/DraggableTaskCard.client'
import { type TaskDto } from '@/framework/features/list-tasks/presentation/taskdto'

interface KanbanColumnProps {
  status: TaskStatus
  tasks: Array<TaskDto>
  canDrag?: boolean
  onSelect?: (task: TaskDto) => void
}

export function KanbanColumn({ status, tasks, canDrag = true, onSelect }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status, disabled: !canDrag })

  return (
    <Stack
      ref={setNodeRef}
      sx={{
        flex: { xs: '0 0 100vw', lg: '1 1 0' },
        minWidth: { xs: '100vw', lg: 0 },
        scrollSnapAlign: 'start',
        px: 2,
        bgcolor: isOver ? 'action.hover' : 'transparent',
        transition: 'background-color 0.2s',
      }}
    >
      <Stack direction='row' sx={{ display: { xs: 'none', lg: 'flex' }, alignItems: 'center', justifyContent: 'space-between', pb: 1, my: 1, borderBottom: 1, borderColor: 'divider' }}>
        <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>{TASK_STATUS_LABELS[status]}</Typography>
        <Chip label={tasks.length} size='small' variant='outlined' />
      </Stack>
      <Stack sx={{ gap: 1, overflowY: 'auto', py: 1 }}>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <DraggableTaskCard key={task.id} task={task} canDrag={canDrag} onSelect={onSelect} />
          ))
        ) : (
          <Typography variant='body2' color='text.secondary'>Sin tareas</Typography>
        )}
      </Stack>
    </Stack>
  )
}
