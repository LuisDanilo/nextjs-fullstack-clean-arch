import { describe, it, expect, vi } from 'vitest'
import { createTaskUseCase } from './createTask.useCase'
import { createMockRepository } from '@/test/mockTaskRepository'
import { InfrastructureError } from '@/core/shared/infrastructure/InfrastructureError'
import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'

describe('createTaskUseCase', () => {
  it('should create and save a Task', async () => {
    const repository = createMockRepository()

    const useCase = createTaskUseCase(repository)
    const result = await useCase.execute({ title: 'Buy milk', description: 'Need milk for coffee' })

    expect(result).toMatchObject({
      title: 'Buy milk',
      description: 'Need milk for coffee',
      completed: false,
      subtasks: []
    })
    expect(result.id).toBeDefined()
    expect(result.createdAt).toBeInstanceOf(Date)

  })

  it('should throw ApplicationError when save fails', async () => {
    const repository = createMockRepository({ save: vi.fn().mockRejectedValue(new InfrastructureError('DB down')) })

    const useCase = createTaskUseCase(repository)
    await expect(useCase.execute({ title: 'Buy milk', description: 'Need milk for coffee' })).rejects.toThrow(new ApplicationError('Error creating Task'))
  })

  it('should let DomainError propagate when title is empty', async () => {
    const repository = createMockRepository()
    const useCase = createTaskUseCase(repository)

    await expect(useCase.execute({ title: '', description: 'Short' })).rejects.toThrow(new DomainError('Task title cannot be empty'))
  })

  it('should let DomainError propagate when title is whitespace only', async () => {
    const repository = createMockRepository()
    const useCase = createTaskUseCase(repository)

    await expect(useCase.execute({ title: '   ', description: 'Short' })).rejects.toThrow(new DomainError('Task title cannot be empty'))
  })

  it('should let DomainError propagate when description is too short', async () => {
    const repository = createMockRepository()
    const useCase = createTaskUseCase(repository)

    await expect(useCase.execute({ title: 'Test', description: 'Short' })).rejects.toThrow(new DomainError('Task description must be at least 10 characters long'))
  })

  it('should let DomainError propagate when description is empty', async () => {
    const repository = createMockRepository()
    const useCase = createTaskUseCase(repository)

    await expect(useCase.execute({ title: 'Test', description: '' })).rejects.toThrow(new DomainError('Task description must be at least 10 characters long'))
  })
})
