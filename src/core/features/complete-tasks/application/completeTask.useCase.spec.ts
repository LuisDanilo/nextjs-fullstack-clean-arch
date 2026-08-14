import { describe, it, expect } from 'vitest'
import { completeTaskUseCase } from './completeTask.useCase'
import { createTask } from '@/core/features/create-tasks/domain/createTask.domain'
import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { createMockRepository } from '@/test/mockTaskRepository'

describe('completeTaskUseCase', () => {
  it('should complete an existing Task', async () => {
    const task = createTask({ title: 'Test', description: 'A valid description here' })
    const repository = createMockRepository()

    await repository.save(task)

    const useCase = completeTaskUseCase(repository)
    
    await expect(useCase.execute(task.id)).resolves.toEqual({ ...task, completed: true })
  })

  it('should complete an existing Task with subtasks', async () => {
    const task1 = createTask({ title: 'Test', description: 'A valid description here' })
    const task2 = createTask({ title: 'Subtask', description: 'A valid description here' })
    const repository = createMockRepository()

    task1.subtasks = [task2]
    
    await repository.save(task2)
    await repository.save(task1)

    const useCase = completeTaskUseCase(repository)

    await expect(useCase.execute(task2.id)).resolves.toEqual({ ...task2, completed: true })
    await expect(useCase.execute(task1.id)).resolves.toEqual({ ...task1, subtasks: [{ ...task2, completed: true }], completed: true })
  })

  it('should throw ApplicationError when Task is not found', async () => {
    const repository = createMockRepository()
    const useCase = completeTaskUseCase(repository)

    await expect(useCase.execute('nonExistentId')).rejects.toThrow(new ApplicationError('Task not found'))
  })

  it('should let DomainError propagate when Task is already completed', async () => {
    const task = createTask({ title: 'Test', description: 'A valid description here' })
    const repository = createMockRepository()
    
    await repository.save(task)

    const useCase = completeTaskUseCase(repository)

    await useCase.execute(task.id)
    
    await expect(useCase.execute(task.id)).rejects.toThrow(new DomainError('Task is already marked as completed'))
  })

  it('should let DomainError propagate when Task has incomplete subtasks', async () => {
    const task1 = createTask({ title: 'Test', description: 'A valid description here' })
    const task2 = createTask({ title: 'Subtask', description: 'A valid description here' })
    const repository = createMockRepository()
    
    task1.subtasks = [task2]

    await repository.save(task2)
    await repository.save(task1)

    const useCase = completeTaskUseCase(repository)

    await expect(useCase.execute(task1.id)).rejects.toThrow(new DomainError('Cannot mark Task as completed because it has incomplete subtasks'))
  })
})
