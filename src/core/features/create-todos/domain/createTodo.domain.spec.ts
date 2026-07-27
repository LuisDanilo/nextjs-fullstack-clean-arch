import { describe, it, expect } from 'vitest'
import { createTodo } from './createTodo.domain'
import { DomainError } from '@/core/shared/domain/DomainError'

describe('createTodo', () => {
  it('should create a Todo with valid data', () => {
    const todo = createTodo({ title: 'Test Todo', description: 'This is a test description' })

    expect(todo).toMatchObject({
      title: 'Test Todo',
      description: 'This is a test description',
      completed: false,
      subtasks: []
    })
    expect(todo.id).toBeDefined()
    expect(todo.createdAt).toBeInstanceOf(Date)
  })

  it('should throw DomainError when title is empty', () => {
    expect(() => createTodo({ title: '', description: 'Valid description' })).toThrow(new DomainError('Todo title cannot be empty'))
  })

  it('should throw DomainError when title is whitespace only', () => {
    expect(() => createTodo({ title: '   ', description: 'Valid description' })).toThrow(new DomainError('Todo title cannot be empty'))
  })

  it('should throw DomainError when description is too short', () => {
    expect(() => createTodo({ title: 'Test', description: 'Short' })).toThrow(new DomainError('Todo description must be at least 10 characters long'))
  })

  it('should throw DomainError when description is empty', () => {
    expect(() => createTodo({ title: 'Test', description: '' })).toThrow(new DomainError('Todo description must be at least 10 characters long'))
  })
})
