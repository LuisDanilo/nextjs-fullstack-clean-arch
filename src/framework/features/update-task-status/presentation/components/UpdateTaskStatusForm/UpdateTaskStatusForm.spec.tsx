// @vitest-environment jsdom
import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { UpdateTaskStatusForm } from '@/framework/features/update-task-status/presentation/components/UpdateTaskStatusForm'
import { renderWithTheme as render } from '@/test/renderWithTheme'

const updateTaskStatusMock = vi.hoisted(() => vi.fn())
const toastMock = vi.hoisted(() => ({ success: vi.fn(), error: vi.fn() }))

vi.mock('@/framework/features/update-task-status/presentation/actions/updateTaskStatus.action', () => ({ updateTaskStatus: updateTaskStatusMock }))
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
    expect(screen.getByText('Pendiente')).toBeInTheDocument()
  })

  it('shows the select label', () => {
    render(<UpdateTaskStatusForm id='1' status='pending' />)

    expect(screen.getByText('Estado')).toBeInTheDocument()
  })
})
