'use client'

import { useState } from 'react'
import { UpdateTaskStatusForm } from '@/framework/features/update-task-status/presentation/UpdateTaskStatusForm'
import { TaskDetailDrawer } from '@/framework/features/list-tasks/presentation/TaskDetailDrawer'
import { type TaskDto } from '@/framework/features/list-tasks/presentation/taskdto'

export interface TaskTableProps {
  tasks: Array<TaskDto>
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es')
}

export function TaskTable({ tasks }: TaskTableProps) {
  const [selectedTask, setSelectedTask] = useState<TaskDto | null>(null)

  const closeDrawer = () => setSelectedTask(null)

  return (
    <>
      {tasks.length === 0 && <div>Sin tareas</div>}
      <div role='table' aria-label='Tareas' className='hidden md:block'>
        <div role='row' className='grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto_auto_auto] gap-4 border-b px-4 py-2 text-sm font-medium text-gray-500'>
          <div role='columnheader'>Título</div>
          <div role='columnheader'>Descripción</div>
          <div role='columnheader'>Estado</div>
          <div role='columnheader'>Creada</div>
          <div role='columnheader'>Subtareas</div>
        </div>
        {tasks.map((task) => (
          <div
            key={task.id}
            role='row'
            className='grid grid-cols-[minmax(0,2fr)_minmax(0,3fr)_auto_auto_auto] items-center gap-4 border-b px-4 py-3 transition hover:bg-foreground/5 hover:shadow-lg'
          >
            <div role='cell' className='self-stretch'>
              <button
                type='button'
                onClick={() => setSelectedTask(task)}
                className='h-full w-full cursor-pointer text-left font-medium'
              >
                {task.title}
              </button>
            </div>
            <div role='cell' className='truncate text-sm text-gray-600'>
              {task.description}
            </div>
            <div role='cell'>
              <UpdateTaskStatusForm id={task.id} status={task.status} />
            </div>
            <div role='cell' className='text-sm'>
              {formatDate(task.createdAt)}
            </div>
            <div role='cell' className='text-sm'>
              {task.subtasks.length}
            </div>
          </div>
        ))}
      </div>

      <ul className='flex flex-col gap-2 md:hidden'>
        {tasks.map((task) => (
          <li
          key={task.id}
          onClick={() => setSelectedTask(task)}
          className='flex cursor-pointer flex-col gap-2 rounded-lg border p-4 shadow-sm'
        >
            <button
              type='button'
              onClick={() => setSelectedTask(task)}
              className='cursor-pointer text-left font-medium'
            >
              {task.title}
            </button>
            <span className='truncate text-sm text-gray-600'>{task.description}</span>
            <div className='flex items-center justify-between text-sm text-gray-500'>
              <span>{formatDate(task.createdAt)} · {task.subtasks.length} subtareas</span>
              <UpdateTaskStatusForm id={task.id} status={task.status} />
            </div>
          </li>
        ))}
      </ul>

      <TaskDetailDrawer task={selectedTask} onClose={closeDrawer} />
    </>
  )
}
