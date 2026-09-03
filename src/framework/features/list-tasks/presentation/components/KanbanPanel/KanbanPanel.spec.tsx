// @vitest-environment jsdom
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { type TaskStatus } from '@/core/shared/domain/TaskStatus'
import { KanbanPanel } from '@/framework/features/list-tasks/presentation/components/KanbanPanel'
import { renderWithTheme as render } from '@/test/renderWithTheme'
import { makeTasks } from '@/test/taskDtoFixture'

const STATUS_LABELS_ES: Record<TaskStatus, string> = {
  pending: 'Pendiente',
  'in-progress': 'En progreso',
  review: 'En revisión',
  blocked: 'Bloqueada',
  done: 'Hecha',
}

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
vi.mock('@/framework/features/update-task-status/presentation/actions/updateTaskStatus.action', () => ({ updateTaskStatus: vi.fn() }))
vi.mock('@/framework/features/delete-tasks/presentation/actions/deleteTask.action', () => ({ deleteTask: vi.fn() }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

describe('KanbanPanel', () => {
  it('renders a column per status', () => {
    render(<KanbanPanel tasks={makeTasks()} />)

    const statuses: Array<TaskStatus> = ['pending', 'in-progress', 'review', 'blocked', 'done']
    for (const status of statuses) {
      expect(screen.getAllByText(STATUS_LABELS_ES[status]).length).toBeGreaterThan(0)
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
