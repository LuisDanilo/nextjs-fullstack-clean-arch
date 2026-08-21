import { describe, it, expect, vi } from 'vitest'
import { runTaskAction } from '@/framework/shared/runTaskAction'
import { DomainError } from '@/core/shared/domain/DomainError'
import { ApplicationError } from '@/core/shared/application/ApplicationError'

const revalidatePathMock = vi.hoisted(() => vi.fn())

vi.mock('next/cache', () => ({
  revalidatePath: revalidatePathMock,
}))

describe('runTaskAction', () => {
  it('returns ok true and the success message when the action resolves', async () => {
    const result = await runTaskAction(async () => {}, 'Tarea creada')

    expect(result).toEqual({ ok: true, message: 'Tarea creada' })
  })

  it('returns ok false with the user message when a DomainError is thrown', async () => {
    const result = await runTaskAction(async () => {
      throw new DomainError('Task title cannot be empty')
    }, 'Tarea creada')

    expect(result).toEqual({ ok: false, message: 'El título no puede estar vacío' })
  })

  it('returns ok false with the user message when an ApplicationError is thrown', async () => {
    const result = await runTaskAction(async () => {
      throw new ApplicationError('Task not found')
    }, 'Tarea eliminada')

    expect(result).toEqual({ ok: false, message: 'Tarea no encontrada' })
  })

  it('returns a generic message when the error is not mapped', async () => {
    const result = await runTaskAction(async () => {
      throw new Error('boom')
    }, 'Tarea creada')

    expect(result).toEqual({ ok: false, message: 'Ocurrió un error inesperado' })
  })

  it('returns a generic message when a known message has no mapping', async () => {
    const result = await runTaskAction(async () => {
      throw new DomainError('Unexpected domain rule')
    }, 'Tarea creada')

    expect(result).toEqual({ ok: false, message: 'Ocurrió un error inesperado' })
  })

  it('revalidates the given path after resolving', async () => {
    revalidatePathMock.mockClear()
    await runTaskAction(async () => {}, 'Tarea creada', '/')

    expect(revalidatePathMock).toHaveBeenCalledWith('/')
  })

  it('does not revalidate when no path is provided', async () => {
    revalidatePathMock.mockClear()
    await runTaskAction(async () => {}, 'Tarea creada')

    expect(revalidatePathMock).not.toHaveBeenCalled()
  })
})
