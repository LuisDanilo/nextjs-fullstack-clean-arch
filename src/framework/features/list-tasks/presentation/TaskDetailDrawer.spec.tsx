// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TaskDetailDrawer } from '@/framework/features/list-tasks/presentation/TaskDetailDrawer.client'
import { makeTask, makeTasks } from '@/test/taskDtoFixture'

vi.mock('framer-motion')
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
})
