import { describe, it, expect } from 'vitest'
import { updateTaskStatus } from '@/core/features/update-task-status/domain/updateTaskStatus.domain'
import { DomainError } from '@/core/shared/domain/DomainError'
import { type TaskEntity } from '@/core/shared/domain/Task.entity'

const task: TaskEntity = {
  id: '1',
  title: 'Test',
  createdAt: new Date(),
  status: 'pending',
  description: 'A valid description here',
  subtasks: []
}

describe('updateTaskStatus', () => {
  it('should change the status of a Task', () => {
    const updated = updateTaskStatus(task, 'in-progress')

    expect(updated).toMatchObject({ ...task, status: 'in-progress' })
  })

  it('should allow transitioning between any statuses', () => {
    expect(updateTaskStatus(task, 'review').status).toBe('review')
    expect(updateTaskStatus(task, 'blocked').status).toBe('blocked')
    expect(updateTaskStatus(task, 'done').status).toBe('done')
  })

  it('should return the Task unchanged when status is the same', () => {
    const updated = updateTaskStatus(task, 'pending')

    expect(updated).toBe(task)
  })

  it('should mark a Task as done when all subtasks are done', () => {
    const taskWithDoneSubtasks: TaskEntity = {
      ...task,
      subtasks: [{
        id: '2',
        title: 'Subtask',
        createdAt: new Date(),
        status: 'done',
        description: 'A valid description here',
        subtasks: []
      }]
    }

    expect(updateTaskStatus(taskWithDoneSubtasks, 'done').status).toBe('done')
  })

  it('should throw DomainError when marking as done with incomplete subtasks', () => {
    const taskWithPendingSubtasks: TaskEntity = {
      ...task,
      subtasks: [{
        id: '2',
        title: 'Subtask',
        createdAt: new Date(),
        status: 'pending',
        description: 'A valid description here',
        subtasks: []
      }]
    }

    expect(() => updateTaskStatus(taskWithPendingSubtasks, 'done')).toThrow(
      new DomainError('Cannot mark Task as done because it has incomplete subtasks')
    )
  })
})
