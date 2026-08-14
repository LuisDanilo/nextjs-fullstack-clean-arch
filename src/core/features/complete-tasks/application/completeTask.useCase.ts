import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { completeTask } from '../domain/completeTask.domain'
import { TaskRepository } from '@/core/shared/domain/Task.repository'

/**
 * Función que representa el caso de uso de completar una tarea.
 *
 * @param tasksRepository - Repositorio de tareas que implementa la interfaz {@link TaskRepository} adaptada a una tecnología de persistencia concreta.
 * @returns Un objeto con el métask `execute` que ejecuta el caso de uso.
 */
export function completeTaskUseCase(tasksRepository: TaskRepository) {
  return {
    /**
     * Ejecuta el caso de uso de completar una tarea.
     *
     * @param id - Identificador de la tarea a completar.
     * @returns Una promesa que, al resolverse, entrega el {@link TaskEntity} actualizado. 
     *
     * @throws {DomainError} Si las reglas de negocio no se satisfacen se detiene la ejecución del caso de uso.
     * @throws {ApplicationError} Si alguna validación o error inesperado detiene la ejecución del caso de uso.
     */
    execute: async (id: string) => {
      try {
        const task = await tasksRepository.getById(id)

        if (!task) {
          throw new ApplicationError('Task not found')
        }

        const updatedTask = completeTask(task)

        return await tasksRepository.save(updatedTask)
      } catch (error) {
        if (error instanceof DomainError || error instanceof ApplicationError) throw error
        throw new ApplicationError('Error completing Task', { cause: error })
      }
    }
  }
}

