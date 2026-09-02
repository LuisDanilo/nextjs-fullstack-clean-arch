// @vitest-environment jsdom
import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { KanbanColumn } from '@/framework/features/list-tasks/presentation/KanbanColumn.client'
import { renderWithTheme as render } from '@/test/renderWithTheme'
import { makeTasks } from '@/test/taskDtoFixture'

vi.mock('@dnd-kit/core')
vi.mock('@/framework/features/update-task-status/presentation/updateTaskStatus.action', () => ({ updateTaskStatus: vi.fn() }))
vi.mock('@/framework/features/delete-tasks/presentation/deleteTask.action', () => ({ deleteTask: vi.fn() }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

describe('KanbanColumn', () => {
  it('renders the status label and the Task count', () => {
    const tasks = makeTasks().filter((task) => task.status === 'pending')
    render(<KanbanColumn status='pending' tasks={tasks} />)

    expect(screen.getByText('Pendiente')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('renders the Tasks in the column', () => {
    const tasks = makeTasks().filter((task) => task.status === 'pending')
    render(<KanbanColumn status='pending' tasks={tasks} />)

    expect(screen.getByText('Comprar leche')).toBeInTheDocument()
  })

  it('shows an empty message when there are no Tasks', () => {
    render(<KanbanColumn status='review' tasks={[]} />)

    expect(screen.getByText('Sin tareas')).toBeInTheDocument()
  })
})
