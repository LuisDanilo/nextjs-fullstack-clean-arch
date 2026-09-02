// @vitest-environment jsdom
import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TaskCard } from '@/framework/features/list-tasks/presentation/TaskCard.client'
import { renderWithTheme as render } from '@/test/renderWithTheme'
import { makeTask } from '@/test/taskDtoFixture'

vi.mock('@/framework/features/update-task-status/presentation/updateTaskStatus.action', () => ({ updateTaskStatus: vi.fn() }))
vi.mock('@/framework/features/delete-tasks/presentation/deleteTask.action', () => ({ deleteTask: vi.fn() }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

describe('TaskCard', () => {
  it('renders the Task title and description in the default variant', () => {
    render(<TaskCard task={makeTask()} />)

    expect(screen.getByText('Comprar leche')).toBeInTheDocument()
    expect(screen.getByText('Comprar leche en el supermercado')).toBeInTheDocument()
  })

  it('renders the status select and delete button in the default variant', () => {
    render(<TaskCard task={makeTask()} />)

    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })

  it('hides the description and forms in the kanban variant', () => {
    render(<TaskCard task={makeTask()} variant='kanban' />)

    expect(screen.getByText('Comprar leche')).toBeInTheDocument()
    expect(screen.queryByText('Comprar leche en el supermercado')).not.toBeInTheDocument()
    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Delete' })).not.toBeInTheDocument()
  })

  it('hides the status select when showStatus is false', () => {
    render(<TaskCard task={makeTask()} showStatus={false} />)

    expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })
})
