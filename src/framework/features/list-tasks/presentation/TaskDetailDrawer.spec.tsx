// @vitest-environment jsdom
import { screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { TaskDetailDrawer } from '@/framework/features/list-tasks/presentation/TaskDetailDrawer.client'
import { renderWithTheme as render } from '@/test/renderWithTheme'
import { makeTask, makeTasks } from '@/test/taskDtoFixture'

vi.mock('@/framework/features/update-task-status/presentation/updateTaskStatus.action', () => ({ updateTaskStatus: vi.fn() }))
vi.mock('@/framework/features/delete-tasks/presentation/deleteTask.action', () => ({ deleteTask: vi.fn() }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

describe('TaskDetailDrawer', () => {
  it('renders nothing when there is no Task', () => {
    render(<TaskDetailDrawer task={null} onClose={() => {}} />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the Task title, description and subtasks', () => {
    const task = makeTasks()[2]
    render(<TaskDetailDrawer task={task} onClose={() => {}} />)

    expect(screen.getByRole('dialog')).toHaveTextContent('Desplegar')
    expect(screen.getByText('Desplegar la aplicación a producción')).toBeInTheDocument()
    expect(screen.getByText('Subtarea')).toBeInTheDocument()
  })

  it('renders the creation date label', () => {
    const task = makeTask({ createdAt: '2026-01-15T00:00:00.000Z' })
    render(<TaskDetailDrawer task={task} onClose={() => {}} />)

    expect(screen.getByRole('dialog')).toHaveTextContent('Creada')
    expect(screen.getByRole('dialog')).toHaveTextContent(
      new Date(task.createdAt).toLocaleDateString('es')
    )
  })

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<TaskDetailDrawer task={makeTask()} onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'Cerrar' }))

    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<TaskDetailDrawer task={makeTask()} onClose={onClose} />)

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalled()
  })

  it('keeps the task content visible until the exit transition finishes', async () => {
    const firstTask = makeTask({ title: 'Primera tarea' })
    const secondTask = makeTask({ title: 'Segunda tarea' })
    const { rerender } = render(<TaskDetailDrawer task={firstTask} onClose={() => {}} />)

    rerender(<TaskDetailDrawer task={null} onClose={() => {}} />)

    expect(screen.getByText('Primera tarea')).toBeInTheDocument()

    await waitForElementToBeRemoved(() => screen.queryByRole('dialog'))

    rerender(<TaskDetailDrawer task={secondTask} onClose={() => {}} />)

    expect(screen.getByText('Segunda tarea')).toBeInTheDocument()
    expect(screen.queryByText('Primera tarea')).not.toBeInTheDocument()
  })
})
