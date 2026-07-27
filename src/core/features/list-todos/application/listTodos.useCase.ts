import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { GetTodosFilters, TodoRepository } from '@/core/shared/domain/Todo.repository'

/**
 * Función que representa el caso de uso de listar tareas.
 *
 * @param todosRepository - Repositorio de tareas que implementa la interfaz {@link TodoRepository} adaptada a una tecnología de persistencia concreta.
 * @returns Un objeto con el método `execute` que ejecuta el caso de uso.
 */
export function listTodosUseCase(todosRepository: TodoRepository) {
  return {
    /**
     * Ejecuta el caso de uso de listar tareas.
     *
     * @param filters - Filtros opcionales para acotar la búsqueda de tareas.
     * @returns Una promesa que, al resolverse, entrega un arreglo de {@link TodoEntity}.
     *
     * @throws {DomainError} Si las reglas de negocio no se satisfacen se detiene la ejecución del caso de uso.
     * @throws {ApplicationError} Si alguna validación o error inesperado detiene la ejecución del caso de uso.
     */
    execute: async (filters?: GetTodosFilters) => {
      try {
        if (!filters || Object.keys(filters).length === 0) {
          return await todosRepository.getAll()
        }

        return await todosRepository.find(filters)
      } catch (error) {
        if (error instanceof DomainError || error instanceof ApplicationError) throw error
        throw new ApplicationError('Error getting Todos', { cause: error })
      }
    }
  }
}

