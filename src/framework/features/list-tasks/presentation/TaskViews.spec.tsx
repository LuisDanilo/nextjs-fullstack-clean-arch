// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme as render } from '@/test/renderWithTheme'
import { TaskViews } from '@/framework/features/list-tasks/presentation/TaskViews.client'
import { makeTasks } from '@/test/taskDtoFixture'

vi.mock('@dnd-kit/core', () => ({
  DndContext: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  DragOverlay: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  PointerSensor: class {},
  closestCorners: vi.fn(),
  useSensor: () => ({}),
  useSensors: () => ({}),
  useDroppable: () => ({ setNodeRef: vi.fn(), isOver: false }),
  useDraggable: () => ({ setNodeRef: vi.fn(), attributes: {}, listeners: {}, isDragging: false }),
  useDndContext: () => ({ active: null }),
}))
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

    const group = screen.getByRole('group')
    await user.click(within(group).getByRole('button', { name: /Kanban/ }))

    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(screen.getAllByText('Pendiente').length).toBeGreaterThan(0)
  })

  it('switches back to the table view', async () => {
    const user = userEvent.setup()
    render(<TaskViews tasks={makeTasks()} />)

    const group = screen.getByRole('group')
    await user.click(within(group).getByRole('button', { name: /Kanban/ }))
    await user.click(within(group).getByRole('button', { name: /Tabla/ }))

    expect(screen.getByRole('table')).toBeInTheDocument()
  })
})
