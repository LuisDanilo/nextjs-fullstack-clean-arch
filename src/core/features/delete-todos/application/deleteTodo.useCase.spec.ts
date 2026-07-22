import { describe, it, expect, vi } from 'vitest'
import { deleteTodoUseCase } from './deleteTodo.useCase'
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

describe('deleteTodoUseCase', () => {
  it('should delete an existing todo', async () => {
    const todo = createTodo({ title: 'Test', description: 'A valid description here' })
    const mockGetById = vi.fn().mockResolvedValue(todo)
    const mockDelete = vi.fn().mockResolvedValue(true)
    const repository = createMockRepository({ getById: mockGetById, delete: mockDelete })

    const useCase = deleteTodoUseCase(repository)
    const result = await useCase.execute(todo.id)

    expect(result).toBe(true)
    expect(mockDelete).toHaveBeenCalledWith(todo)
  })

  it('should throw ApplicationError when todo is not found', async () => {
    const repository = createMockRepository({ getById: vi.fn().mockResolvedValue(null) })

    const useCase = deleteTodoUseCase(repository)
    await expect(useCase.execute('nonexistent')).rejects.toThrow('Todo not found')
  })

  it('should throw ApplicationError when delete fails', async () => {
    const todo = createTodo({ title: 'Test', description: 'A valid description here' })
    const mockGetById = vi.fn().mockResolvedValue(todo)
    const mockDelete = vi.fn().mockRejectedValue(new Error('DB down'))
    const repository = createMockRepository({ getById: mockGetById, delete: mockDelete })

    const useCase = deleteTodoUseCase(repository)
    await expect(useCase.execute(todo.id)).rejects.toThrow('Error deleting todo: Error: DB down')
  })
})
