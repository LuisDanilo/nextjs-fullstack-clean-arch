import { GetTodosFilters, TodoRepository } from '../domain/Todo.repository'
import { TodoEntity } from '../domain/Todo.entity'
import { InfrastructureError } from './InfrastructureError'
import { syncSubtaskInParents } from './syncSubtaskInParents'

/**
 * Función que implementa el repositorio de tareas en memoria.
 *
 * @returns Implementación concreta de {@link TodoRepository} para persistir tareas en memoria.
 */
export function inMemoryTodoRepository(): TodoRepository {
  const todos = new Map<string, TodoEntity>()

  return {
    getAll: async () => {
      try {
        return Array.from(todos.values())
      } catch (error) {
        throw new InfrastructureError(`Error getting Todos: ${error}`)
      }
    },

    find: async function ({ completed, startDate, endDate, search }: GetTodosFilters) {
      try {
        let result = Array.from(todos.values())

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
      } catch (error) {
        throw new InfrastructureError(`Error finding Todos: ${error}`)
      }
    },

    getById: async function (id: string) {
      try {
        return todos.get(id) ?? null
      } catch (error) {
        throw new InfrastructureError(`Error getting Todo by id: ${error}`)
      }
    },

    save: async function (todo: TodoEntity) {
      try {
        todos.set(todo.id, todo)
        syncSubtaskInParents(todos, todo)
        return todo
      } catch (error) {
        throw new InfrastructureError(`Error saving Todo: ${error}`)
      }
    },

    delete: async function (todo: TodoEntity) {
      try {
        return todos.delete(todo.id)
      } catch (error) {
        throw new InfrastructureError(`Error deleting Todo: ${error}`)
      }
    }
  }
}

