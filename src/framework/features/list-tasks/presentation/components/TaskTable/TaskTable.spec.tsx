// @vitest-environment jsdom
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { TaskTable } from '@/framework/features/list-tasks/presentation/components/TaskTable'
import { renderWithTheme as render } from '@/test/renderWithTheme'
import { makeTasks } from '@/test/taskDtoFixture'

vi.mock('@/framework/features/update-task-status/presentation/actions/updateTaskStatus.action', () => ({ updateTaskStatus: vi.fn() }))
vi.mock('@/framework/features/delete-tasks/presentation/actions/deleteTask.action', () => ({ deleteTask: vi.fn() }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

describe('TaskTable', () => {
  it('shows an empty message when there are no Tasks', () => {
    render(<TaskTable tasks={[]} />)

    expect(screen.getByText('Sin tareas')).toBeInTheDocument()
  })

  it('renders the Tasks in rows with their data', () => {
    render(<TaskTable tasks={makeTasks()} />)

    expect(screen.getAllByRole('row').length).toBeGreaterThanOrEqual(3)
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
