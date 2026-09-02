// @vitest-environment jsdom
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { CreateTaskButton } from '@/framework/features/create-tasks/presentation/CreateTaskButton.client'
import { renderWithTheme as render } from '@/test/renderWithTheme'

vi.mock('@/framework/features/create-tasks/presentation/createTask.action', () => ({ createTask: vi.fn() }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

describe('CreateTaskButton', () => {
  it('renders buttons that open the dialog', async () => {
    const user = userEvent.setup()
    render(<CreateTaskButton />)

    const buttons = screen.getAllByRole('button', { name: /Crear nueva tarea/ })
    expect(buttons.length).toBeGreaterThanOrEqual(1)

    const button = buttons[0]
    expect(button).toHaveAttribute('aria-expanded', 'false')

    await user.click(button)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-expanded', 'true')
  })

  it('closes the dialog when the close button is clicked', async () => {
    const user = userEvent.setup()
    render(<CreateTaskButton />)

    const buttons = screen.getAllByRole('button', { name: /Crear nueva tarea/ })
    const button = buttons[0]
    await user.click(button)
    expect(screen.getByRole('dialog')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Cerrar' }))

    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})
