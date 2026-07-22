import { describe, it, expect, vi } from 'vitest'
import { listTodosUseCase } from './listTodos.useCase'
import { createTodo } from '@/core/shared/domain/Todo.entity'
import type { TodoRepository } from '@/core/shared/domain/Todo.repository'

function createMockRepository(overrides: Partial<TodoRepository>): TodoRepository {
  return {
    getAll: vi.fn(),
    find: vi.fn(),
    getById: vi.fn(),
    save: vi.fn(),
    delete: vi.fn(),
    ...overrides
  }
}

describe('listTodosUseCase', () => {
  const todo1 = createTodo({ title: 'Buy milk', description: 'Need milk for coffee' })
  const todo2 = createTodo({ title: 'Buy eggs', description: 'Need eggs for breakfast' })

  it('should return all todos when no filters provided', async () => {
    const repository = createMockRepository({ getAll: vi.fn().mockResolvedValue([todo1, todo2]) })

    const useCase = listTodosUseCase(repository)
    const result = await useCase.execute()

    expect(result).toEqual([todo1, todo2])
    expect(repository.getAll).toHaveBeenCalledOnce()
  })

  it('should return all todos when empty filters object provided', async () => {
    const repository = createMockRepository({ getAll: vi.fn().mockResolvedValue([todo1, todo2]) })

    const useCase = listTodosUseCase(repository)
    const result = await useCase.execute({})

    expect(result).toEqual([todo1, todo2])
    expect(repository.getAll).toHaveBeenCalledOnce()
  })

  it('should call find when filters are provided', async () => {
    const mockFind = vi.fn().mockResolvedValue([todo1])
    const repository = createMockRepository({ find: mockFind })

    const useCase = listTodosUseCase(repository)
    const result = await useCase.execute({ completed: false })

    expect(result).toEqual([todo1])
    expect(mockFind).toHaveBeenCalledWith({ completed: false })
  })

  it('should throw ApplicationError when repository fails', async () => {
    const repository = createMockRepository({ getAll: vi.fn().mockRejectedValue(new Error('DB down')) })

    const useCase = listTodosUseCase(repository)
    await expect(useCase.execute()).rejects.toThrow('Error getting todos: Error: DB down')
  })
})
