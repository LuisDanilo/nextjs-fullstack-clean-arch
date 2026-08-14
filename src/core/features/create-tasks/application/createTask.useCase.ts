import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { createTask, CreateTaskData } from '../domain/createTask.domain'
import { TaskRepository } from '@/core/shared/domain/Task.repository'

/**
 * Función que representa el caso de uso de crear una tarea.
 *
 * @param tasksRepository - Repositorio de tareas que implementa la interfaz {@link TaskRepository} adaptada a una tecnología de persistencia concreta.
 * @returns Un objeto con el métask `execute` que ejecuta el caso de uso.
 */
export function createTaskUseCase(tasksRepository: TaskRepository) {
  return {
    /**
     * Ejecuta el caso de uso de crear una tarea.
     *
     * @param data - Datos necesarios para crear la tarea (título, estado, etc.).
     * @returns Una promesa que, al resolverse, entrega la {@link TaskEntity} creada.
     *
     * @throws {DomainError} Si las reglas de negocio no se satisfacen se detiene la ejecución del caso de uso.
     * @throws {ApplicationError} Si alguna validación o error inesperado detiene la ejecución del caso de uso.
     */
    execute: async (data: CreateTaskData) => {
      try {
        const newTask = createTask(data)

        return await tasksRepository.save(newTask)
      } catch (error) {
        if (error instanceof DomainError || error instanceof ApplicationError) throw error
        throw new ApplicationError('Error creating Task', { cause: error })
      }
    }
  }
}

