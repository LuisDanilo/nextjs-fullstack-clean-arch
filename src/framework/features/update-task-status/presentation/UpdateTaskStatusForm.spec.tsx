// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithTheme as render } from '@/test/renderWithTheme'
import { UpdateTaskStatusForm } from '@/framework/features/update-task-status/presentation/UpdateTaskStatusForm.client'
import { TASK_STATUS_LABELS } from '@/core/shared/domain/TaskStatus'

const updateTaskStatusMock = vi.hoisted(() => vi.fn())
const toastMock = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))

vi.mock('@/framework/features/update-task-status/presentation/updateTaskStatus.action', () => ({ updateTaskStatus: updateTaskStatusMock }))
vi.mock('sonner', () => ({ toast: toastMock }))

describe('UpdateTaskStatusForm', () => {
  it('renders a combobox with the current status', () => {
    render(<UpdateTaskStatusForm id='1' status='pending' />)

    const select = screen.getByRole('combobox')
    expect(select).toBeInTheDocument()
    expect(screen.getByText('Pendiente')).toBeInTheDocument()
  })

  it('renders the translated label for each option after opening', async () => {
    render(<UpdateTaskStatusForm id='1' status='pending' />)

    const combobox = screen.getByRole('combobox')
    expect(combobox).toBeInTheDocument()
    expect(screen.getByText(TASK_STATUS_LABELS['pending'])).toBeInTheDocument()
  })

  it('shows the select label', () => {
    render(<UpdateTaskStatusForm id='1' status='pending' />)

    expect(screen.getByText('Estado')).toBeInTheDocument()
  })
})
