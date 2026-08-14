import { describe, it, expect } from 'vitest'
import { completeTask } from './completeTask.domain'
import { DomainError } from '@/core/shared/domain/DomainError'

describe('completeTask', () => {
  it('should mark an incomplete Task as completed', () => {
    const task = {
      id: '1',
      title: 'Test',
      createdAt: new Date(),
      completed: false,
      description: 'A valid description here',
      subtasks: []
    }

    const updated = completeTask(task)

    expect(updated).toMatchObject({
      ...task,
      completed: true
    })
  })

  it('should complete a Task when all subtasks are completed', () => {
    const task = {
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

    const updated = completeTask(task)

    expect(updated).toMatchObject({
      ...task,
      completed: true
    })
  })

  it('should throw DomainError when Task is already completed', () => {
    const task = {
      id: '1',
      title: 'Test',
      createdAt: new Date(),
      completed: true,
      description: 'A valid description here',
      subtasks: []
    }

    expect(() => completeTask(task)).toThrow(new DomainError('Task is already marked as completed'))
  })

  it('should throw DomainError when Task has incomplete subtasks', () => {
    const task = {
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

    expect(() => completeTask(task)).toThrow(new DomainError('Cannot mark Task as completed because it has incomplete subtasks'))
  })
})
