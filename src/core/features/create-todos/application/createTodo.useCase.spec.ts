import { describe, it, expect, vi } from 'vitest'
import { createTodoUseCase } from './createTodo.useCase'
import type { TodoRepository } from '@/core/shared/domain/Todo.repository'
import type { TodoEntity } from '@/core/shared/domain/Todo.entity'

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

describe('createTodoUseCase', () => {
  it('should create and save a todo', async () => {
    const mockSave = vi.fn().mockImplementation(async (todo: TodoEntity) => todo)
    const repository = createMockRepository({ save: mockSave })

    const useCase = createTodoUseCase(repository)
    const result = await useCase.execute({ title: 'Buy milk', description: 'Need milk for coffee' })

    expect(result).toMatchObject({
      title: 'Buy milk',
      description: 'Need milk for coffee',
      completed: false
    })
    expect(mockSave).toHaveBeenCalledOnce()
  })

  it('should throw ApplicationError when save fails', async () => {
    const mockSave = vi.fn().mockRejectedValue(new Error('DB down'))
    const repository = createMockRepository({ save: mockSave })

    const useCase = createTodoUseCase(repository)
    await expect(useCase.execute({ title: 'Buy milk', description: 'Need milk for coffee' })).rejects.toThrow('Error creating task: Error: DB down')
  })

  it('should let DomainError propagate', async () => {
    const repository = createMockRepository({})

    const useCase = createTodoUseCase(repository)
    await expect(useCase.execute({ title: '', description: 'Short' })).rejects.toThrow('Todo title cannot be empty')
    expect(repository.save).not.toHaveBeenCalled()
  })
})
