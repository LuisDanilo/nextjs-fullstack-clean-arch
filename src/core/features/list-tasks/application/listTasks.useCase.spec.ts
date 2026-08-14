import { describe, it, expect, vi } from 'vitest'
import { listTasksUseCase } from './listTasks.useCase'
import { TaskEntity } from '@/core/shared/domain/Task.entity'
import { createMockRepository } from '@/test/mockTaskRepository'
import { InfrastructureError } from '@/core/shared/infrastructure/InfrastructureError'
import { ApplicationError } from '@/core/shared/application/ApplicationError'

describe('listTasksUseCase', () => {
  const task1: TaskEntity = {
    id: '1',
    title: 'Buy milk',
    description: 'Need milk for coffee',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  }

  const task2: TaskEntity = {
    id: '2',
    title: 'Buy coffee',
    description: 'Need coffee for work',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  }

  it('should return all Tasks when no filters provided', async () => {
    const repository = createMockRepository()
    await repository.save(task1)
    await repository.save(task2)

    const useCase = listTasksUseCase(repository)

    await expect(useCase.execute()).resolves.toEqual([task1, task2])
  })

  it('should return all Tasks when empty filters are provided', async () => {
    const repository = createMockRepository()
    await repository.save(task1)
    await repository.save(task2)

    const useCase = listTasksUseCase(repository)

    await expect(useCase.execute({})).resolves.toEqual([task1, task2])
  })

  it('should return filters Tasks when filters are provided', async () => {
    const repository = createMockRepository()
    const task1Completed = {...task1, completed: true }

    await repository.save(task1Completed)
    await repository.save(task2)

    const useCase = listTasksUseCase(repository)

    await expect(useCase.execute({ completed: 'false' })).resolves.toEqual([task2])
    await expect(useCase.execute({ completed: 'true' })).resolves.toEqual([task1Completed])
  })

  it('should throw ApplicationError when repository fails', async () => {
    const repository = createMockRepository({ getAll: vi.fn().mockRejectedValue(new InfrastructureError('DB down')) })
    const useCase = listTasksUseCase(repository)

    await expect(useCase.execute()).rejects.toThrow(new ApplicationError('Error getting Tasks'))
  })
})
