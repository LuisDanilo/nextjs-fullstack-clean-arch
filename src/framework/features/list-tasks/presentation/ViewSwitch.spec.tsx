// @vitest-environment jsdom
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { ViewSwitch } from '@/framework/features/list-tasks/presentation/ViewSwitch.client'
import { renderWithTheme as render } from '@/test/renderWithTheme'

describe('ViewSwitch', () => {
  it('renders both view options as buttons', () => {
    render(<ViewSwitch view='table' onChange={() => {}} />)

    const buttons = screen.getAllByRole('button', { name: /Tabla|Kanban/ })
    expect(buttons.length).toBeGreaterThanOrEqual(2)
  })

  it('marks the active view as pressed', () => {
    render(<ViewSwitch view='kanban' onChange={() => {}} />)

    const group = screen.getByRole('group')
    const kanbanBtn = within(group).getByRole('button', { name: /Kanban/ })
    expect(kanbanBtn).toHaveAttribute('aria-pressed', 'true')

    const tableBtn = within(group).getByRole('button', { name: /Tabla/ })
    expect(tableBtn).toHaveAttribute('aria-pressed', 'false')
  })

  it('calls onChange with the selected view', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<ViewSwitch view='table' onChange={onChange} />)

    const group = screen.getByRole('group')
    await user.click(within(group).getByRole('button', { name: /Kanban/ }))

    expect(onChange).toHaveBeenCalledWith('kanban')
  })

  it('renders the mobile navigation buttons', () => {
    render(<ViewSwitch view='table' onChange={() => {}} />)

    expect(screen.getAllByRole('button').length).toBeGreaterThanOrEqual(2)
  })
})
