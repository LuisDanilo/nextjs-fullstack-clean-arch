import { TodoRepository, GetTodosFilters } from '@/core/shared/domain/Todo.repository'
import { TodoEntity } from '@/core/shared/domain/Todo.entity'
import { syncSubtaskInParents } from '@/core/shared/infrastructure/syncSubtaskInParents'
import { vi } from 'vitest'

export function createMockRepository(overrides: Partial<TodoRepository> = {}): TodoRepository {
  const store = new Map<string, TodoEntity>()

  const defaults: TodoRepository = {
    getAll: vi.fn(async () => Array.from(store.values())),

    find: vi.fn(async ({ completed, startDate, endDate, search }: GetTodosFilters) => {
      let result = Array.from(store.values())

      if (completed !== undefined) {
        result = result.filter(t => t.completed === completed)
      }
      if (startDate) {
        result = result.filter(t => t.createdAt >= startDate)
      }
      if (endDate) {
        result = result.filter(t => t.createdAt <= endDate)
      }
      if (search) {
        result = result.filter(t => t.title.includes(search))
      }
      return result
    }),

    getById: vi.fn(async (id: string) => store.get(id) ?? null),

    save: vi.fn(async (todo: TodoEntity) => {
      store.set(todo.id, todo)
      syncSubtaskInParents(store, todo)
      return todo
    }),

    delete: vi.fn(async (todo: TodoEntity) => store.delete(todo.id))
  }

  return { ...defaults, ...overrides }
}
