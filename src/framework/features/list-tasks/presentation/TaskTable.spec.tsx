// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskTable } from '@/framework/features/list-tasks/presentation/TaskTable'
import { makeTasks } from '@/test/taskDtoFixture'

vi.mock('framer-motion')
vi.mock('@/framework/features/update-task-status/presentation/updateTaskStatus.action', () => ({ updateTaskStatus: vi.fn() }))
vi.mock('@/framework/features/delete-tasks/presentation/deleteTask.action', () => ({ deleteTask: vi.fn() }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

describe('TaskTable', () => {
  it('shows an empty message when there are no Tasks', () => {
    render(<TaskTable tasks={[]} />)

    expect(screen.getByText('Sin tareas')).toBeInTheDocument()
  })

  it('renders the Tasks in rows with their data', () => {
    render(<TaskTable tasks={makeTasks()} />)

    expect(screen.getAllByRole('row')).toHaveLength(4)
    expect(screen.getAllByText('Comprar leche').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Revisar PR').length).toBeGreaterThan(0)
  })

  it('shows the subtask count for each Task', () => {
    render(<TaskTable tasks={makeTasks()} />)

    expect(screen.getAllByText('1').length).toBeGreaterThan(0)
  })

  it('opens the detail drawer when a Task title is clicked', async () => {
    const user = userEvent.setup()
    render(<TaskTable tasks={makeTasks()} />)

    await user.click(screen.getAllByText('Comprar leche')[0])

    expect(screen.getByRole('dialog')).toHaveTextContent('Comprar leche en el supermercado')
  })
})
