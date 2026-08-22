// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CreateTaskButton } from '@/framework/features/create-tasks/presentation/CreateTaskButton.client'

vi.mock('framer-motion')
vi.mock('@/framework/features/create-tasks/presentation/createTask.action', () => ({ createTask: vi.fn() }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

describe('CreateTaskButton', () => {
  it('renders a button that opens the dialog', async () => {
    const user = userEvent.setup()
    render(<CreateTaskButton />)

    const button = screen.getByRole('button', { name: /Crear nueva tarea/ })
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes the dialog when the close button is clicked', async () => {
    const user = userEvent.setup()
    render(<CreateTaskButton />)

    await user.click(screen.getByRole('button', { name: /Crear nueva tarea/ }))
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Cerrar' }))

    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    expect(screen.getByRole('button', { name: /Crear nueva tarea/ })).toHaveAttribute('aria-expanded', 'false')
  })
})
