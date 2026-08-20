'use client'

import { useCallback, useRef, useState } from 'react'
import {
  DndContext,
  PointerSensor,
  closestCorners,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { TASK_STATUSES, TASK_STATUS_LABELS, isTaskStatus } from '@/core/shared/domain/TaskStatus'
import { useTaskAction } from '@/framework/shared/useTaskAction'
import { showToast } from '@/framework/shared/showToast'
import { updateTaskStatus } from '../../update-task-status/presentation/updateTaskStatus.action'
import { KanbanColumn } from './KanbanColumn'
import type { TaskDto } from './taskdto'

interface KanbanPanelProps {
  tasks: TaskDto[]
}

export function KanbanPanel({ tasks }: KanbanPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const boardRef = useRef<HTMLDivElement>(null)
  const { formAction } = useTaskAction(updateTaskStatus, showToast)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { delay: 200, tolerance: 8 } })
  )

  const scrollToColumn = (index: number) => {
    const board = boardRef.current
    const column = board?.children[index] as HTMLElement | undefined
    if (!board || !column) return
    board.scrollTo({ left: column.offsetLeft, behavior: 'smooth' })
  }

  const handleScroll = useCallback(() => {
    const board = boardRef.current
    const firstColumn = board?.firstElementChild as HTMLElement | undefined
    if (!board || !firstColumn) return
    const width = firstColumn.offsetWidth || 1
    const index = Math.max(
      0,
      Math.min(TASK_STATUSES.length - 1, Math.round(board.scrollLeft / width))
    )
    setActiveIndex(index)
  }, [])

  const handleDragEnd = (event: DragEndEvent) => {
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
      <div className='flex items-center justify-between border-b px-4 py-2 lg:hidden'>
        <button
          type='button'
          onClick={() => scrollToColumn(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label='Columna anterior'
          className='rounded-md p-1.5 hover:bg-foreground/5 disabled:opacity-30'
        >
          <ChevronLeft className='h-5 w-5' />
        </button>
        <div className='flex flex-col items-center gap-1'>
          <div className='flex items-center gap-2'>
            <span className='text-sm font-medium'>{TASK_STATUS_LABELS[activeStatus]}</span>
            <span className='rounded-full bg-foreground/10 px-2 py-0.5 text-xs'>{activeCount}</span>
          </div>
          <div className='flex gap-1.5'>
            {TASK_STATUSES.map((status, index) => (
              <button
                key={status}
                type='button'
                onClick={() => scrollToColumn(index)}
                aria-label={`Ir a ${TASK_STATUS_LABELS[status]}`}
                className={`h-2 rounded-full ${
                  index === activeIndex ? 'w-4 bg-foreground' : 'w-2 bg-foreground/30'
                }`}
              />
            ))}
          </div>
        </div>
        <button
          type='button'
          onClick={() => scrollToColumn(activeIndex + 1)}
          disabled={activeIndex === TASK_STATUSES.length - 1}
          aria-label='Columna siguiente'
          className='rounded-md p-1.5 hover:bg-foreground/5 disabled:opacity-30'
        >
          <ChevronRight className='h-5 w-5' />
        </button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
        <div
          ref={boardRef}
          onScroll={handleScroll}
          className='relative flex min-h-0 flex-1 snap-x snap-mandatory divide-x divide-foreground/10 overflow-x-auto pb-16 lg:snap-none lg:pb-0'
        >
          {TASK_STATUSES.map((status) => (
            <KanbanColumn
              key={status}
              status={status}
              tasks={tasks.filter((task) => task.status === status)}
            />
          ))}
        </div>
      </DndContext>
    </>
  )
}
