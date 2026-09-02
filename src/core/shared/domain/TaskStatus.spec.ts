import { describe, expect,it } from 'vitest'

import { isTaskStatus, TASK_STATUSES } from '@/core/shared/domain/TaskStatus'

describe('isTaskStatus', () => {
  it('returns true for every valid status', () => {
    for (const status of TASK_STATUSES) {
      expect(isTaskStatus(status)).toBe(true)
    }
  })

  it('returns false for an invalid status', () => {
    expect(isTaskStatus('invalid')).toBe(false)
  })

  it('returns false for an empty string', () => {
    expect(isTaskStatus('')).toBe(false)
  })

  it('returns false for non-string values', () => {
    expect(isTaskStatus(undefined)).toBe(false)
    expect(isTaskStatus(null)).toBe(false)
    expect(isTaskStatus(42)).toBe(false)
    expect(isTaskStatus({})).toBe(false)
  })
})
