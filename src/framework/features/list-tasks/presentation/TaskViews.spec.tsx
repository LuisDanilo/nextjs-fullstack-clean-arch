// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskViews } from '@/framework/features/list-tasks/presentation/TaskViews'
import { makeTasks } from '@/test/taskDtoFixture'

vi.mock('framer-motion')
vi.mock('@dnd-kit/core')
vi.mock('@/framework/features/create-tasks/presentation/createTask.action', () => ({ createTask: vi.fn() }))
vi.mock('@/framework/features/update-task-status/presentation/updateTaskStatus.action', () => ({ updateTaskStatus: vi.fn() }))
vi.mock('@/framework/features/delete-tasks/presentation/deleteTask.action', () => ({ deleteTask: vi.fn() }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

describe('TaskViews', () => {
  it('renders the table view by default', () => {
    render(<TaskViews tasks={makeTasks()} />)

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getAllByText('Comprar leche').length).toBeGreaterThan(0)
  })

  it('switches to the kanban view', async () => {
    const user = userEvent.setup()
    render(<TaskViews tasks={makeTasks()} />)

    await user.click(screen.getByRole('tab', { name: 'Kanban' }))

    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(screen.getAllByText('Pendiente').length).toBeGreaterThan(0)
  })

  it('switches back to the table view', async () => {
    const user = userEvent.setup()
    render(<TaskViews tasks={makeTasks()} />)

    await user.click(screen.getByRole('tab', { name: 'Kanban' }))
    await user.click(screen.getByRole('tab', { name: 'Tabla' }))

    expect(screen.getByRole('table')).toBeInTheDocument()
  })
})
