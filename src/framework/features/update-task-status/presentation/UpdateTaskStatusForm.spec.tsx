// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { UpdateTaskStatusForm } from '@/framework/features/update-task-status/presentation/UpdateTaskStatusForm.client'
import { TASK_STATUSES, TASK_STATUS_LABELS } from '@/core/shared/domain/TaskStatus'

const updateTaskStatusMock = vi.hoisted(() => vi.fn())
const toastMock = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))

vi.mock('@/framework/features/update-task-status/presentation/updateTaskStatus.action', () => ({ updateTaskStatus: updateTaskStatusMock }))
vi.mock('sonner', () => ({ toast: toastMock }))

describe('UpdateTaskStatusForm', () => {
  it('renders a select with the current status selected and all the options', () => {
    render(<UpdateTaskStatusForm id='1' status='pending' />)

    const select = screen.getByRole('combobox')
    expect(select).toHaveValue('pending')
    expect(screen.getAllByRole('option')).toHaveLength(TASK_STATUSES.length)
  })

  it('renders the translated label for each option', () => {
    render(<UpdateTaskStatusForm id='1' status='pending' />)

    for (const status of TASK_STATUSES) {
      expect(screen.getByRole('option', { name: TASK_STATUS_LABELS[status] })).toBeInTheDocument()
    }
  })

  it('submits the new status when the selection changes', async () => {
    updateTaskStatusMock.mockResolvedValue({ ok: true, message: 'Estado actualizado' })
    const user = userEvent.setup()
    render(<UpdateTaskStatusForm id='1' status='pending' />)

    await user.selectOptions(screen.getByRole('combobox'), 'done')

    await waitFor(() => expect(updateTaskStatusMock).toHaveBeenCalledTimes(1))
    const formData = updateTaskStatusMock.mock.calls[0][1] as FormData
    expect(formData.get('id')).toBe('1')
    expect(formData.get('status')).toBe('done')
  })
})
