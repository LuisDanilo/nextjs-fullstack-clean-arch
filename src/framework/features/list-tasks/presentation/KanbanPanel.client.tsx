'use client'

import { useRef, useState } from 'react'
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import useMediaQuery from '@mui/material/useMediaQuery'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { TASK_STATUSES, TASK_STATUS_LABELS, isTaskStatus } from '@/core/shared/domain/TaskStatus'
import { useTaskAction } from '@/framework/shared/useTaskAction'
import { showToast } from '@/framework/shared/showToast'
import { updateTaskStatus } from '@/framework/features/update-task-status/presentation/updateTaskStatus.action'
import { KanbanColumn } from '@/framework/features/list-tasks/presentation/KanbanColumn.client'
import { TaskCard } from '@/framework/features/list-tasks/presentation/TaskCard.client'
import { TaskDetailDrawer } from '@/framework/features/list-tasks/presentation/TaskDetailDrawer.client'
import { type TaskDto } from '@/framework/features/list-tasks/presentation/taskdto'

export interface KanbanPanelProps {
  tasks: Array<TaskDto>
}

export function KanbanPanel({ tasks }: KanbanPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeTask, setActiveTask] = useState<TaskDto | null>(null)
  const [selectedTask, setSelectedTask] = useState<TaskDto | null>(null)
  const boardRef = useRef<HTMLDivElement>(null)
  const { formAction } = useTaskAction(updateTaskStatus, showToast)
  const canDrag = useMediaQuery((theme) => theme.breakpoints.up('lg'))

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 50, tolerance: 4 } })
  )

  const closeDrawer = () => setSelectedTask(null)

  const scrollToColumn = (index: number) => {
    const board = boardRef.current
    const column = board?.children[index] as HTMLElement | undefined
    if (!board || !column) return
    board.scrollTo({ left: column.offsetLeft, behavior: 'smooth' })
  }

  const handleScroll = () => {
    const board = boardRef.current
    const firstColumn = board?.firstElementChild as HTMLElement | undefined
    if (!board || !firstColumn) return
    const width = firstColumn.offsetWidth || 1
    const index = Math.max(0, Math.min(TASK_STATUSES.length - 1, Math.round(board.scrollLeft / width)))
    setActiveIndex(index)
  }

  const handleDragStart = (event: DragStartEvent) => {
    const task = tasks.find((t) => t.id === event.active.id)
    if (task) setActiveTask(task)
  }

  const handleDragCancel = () => {
    setActiveTask(null)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveTask(null)
    const { active, over } = event
    if (!over || !isTaskStatus(over.id)) return
    const task = tasks.find((t) => t.id === active.id)
    if (!task || task.status === over.id) return

    const formData = new FormData()
    formData.set('id', task.id)
    formData.set('status', over.id)
    formAction(formData)
  }

  const activeStatus = TASK_STATUSES[activeIndex]
  const activeCount = tasks.filter((task) => task.status === activeStatus).length

  return (
    <>
      <Stack direction="row" sx={{ 
        display: { xs: 'flex', lg: 'none' }, 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        px: 2, 
        py: 1, 
        borderBottom: 1, 
        borderColor: 'divider' 
      }}>
        <IconButton size='small' onClick={() => scrollToColumn(activeIndex - 1)} disabled={activeIndex === 0} aria-label='Columna anterior'>
          <ChevronLeftIcon />
        </IconButton>
        <Stack sx={{ alignItems: 'center', gap: 0.5 }}>
          <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
            <Typography variant='body2' sx={{ fontWeight: 600 }}>{TASK_STATUS_LABELS[activeStatus]}</Typography>
            <Chip label={activeCount} size='small' />
          </Stack>
          <Stack direction='row' sx={{ gap: 0.75 }}>
            {TASK_STATUSES.map((status, index) => (
              <Box
                key={status}
                component='button'
                onClick={() => scrollToColumn(index)}
                aria-label={`Ir a ${TASK_STATUS_LABELS[status]}`}
                sx={{
                  width: index === activeIndex ? 16 : 8,
                  height: 8,
                  borderRadius: 4,
                  bgcolor: index === activeIndex ? 'text.primary' : 'action.disabled',
                  border: 'none',
                  cursor: 'pointer',
                  p: 0,
                }}
              />
            ))}
          </Stack>
        </Stack>
        <IconButton size='small' onClick={() => scrollToColumn(activeIndex + 1)} disabled={activeIndex === TASK_STATUSES.length - 1} aria-label='Columna siguiente'>
          <ChevronRightIcon />
        </IconButton>
      </Stack>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragStart={handleDragStart} onDragCancel={handleDragCancel} onDragEnd={handleDragEnd}>
        <Stack
          ref={boardRef}
          onScroll={handleScroll}
          direction="row"
          spacing={1}
          sx={{
            flex: 1,
            overflowX: 'auto',
            scrollSnapType: { xs: 'x mandatory', lg: 'none' },
            pb: { xs: 8, lg: 0 },
            '& > * + *': { borderLeft: 1, borderColor: 'divider' },
          }}
        >
          {TASK_STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
              canDrag={canDrag}
              onSelect={setSelectedTask}
            />
          ))}
        </Stack>
        <DragOverlay dropAnimation={null}>
          {activeTask ? <TaskCard task={activeTask} variant='kanban' /> : null}
        </DragOverlay>
      </DndContext>

      <TaskDetailDrawer task={selectedTask} onClose={closeDrawer} />
    </>
  )
}
