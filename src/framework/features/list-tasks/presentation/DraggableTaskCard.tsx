'use client'

import { useEffect, useRef } from 'react'
import { useDndContext, useDraggable } from '@dnd-kit/core'
import { TaskCard } from '@/framework/features/list-tasks/presentation/TaskCard'
import { type TaskDto } from '@/framework/features/list-tasks/presentation/taskdto'

interface DraggableTaskCardProps {
  task: TaskDto
  canDrag?: boolean
  onSelect?: (task: TaskDto) => void
}

export function DraggableTaskCard({ task, canDrag = true, onSelect }: DraggableTaskCardProps) {
  const { setNodeRef, attributes, listeners, isDragging } = useDraggable({
    id: task.id,
    data: { status: task.status },
    disabled: !canDrag,
  })
  const { active } = useDndContext()
  const suppressClickRef = useRef(false)

  useEffect(() => {
    if (active?.id === task.id) {
      suppressClickRef.current = true
    }
  }, [active, task.id])

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onPointerDownCapture={() => {
        suppressClickRef.current = false
      }}
      onClick={() => {
        if (suppressClickRef.current) {
          suppressClickRef.current = false
          return
        }
        onSelect?.(task)
      }}
      className={isDragging ? 'opacity-40' : undefined}
    >
      <TaskCard task={task} variant='kanban' />
    </li>
  )
}
