import { describe, expect, it, vi } from 'vitest'

import { listTasksUseCase } from '@/core/features/list-tasks/application/listTasks.useCase'
import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { type TaskEntity } from '@/core/shared/domain/Task.entity'
import { InfrastructureError } from '@/core/shared/infrastructure/InfrastructureError'
import { createMockRepository } from '@/test/mockTaskRepository'

describe('listTasksUseCase', () => {
  const task1: TaskEntity = {
    id: '1',
    title: 'Buy milk',
    description: 'Need milk for coffee',
    status: 'pending',
    createdAt: new Date(),
    subtasks: []
  }

  const task2: TaskEntity = {
    id: '2',
    title: 'Buy coffee',
    description: 'Need coffee for work',
    status: 'pending',
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
    const task1Done = {...task1, status: 'done' as const }

    await repository.save(task1Done)
    await repository.save(task2)

    const useCase = listTasksUseCase(repository)

    await expect(useCase.execute({ status: 'pending' })).resolves.toEqual([task2])
    await expect(useCase.execute({ status: 'done' })).resolves.toEqual([task1Done])
  })

  it('should ignore an invalid status filter', async () => {
    const repository = createMockRepository()
    await repository.save(task1)

    const useCase = listTasksUseCase(repository)

    await useCase.execute({ status: 'invalid' })

    expect(repository.find).toHaveBeenCalledWith({})
  })

  it('should ignore a whitespace-only search filter', async () => {
    const repository = createMockRepository()
    await repository.save(task1)

    const useCase = listTasksUseCase(repository)

    await useCase.execute({ search: '   ' })

    expect(repository.find).toHaveBeenCalledWith({})
  })

  it('should ignore invalid dates', async () => {
    const repository = createMockRepository()
    await repository.save(task1)

    const useCase = listTasksUseCase(repository)

    await useCase.execute({ startDate: 'not-a-date', endDate: 'also-not-a-date' })

    expect(repository.find).toHaveBeenCalledWith({})
  })

  it('should pass through valid filters', async () => {
    const repository = createMockRepository()
    await repository.save(task1)

    const useCase = listTasksUseCase(repository)

    const startDate = new Date('2026-01-01T00:00:00.000Z')
    await useCase.execute({ status: 'pending', search: 'milk', startDate: startDate.toISOString() })

    expect(repository.find).toHaveBeenCalledWith({ status: 'pending', search: 'milk', startDate })
  })

  it('should throw ApplicationError when repository fails', async () => {
    const repository = createMockRepository({ getAll: vi.fn().mockRejectedValue(new InfrastructureError('DB down')) })
    const useCase = listTasksUseCase(repository)

    await expect(useCase.execute()).rejects.toThrow(new ApplicationError('Error getting Tasks'))
  })
})
