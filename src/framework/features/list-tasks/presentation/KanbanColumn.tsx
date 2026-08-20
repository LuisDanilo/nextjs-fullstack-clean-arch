'use client'

import { useDroppable } from '@dnd-kit/core'
import { TASK_STATUS_LABELS } from '@/core/shared/domain/TaskStatus'
import type { TaskStatus } from '@/core/shared/domain/TaskStatus'
import { DraggableTaskCard } from './DraggableTaskCard'
import type { TaskDto } from './taskdto'

interface KanbanColumnProps {
  status: TaskStatus
  tasks: TaskDto[]
  canDrag?: boolean
  onSelect?: (task: TaskDto) => void
}

export function KanbanColumn({ status, tasks, canDrag = true, onSelect }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id: status, disabled: !canDrag })

  return (
    <section
      ref={setNodeRef}
      className={`flex h-full w-full shrink-0 snap-start flex-col px-4 lg:w-auto lg:flex-1 lg:snap-none ${
        isOver ? 'bg-foreground/5' : ''
      }`}
    >
      <header className='hidden lg:flex items-center justify-between border-b pb-2'>
        <h3 className='font-medium'>{TASK_STATUS_LABELS[status]}</h3>
        <span className='rounded-full bg-foreground/10 px-2 py-0.5 text-xs'>{tasks.length}</span>
      </header>
      <ul className='flex flex-1 flex-col gap-2 overflow-y-auto py-2'>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <DraggableTaskCard key={task.id} task={task} canDrag={canDrag} onSelect={onSelect} />
          ))
        ) : (
          <li className='text-sm text-gray-500'>Sin tareas</li>
        )}
      </ul>
    </section>
  )
}
