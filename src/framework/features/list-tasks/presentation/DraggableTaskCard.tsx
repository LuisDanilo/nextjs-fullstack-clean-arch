'use client'

import { useDraggable } from '@dnd-kit/core'
import { TaskCard } from './TaskCard'
import type { TaskDto } from './taskdto'

interface DraggableTaskCardProps {
  task: TaskDto
}

export function DraggableTaskCard({ task }: DraggableTaskCardProps) {
  const { setNodeRef, attributes, listeners, transform, isDragging } = useDraggable({
    id: task.id,
    data: { status: task.status },
  })

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={isDragging ? 'opacity-50' : undefined}
      style={
        transform
          ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` }
          : undefined
      }
    >
      <TaskCard task={task} showStatus={false} />
    </li>
  )
}
