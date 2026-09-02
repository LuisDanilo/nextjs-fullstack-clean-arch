import { describe, expect, it, vi } from 'vitest'

import { createTask } from '@/core/features/create-tasks/domain/createTask.domain'
import { updateTaskStatusUseCase } from '@/core/features/update-task-status/application/updateTaskStatus.useCase'
import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { createMockRepository } from '@/test/mockTaskRepository'

describe('updateTaskStatusUseCase', () => {
  it('should update the status of an existing Task', async () => {
    const task = createTask({ title: 'Test', description: 'A valid description here' })
    const repository = createMockRepository()

    await repository.save(task)

    const useCase = updateTaskStatusUseCase(repository)

    await expect(useCase.execute(task.id, 'in-progress')).resolves.toEqual({ ...task, status: 'in-progress' })
  })

  it('should update the status of a Task with subtasks', async () => {
    const task1 = createTask({ title: 'Test', description: 'A valid description here' })
    const task2 = createTask({ title: 'Subtask', description: 'A valid description here' })
    const repository = createMockRepository()

    task1.subtasks = [task2]

    await repository.save(task2)
    await repository.save(task1)

    const useCase = updateTaskStatusUseCase(repository)

    await expect(useCase.execute(task2.id, 'done')).resolves.toEqual({ ...task2, status: 'done' })
    await expect(useCase.execute(task1.id, 'done')).resolves.toEqual({
      ...task1,
      subtasks: [{ ...task2, status: 'done' }],
      status: 'done'
    })
  })

  it('should throw ApplicationError when status is invalid', async () => {
    const repository = createMockRepository()
    const useCase = updateTaskStatusUseCase(repository)

    await expect(useCase.execute('anyId', 'invalid')).rejects.toThrow(new ApplicationError('Invalid status'))
  })

  it('should throw ApplicationError when Task is not found', async () => {
    const repository = createMockRepository()
    const useCase = updateTaskStatusUseCase(repository)

    await expect(useCase.execute('nonExistentId', 'done')).rejects.toThrow(new ApplicationError('Task not found'))
  })

  it('should throw ApplicationError when save fails', async () => {
    const task = createTask({ title: 'Test', description: 'A valid description here' })
    const repository = createMockRepository({
      getById: vi.fn().mockResolvedValue(task),
      save: vi.fn().mockRejectedValue(new Error('DB down')),
    })

    const useCase = updateTaskStatusUseCase(repository)

    await expect(useCase.execute(task.id, 'done')).rejects.toThrow(new ApplicationError('Error updating Task status'))
  })

  it('should let DomainError propagate when Task has incomplete subtasks', async () => {
    const task1 = createTask({ title: 'Test', description: 'A valid description here' })
    const task2 = createTask({ title: 'Subtask', description: 'A valid description here' })
    const repository = createMockRepository()

    task1.subtasks = [task2]

    await repository.save(task2)
    await repository.save(task1)

    const useCase = updateTaskStatusUseCase(repository)

    await expect(useCase.execute(task1.id, 'done')).rejects.toThrow(
      new DomainError('Cannot mark Task as done because it has incomplete subtasks')
    )
  })
})
