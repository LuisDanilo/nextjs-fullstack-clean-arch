import { describe, it, expect, vi } from 'vitest'
import { completeTodoUseCase } from './completeTodo.useCase'
import { createTodo } from '@/core/shared/domain/Todo.entity'
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

describe('completeTodoUseCase', () => {
  it('should complete an existing todo', async () => {
    const todo = createTodo({ title: 'Test', description: 'A valid description here' })
    const mockGetById = vi.fn().mockResolvedValue(todo)
    const mockSave = vi.fn().mockImplementation(async (t: TodoEntity) => t)
    const repository = createMockRepository({ getById: mockGetById, save: mockSave })

    const useCase = completeTodoUseCase(repository)
    const result = await useCase.execute(todo.id)

    expect(result).toMatchObject({ ...todo, completed: true })
    expect(mockSave).toHaveBeenCalledOnce()
  })

  it('should throw ApplicationError when todo is not found', async () => {
    const mockGetById = vi.fn().mockResolvedValue(null)
    const repository = createMockRepository({ getById: mockGetById })

    const useCase = completeTodoUseCase(repository)
    await expect(useCase.execute('nonexistent')).rejects.toThrow('Todo not found')
  })

  it('should let DomainError propagate when todo is already completed', async () => {
    const todo = createTodo({ title: 'Test', description: 'A valid description here' })
    const completedTodo = { ...todo, completed: true }
    const mockGetById = vi.fn().mockResolvedValue(completedTodo)
    const repository = createMockRepository({ getById: mockGetById })

    const useCase = completeTodoUseCase(repository)
    await expect(useCase.execute(todo.id)).rejects.toThrow('Todo is already marked as completed')
  })
})
