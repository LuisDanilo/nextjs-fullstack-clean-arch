import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { GetTodosFilters, TodoRepository } from '@/core/shared/domain/Todo.repository'

/**
 * Caso de uso para listar tareas con filtros opcionales.
 * Si no se proporcionan filtros, se obtienen todas las tareas.
 * Si se proporcionan filtros, se obtienen las tareas que cumplen con esos filtros.
 *
 * @param todosRepository Instancia de una implementación de {@link TodoRepository}.
 * @returns Un objeto con el método `execute` que ejecuta el caso de uso.
 * @throws {DomainError} Si ocurre un error de la capa dominio. 
 * @throws {ApplicationError} Si ocurre un error de la capa aplicación.
 */
export function listTodosUseCase(todosRepository: TodoRepository) {
  return {
    execute: async (filters?: GetTodosFilters) => {
      try {
        if (!filters || Object.keys(filters).length === 0) {
          return await todosRepository.getAll()
        }

        return await todosRepository.find(filters)
      } catch (error) {
        if (error instanceof DomainError) throw error
        throw new ApplicationError(`Error getting todos: ${error}`)
      }
    }
  }
}

