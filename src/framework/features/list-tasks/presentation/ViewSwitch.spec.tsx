// @vitest-environment jsdom
import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ViewSwitch } from '@/framework/features/list-tasks/presentation/ViewSwitch.client'

describe('ViewSwitch', () => {
  it('renders both view options as tabs', () => {
    render(<ViewSwitch view='table' onChange={() => {}} />)

    expect(screen.getByRole('tab', { name: 'Tabla' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Kanban' })).toBeInTheDocument()
  })

  it('marks the active view as selected', () => {
    render(<ViewSwitch view='kanban' onChange={() => {}} />)

    expect(screen.getByRole('tab', { name: 'Kanban' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Tabla' })).toHaveAttribute('aria-selected', 'false')
  })

  it('calls onChange with the selected view', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ViewSwitch view='table' onChange={onChange} />)

    await user.click(screen.getByRole('tab', { name: 'Kanban' }))

    expect(onChange).toHaveBeenCalledWith('kanban')
  })

  it('renders the mobile navigation buttons', () => {
    render(<ViewSwitch view='table' onChange={() => {}} />)

    expect(screen.getAllByRole('button')).toHaveLength(2)
  })
})
