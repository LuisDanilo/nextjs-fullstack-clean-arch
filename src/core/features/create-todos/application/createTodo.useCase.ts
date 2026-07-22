import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { createTodo, CreateTodoData } from '@/core/shared/domain/Todo.entity'
import { TodoRepository } from '@/core/shared/domain/Todo.repository'

/**
 * Caso de uso para crear tareas.
 *
 * @param todosRepository Instancia de una implementación de {@link TodoRepository}.
 * @returns Un objeto con el método `execute` que ejecuta el caso de uso.
 * @throws {DomainError} Si ocurre un error de la capa dominio. 
 * @throws {ApplicationError} Si ocurre un error de la capa aplicación.
 */
export function createTodoUseCase(todosRepository: TodoRepository) {
  return {
    execute: async (data: CreateTodoData) => {
      try {
        const newTodo = createTodo(data)

        return await todosRepository.save(newTodo)
      } catch (error) {
        if (error instanceof DomainError) throw error
        throw new ApplicationError(`Error creating task: ${error}`)
      }
    }
  }
}

