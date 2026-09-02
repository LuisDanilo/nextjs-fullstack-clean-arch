// @vitest-environment jsdom
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { type TaskActionResult } from '@/framework/shared/runTaskAction'
import { useTaskAction } from '@/framework/shared/useTaskAction'

type Action = (prevState: TaskActionResult, formData: FormData) => Promise<TaskActionResult>

function Harness({ action, onResult }: { action: Action; onResult: (state: TaskActionResult) => void }) {
  const { pending, formRef, formAction } = useTaskAction(action, onResult)

  return (
    <form ref={formRef} action={formAction}>
      <input name='field' />
      <button type='submit' disabled={pending}>
        Enviar
      </button>
    </form>
  )
}

describe('useTaskAction', () => {
  it('calls the action with the initial state and the form data', async () => {
    const action = vi.fn().mockResolvedValue({ ok: true, message: 'ok' })
    const onResult = vi.fn()
    const user = userEvent.setup()
    render(<Harness action={action} onResult={onResult} />)

    await user.type(screen.getByRole('textbox'), 'valor')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    await waitFor(() => expect(action).toHaveBeenCalledTimes(1))
    expect(action).toHaveBeenCalledWith({ ok: false, message: '' }, expect.any(FormData))
    const formData = action.mock.calls[0][1] as FormData
    expect(formData.get('field')).toBe('valor')
  })

  it('passes the action result to onResult', async () => {
    const action = vi.fn().mockResolvedValue({ ok: true, message: 'ok' })
    const onResult = vi.fn()
    const user = userEvent.setup()
    render(<Harness action={action} onResult={onResult} />)

    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    await waitFor(() => expect(onResult).toHaveBeenCalledWith({ ok: true, message: 'ok' }))
  })

  it('resets the form after the action resolves', async () => {
    const action = vi.fn().mockResolvedValue({ ok: true, message: 'ok' })
    const user = userEvent.setup()
    render(<Harness action={action} onResult={() => {}} />)

    const input = screen.getByRole('textbox')
    await user.type(input, 'valor')
    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    await waitFor(() => expect(input).toHaveValue(''))
  })

  it('enables the submit button once the action finishes', async () => {
    const action = vi.fn().mockResolvedValue({ ok: true, message: 'ok' })
    const user = userEvent.setup()
    render(<Harness action={action} onResult={() => {}} />)

    await user.click(screen.getByRole('button', { name: 'Enviar' }))

    await waitFor(() => expect(screen.getByRole('button', { name: 'Enviar' })).toBeEnabled())
  })
})
