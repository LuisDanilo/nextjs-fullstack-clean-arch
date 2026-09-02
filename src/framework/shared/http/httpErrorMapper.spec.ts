import { describe, expect,it } from 'vitest'

import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { toHttpError } from '@/framework/shared/http/httpErrorMapper'

describe('toHttpError', () => {
  it('maps a DomainError to 400 with its message', () => {
    const error = new DomainError('Task title cannot be empty')

    expect(toHttpError(error)).toEqual({ status: 400, body: { error: 'Task title cannot be empty' } })
  })

  it('maps an ApplicationError containing "not found" to 404', () => {
    const error = new ApplicationError('Task not found')

    expect(toHttpError(error)).toEqual({ status: 404, body: { error: 'Task not found' } })
  })

  it('maps an ApplicationError with a cause to 500', () => {
    const error = new ApplicationError('Error creating Task', { cause: new Error('DB down') })

    expect(toHttpError(error)).toEqual({ status: 500, body: { error: 'Error creating Task' } })
  })

  it('maps an ApplicationError without a cause to 400', () => {
    const error = new ApplicationError('Invalid status')

    expect(toHttpError(error)).toEqual({ status: 400, body: { error: 'Invalid status' } })
  })

  it('maps an unknown error to 500 with a generic message', () => {
    expect(toHttpError(new Error('boom'))).toEqual({ status: 500, body: { error: 'Internal server error' } })
  })
})
