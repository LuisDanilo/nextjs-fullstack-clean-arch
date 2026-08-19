import { describe, it, expect, vi } from 'vitest'
import { deleteTaskUseCase } from './deleteTask.useCase'
import { TaskEntity } from '@/core/shared/domain/Task.entity'
import { createMockRepository } from '@/test/mockTaskRepository'
import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { InfrastructureError } from '@/core/shared/infrastructure/InfrastructureError'

describe('deleteTaskUseCase', () => {
  const task: TaskEntity = {
    id: '1',
    title: 'Test',
    description: 'A valid description here',
    createdAt: new Date(),
    status: 'pending',
    subtasks: []
  }

  it('should delete an existing Task', async () => {
    const repository = createMockRepository()
    await repository.save(task)

    const useCase = deleteTaskUseCase(repository)
    const result = await useCase.execute(task.id)

    expect(result).toBe(true)
  })

  it('should throw ApplicationError when Task is not found', async () => {
    const repository = createMockRepository()
    const useCase = deleteTaskUseCase(repository)

    await expect(useCase.execute('nonExistentId')).rejects.toThrow(new ApplicationError('Task not found'))
  })

  it('should throw ApplicationError when delete fails', async () => {
    const repository = createMockRepository({ delete: vi.fn().mockRejectedValue(new InfrastructureError('DB down')) })

    await repository.save(task)

    const useCase = deleteTaskUseCase(repository)
    
    await expect(useCase.execute(task.id)).rejects.toThrow(new ApplicationError('Error deleting Task'))
  })
})
