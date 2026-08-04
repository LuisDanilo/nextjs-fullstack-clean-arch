import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { GetTodosFilters, TodoRepository } from '@/core/shared/domain/Todo.repository'

/**
 * Función que toma los parámetros de consulta de la petición y los valida para convertirlos en un objeto de tipo {@link GetTodosFilters}.
 *
 * @param params - Parámetros de la petición.
 * @returns Un objeto de tipo {@link GetTodosFilters}.
 */
function createFilters(params: Record<string, string | undefined>): GetTodosFilters {
  const isNotEmptyString = (value: string | undefined) => value && value.trim() !== ''
  const validatedFilters: GetTodosFilters = {}

  if(isNotEmptyString(params.search)) {
    validatedFilters.search = params.search!
  }

  if(isNotEmptyString(params.completed) && ["true", "false"].includes(params.completed!)) {
    validatedFilters.completed = params.completed! === "true"
  }

  if(isNotEmptyString(params.endDate)) {
    const endDate = new Date(params.endDate!)
    
    if(!Number.isNaN(endDate.getTime())) {
      validatedFilters.endDate = endDate
    }
  }

  if(isNotEmptyString(params.startDate)) {
    const startDate = new Date(params.startDate!)
    
    if(!Number.isNaN(startDate.getTime())) {
      validatedFilters.startDate = startDate
    }
  }

  return validatedFilters
}

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
    execute: async (params?: Record<string, string | undefined>) => {
      try {
        if (!params || Object.keys(params).length === 0) {
          return await todosRepository.getAll()
        }

        const validatedFilters = createFilters(params)

        return await todosRepository.find(validatedFilters)
      } catch (error) {
        if (error instanceof DomainError || error instanceof ApplicationError) throw error
        throw new ApplicationError('Error getting Todos', { cause: error })
      }
    }
  }
}

