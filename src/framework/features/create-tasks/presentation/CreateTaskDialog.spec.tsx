// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithTheme as render } from '@/test/renderWithTheme'
import { CreateTaskDialog } from '@/framework/features/create-tasks/presentation/CreateTaskDialog.client'

vi.mock('@/framework/features/create-tasks/presentation/createTask.action', () => ({ createTask: vi.fn() }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

describe('CreateTaskDialog', () => {
  it('renders nothing when closed', () => {
    render(<CreateTaskDialog open={false} onClose={() => {}} />)

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders the dialog with the create form when open', () => {
    render(<CreateTaskDialog open onClose={() => {}} />)

    expect(screen.getByRole('dialog')).toHaveTextContent('Nueva tarea')
    expect(screen.getByLabelText('Título')).toBeInTheDocument()
    expect(screen.getByLabelText('Descripción')).toBeInTheDocument()
  })

  it('calls onClose when Escape is pressed', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<CreateTaskDialog open onClose={onClose} />)

    await user.keyboard('{Escape}')

    expect(onClose).toHaveBeenCalled()
  })

  it('calls onClose when the close button is clicked', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    render(<CreateTaskDialog open onClose={onClose} />)

    await user.click(screen.getByRole('button', { name: 'Cerrar' }))

    expect(onClose).toHaveBeenCalled()
  })
})
