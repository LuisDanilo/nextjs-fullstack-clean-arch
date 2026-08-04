import { describe, it, expect, vi } from 'vitest'
import { listTodosUseCase } from './listTodos.useCase'
import { TodoEntity } from '@/core/shared/domain/Todo.entity'
import { createMockRepository } from '@/test/mockTodoRepository'
import { InfrastructureError } from '@/core/shared/infrastructure/InfrastructureError'
import { ApplicationError } from '@/core/shared/application/ApplicationError'

describe('listTodosUseCase', () => {
  const todo1: TodoEntity = {
    id: '1',
    title: 'Buy milk',
    description: 'Need milk for coffee',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  }

  const todo2: TodoEntity = {
    id: '2',
    title: 'Buy coffee',
    description: 'Need coffee for work',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  }

  it('should return all Todos when no filters provided', async () => {
    const repository = createMockRepository()
    await repository.save(todo1)
    await repository.save(todo2)

    const useCase = listTodosUseCase(repository)

    await expect(useCase.execute()).resolves.toEqual([todo1, todo2])
  })

  it('should return all Todos when empty filters are provided', async () => {
    const repository = createMockRepository()
    await repository.save(todo1)
    await repository.save(todo2)

    const useCase = listTodosUseCase(repository)

    await expect(useCase.execute({})).resolves.toEqual([todo1, todo2])
  })

  it('should return filters Todos when filters are provided', async () => {
    const repository = createMockRepository()
    const todo1Completed = {...todo1, completed: true }

    await repository.save(todo1Completed)
    await repository.save(todo2)

    const useCase = listTodosUseCase(repository)

    await expect(useCase.execute({ completed: 'false' })).resolves.toEqual([todo2])
    await expect(useCase.execute({ completed: 'true' })).resolves.toEqual([todo1Completed])
  })

  it('should throw ApplicationError when repository fails', async () => {
    const repository = createMockRepository({ getAll: vi.fn().mockRejectedValue(new InfrastructureError('DB down')) })
    const useCase = listTodosUseCase(repository)

    await expect(useCase.execute()).rejects.toThrow(new ApplicationError('Error getting Todos'))
  })
})
