// @vitest-environment jsdom
import { screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DeleteTaskForm } from '@/framework/features/delete-tasks/presentation/components/DeleteTaskForm'
import { renderWithTheme as render } from '@/test/renderWithTheme'

const deleteTaskMock = vi.hoisted(() => vi.fn())

vi.mock('@/framework/features/delete-tasks/presentation/actions/deleteTask.action', () => ({ deleteTask: deleteTaskMock }))
vi.mock('sonner', () => ({ toast: { success: vi.fn(), error: vi.fn() } }))

describe('DeleteTaskForm', () => {
  it('renders a hidden input with the Task id', () => {
    render(<DeleteTaskForm id='42' />)

    const hiddenInput = document.querySelector('input[name="id"]')
    expect(hiddenInput).toHaveValue('42')
  })

  it('submits the action with the Task id', async () => {
    deleteTaskMock.mockResolvedValue({ ok: true, message: 'Tarea eliminada' })
    const user = userEvent.setup()
    render(<DeleteTaskForm id='42' />)

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    await waitFor(() => expect(deleteTaskMock).toHaveBeenCalledTimes(1))
    const formData = deleteTaskMock.mock.calls[0][1] as FormData
    expect(formData.get('id')).toBe('42')
  })
})
