import { describe, it, expect } from 'vitest'
import { createTask } from './createTask.domain'
import { DomainError } from '@/core/shared/domain/DomainError'

describe('createTask', () => {
  it('should create a Task with valid data', () => {
    const task = createTask({ title: 'Test Task', description: 'This is a test description' })

    expect(task).toMatchObject({
      title: 'Test Task',
      description: 'This is a test description',
      completed: false,
      subtasks: []
    })
    expect(task.id).toBeDefined()
    expect(task.createdAt).toBeInstanceOf(Date)
  })

  it('should throw DomainError when title is empty', () => {
    expect(() => createTask({ title: '', description: 'Valid description' })).toThrow(new DomainError('Task title cannot be empty'))
  })

  it('should throw DomainError when title is whitespace only', () => {
    expect(() => createTask({ title: '   ', description: 'Valid description' })).toThrow(new DomainError('Task title cannot be empty'))
  })

  it('should throw DomainError when description is too short', () => {
    expect(() => createTask({ title: 'Test', description: 'Short' })).toThrow(new DomainError('Task description must be at least 10 characters long'))
  })

  it('should throw DomainError when description is empty', () => {
    expect(() => createTask({ title: 'Test', description: '' })).toThrow(new DomainError('Task description must be at least 10 characters long'))
  })
})
