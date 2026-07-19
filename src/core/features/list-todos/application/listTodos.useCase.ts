
import { GetTodosFilters, TodoRepository } from '@/core/shared/domain/Todo.repository'

/**
 * Caso de uso para listar tareas con filtros opcionales.
 * Si no se proporcionan filtros, se obtienen todas las tareas.
 * Si se proporcionan filtros, se obtienen las tareas que cumplen con esos filtros.
 *
 * @param todosRepository Instancia de una implementación de {@link TodoRepository}.
 * @returns Un objeto con el método `execute` que ejecuta el caso de uso.
 */
export default function listTodosUseCase(todosRepository: TodoRepository) {
  // TODO Esto puede arrojar en algún punto un DomainError o un ApplicationError?
  return { 
    execute: (filters?: GetTodosFilters) => {
      if (!filters || Object.keys(filters).length === 0) {
        return todosRepository.getAll()
      }

      return todosRepository.find(filters)
    }
  }
}

