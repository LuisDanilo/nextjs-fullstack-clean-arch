import { describe, it, expect } from 'vitest'
import { completeTodo } from './completeTodo.domain'
import { DomainError } from '@/core/shared/domain/DomainError'

describe('completeTodo', () => {
  it('should mark an incomplete Todo as completed', () => {
    const todo = {
      id: '1',
      title: 'Test',
      createdAt: new Date(),
      completed: false,
      description: 'A valid description here',
      subtasks: []
    }

    const updated = completeTodo(todo)

    expect(updated).toMatchObject({
      ...todo,
      completed: true
    })
  })

  it('should complete a Todo when all subtasks are completed', () => {
    const todo = {
      id: '1',
      title: 'Test',
      createdAt: new Date(),
      completed: false,
      description: 'A valid description here',
      subtasks: [{
        id: '2',
        title: 'Subtask',
        createdAt: new Date(),
        completed: true,
        description: 'A valid description here',
        subtasks: []
      }]
    }

    const updated = completeTodo(todo)

    expect(updated).toMatchObject({
      ...todo,
      completed: true
    })
  })

  it('should throw DomainError when Todo is already completed', () => {
    const todo = {
      id: '1',
      title: 'Test',
      createdAt: new Date(),
      completed: true,
      description: 'A valid description here',
      subtasks: []
    }

    expect(() => completeTodo(todo)).toThrow(new DomainError('Todo is already marked as completed'))
  })

  it('should throw DomainError when Todo has incomplete subtasks', () => {
    const todo = {
      id: '1',
      title: 'Test',
      createdAt: new Date(),
      completed: false,
      description: 'A valid description here',
      subtasks: [{
        id: '2',
        title: 'Subtask',
        createdAt: new Date(),
        completed: false,
        description: 'A valid description here',
        subtasks: []
      }]
    }

    expect(() => completeTodo(todo)).toThrow(new DomainError('Cannot mark Todo as completed because it has incomplete subtasks'))
  })
})
