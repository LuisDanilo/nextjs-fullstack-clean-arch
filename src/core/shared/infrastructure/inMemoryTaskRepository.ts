import { type TaskEntity } from '@/core/shared/domain/Task.entity'
import { type GetTasksFilters, type TaskRepository } from '@/core/shared/domain/Task.repository'
import { InfrastructureError } from '@/core/shared/infrastructure/InfrastructureError'
import { syncSubtaskInParents } from '@/core/shared/infrastructure/syncSubtaskInParents'

/**
 * Función que implementa el repositorio de tareas en memoria.
 *
 * @returns Implementación concreta de {@link TaskRepository} para persistir tareas en memoria.
 */
export function inMemoryTaskRepository(): TaskRepository {
  const tasks = new Map<string, TaskEntity>()

  return {
    getAll: async () => {
      try {
        return Array.from(tasks.values())
      } catch (error) {
        throw new InfrastructureError(`Error getting Tasks: ${error}`)
      }
    },

    find: async function ({ status, startDate, endDate, search }: GetTasksFilters) {
      try {
        let result = Array.from(tasks.values())

        if (status !== undefined) {
          result = result.filter(t => t.status === status)
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
        throw new InfrastructureError(`Error finding Tasks: ${error}`)
      }
    },

    getById: async function (id: string) {
      try {
        return tasks.get(id) ?? null
      } catch (error) {
        throw new InfrastructureError(`Error getting Task by id: ${error}`)
      }
    },

    save: async function (task: TaskEntity) {
      try {
        tasks.set(task.id, task)
        syncSubtaskInParents(tasks, task)
        return task
      } catch (error) {
        throw new InfrastructureError(`Error saving Task: ${error}`)
      }
    },

    delete: async function (task: TaskEntity) {
      try {
        return tasks.delete(task.id)
      } catch (error) {
        throw new InfrastructureError(`Error deleting Task: ${error}`)
      }
    }
  }
}

