// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { KanbanPanel } from '@/framework/features/list-tasks/presentation/KanbanPanel.client'
import { makeTasks } from '@/test/taskDtoFixture'
import { TASK_STATUS_LABELS, type TaskStatus } from '@/core/shared/domain/TaskStatus'

vi.mock('framer-motion')
vi.mock('@dnd-kit/core')
vi.mock('@/framework/features/update-task-status/presentation/updateTaskStatus.action', () => ({ updateTaskStatus: vi.fn() }))
vi.mock('@/framework/features/delete-tasks/presentation/deleteTask.action', () => ({ deleteTask: vi.fn() }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

describe('KanbanPanel', () => {
  it('renders a column per status', () => {
    render(<KanbanPanel tasks={makeTasks()} />)

    const statuses: Array<TaskStatus> = ['pending', 'in-progress', 'review', 'blocked', 'done']
    for (const status of statuses) {
      expect(screen.getAllByText(TASK_STATUS_LABELS[status]).length).toBeGreaterThan(0)
    }
  })

  it('renders the Tasks in their columns', () => {
    render(<KanbanPanel tasks={makeTasks()} />)

    expect(screen.getAllByText('Comprar leche').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Revisar PR').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Desplegar').length).toBeGreaterThan(0)
  })

  it('renders the mobile column navigation buttons', () => {
    render(<KanbanPanel tasks={makeTasks()} />)

    expect(screen.getByLabelText('Columna anterior')).toBeInTheDocument()
    expect(screen.getByLabelText('Columna siguiente')).toBeInTheDocument()
    expect(screen.getByLabelText('Ir a Pendiente')).toBeInTheDocument()
  })

  it('opens the detail drawer when a Task is clicked', async () => {
    const user = userEvent.setup()
    render(<KanbanPanel tasks={makeTasks()} />)

    await user.click(screen.getAllByText('Comprar leche')[0])

    expect(screen.getByRole('dialog')).toHaveTextContent('Comprar leche en el supermercado')
  })
})
