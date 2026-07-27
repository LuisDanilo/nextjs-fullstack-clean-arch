import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { createTodo, CreateTodoData } from '../domain/createTodo.domain'
import { TodoRepository } from '@/core/shared/domain/Todo.repository'

/**
 * Función que representa el caso de uso de crear una tarea.
 *
 * @param todosRepository - Repositorio de tareas que implementa la interfaz {@link TodoRepository} adaptada a una tecnología de persistencia concreta.
 * @returns Un objeto con el método `execute` que ejecuta el caso de uso.
 */
export function createTodoUseCase(todosRepository: TodoRepository) {
  return {
    /**
     * Ejecuta el caso de uso de crear una tarea.
     *
     * @param data - Datos necesarios para crear la tarea (título, estado, etc.).
     * @returns Una promesa que, al resolverse, entrega la {@link TodoEntity} creada.
     *
     * @throws {DomainError} Si las reglas de negocio no se satisfacen se detiene la ejecución del caso de uso.
     * @throws {ApplicationError} Si alguna validación o error inesperado detiene la ejecución del caso de uso.
     */
    execute: async (data: CreateTodoData) => {
      try {
        const newTodo = createTodo(data)

        return await todosRepository.save(newTodo)
      } catch (error) {
        if (error instanceof DomainError || error instanceof ApplicationError) throw error
        throw new ApplicationError('Error creating Todo', { cause: error })
      }
    }
  }
}

