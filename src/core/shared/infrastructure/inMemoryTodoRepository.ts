import { GetTodosFilters, TodoRepository } from '../domain/Todo.repository'
import { TodoEntity } from '../domain/Todo.entity'
import { InfrastructureError } from './InfrastructureError'
import { syncSubtaskInParents } from './syncSubtaskInParents'

inMemoryTodoRepository().getAll()

/**
 * Funcion que implementa el repositorio de tareas en memoria.
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
        return Array.from(todos.values()).filter(todo => {
          if (completed !== undefined && todo.completed !== completed) return false
          if (startDate && todo.createdAt < startDate) return false
          if (endDate && todo.createdAt > endDate) return false
          if (search && !todo.title.includes(search)) return false
          return true
        })
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

