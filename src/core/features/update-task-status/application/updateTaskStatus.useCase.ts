import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { type TaskRepository } from '@/core/shared/domain/Task.repository'
import { isTaskStatus } from '@/core/shared/domain/TaskStatus'
import { updateTaskStatus } from '@/core/features/update-task-status/domain/updateTaskStatus.domain'

/**
 * Función que representa el caso de uso de actualizar el estado de una tarea.
 *
 * @param tasksRepository - Repositorio de tareas que implementa la interfaz {@link TaskRepository} adaptada a una tecnología de persistencia concreta.
 * @returns Un objeto con el métask `execute` que ejecuta el caso de uso.
 */
export function updateTaskStatusUseCase(tasksRepository: TaskRepository) {
  return {
    /**
     * Ejecuta el caso de uso de actualizar el estado de una tarea.
     *
     * @param id - Identificador de la tarea a actualizar.
     * @param status - Nuevo estado {@link TaskStatus} de la tarea.
     * @returns Una promesa que, al resolverse, entrega el {@link TaskEntity} actualizado. 
     *
     * @throws {DomainError} Si las reglas de negocio no se satisfacen se detiene la ejecución del caso de uso.
     * @throws {ApplicationError} Si alguna validación o error inesperado detiene la ejecución del caso de uso.
     */
    execute: async (id: string, status: string) => {
      try {
        if (!isTaskStatus(status)) {
          throw new ApplicationError('Invalid status')
        }

        const task = await tasksRepository.getById(id)

        if (!task) {
          throw new ApplicationError('Task not found')
        }

        const updatedTask = updateTaskStatus(task, status)

        return await tasksRepository.save(updatedTask)
      } catch (error) {
        if (error instanceof DomainError || error instanceof ApplicationError) throw error
        throw new ApplicationError('Error updating Task status', { cause: error })
      }
    }
  }
}
