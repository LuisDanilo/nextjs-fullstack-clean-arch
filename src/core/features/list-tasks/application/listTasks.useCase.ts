import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { type GetTasksFilters, type TaskRepository } from '@/core/shared/domain/Task.repository'
import { isTaskStatus } from '@/core/shared/domain/TaskStatus'

/**
 * Función que toma los parámetros de consulta de la petición y los valida para convertirlos en un objeto de tipo {@link GetTasksFilters}.
 *
 * @param params - Parámetros de la petición.
 * @returns Un objeto de tipo {@link GetTasksFilters}.
 */
function createFilters(params: Record<string, string | undefined>): GetTasksFilters {
  const isNotEmptyString = (value: string | undefined) => value && value.trim() !== ''
  const validatedFilters: GetTasksFilters = {}

  if(isNotEmptyString(params.search)) {
    validatedFilters.search = params.search!
  }

  if(isNotEmptyString(params.status) && isTaskStatus(params.status)) {
    validatedFilters.status = params.status
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
 * @param tasksRepository - Repositorio de tareas que implementa la interfaz {@link TaskRepository} adaptada a una tecnología de persistencia concreta.
 * @returns Un objeto con el métask `execute` que ejecuta el caso de uso.
 */
export function listTasksUseCase(tasksRepository: TaskRepository) {
  return {
    /**
     * Ejecuta el caso de uso de listar tareas.
     *
     * @param filters - Filtros opcionales para acotar la búsqueda de tareas.
     * @returns Una promesa que, al resolverse, entrega un arreglo de {@link TaskEntity}.
     *
     * @throws {DomainError} Si las reglas de negocio no se satisfacen se detiene la ejecución del caso de uso.
     * @throws {ApplicationError} Si alguna validación o error inesperado detiene la ejecución del caso de uso.
     */
    execute: async (params?: Record<string, string | undefined>) => {
      try {
        if (!params || Object.keys(params).length === 0) {
          return await tasksRepository.getAll()
        }

        const validatedFilters = createFilters(params)

        return await tasksRepository.find(validatedFilters)
      } catch (error) {
        if (error instanceof DomainError || error instanceof ApplicationError) throw error
        throw new ApplicationError('Error getting Tasks', { cause: error })
      }
    }
  }
}

