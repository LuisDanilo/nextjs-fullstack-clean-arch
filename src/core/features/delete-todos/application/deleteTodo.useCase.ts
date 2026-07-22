import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { TodoRepository } from '@/core/shared/domain/Todo.repository'

/**
 * Caso de uso para borrar una tarea.
 *
 * @param todosRepository Instancia de una implementación de {@link TodoRepository}.
 * @returns Un objeto con el método `execute` que ejecuta el caso de uso.
 * @throws {DomainError} Si ocurre un error de la capa dominio. 
 * @throws {ApplicationError} Si ocurre un error de la capa aplicación.
 */
export function deleteTodoUseCase(todosRepository: TodoRepository) {
  return {
    execute: async (id: string) => {
      try {
        const todo = await todosRepository.getById(id)

        if (!todo) {
          throw new ApplicationError('Todo not found')
        }

        return await todosRepository.delete(todo)
      } catch (error) {
        if (error instanceof DomainError) throw error
        throw new ApplicationError(`Error deleting todo: ${error}`)
      }
    }
  }
}
