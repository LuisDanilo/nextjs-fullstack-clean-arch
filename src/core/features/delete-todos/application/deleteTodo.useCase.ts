import { TodoRepository } from '@/core/shared/domain/Todo.repository'

/**
 * Caso de uso para borrar una tarea.
 *
 * @param todosRepository Instancia de una implementación de {@link TodoRepository}.
 * @returns Un objeto con el método `execute` que ejecuta el caso de uso.
 * @throws {DomainError} Si ocurre un error de la capa dominio. 
 * @throws {ApplicationError} Si ocurre un error de la capa aplicación. 
 */
export default function deleteTodoUseCase(todosRepository: TodoRepository) {
  return {
    execute: async (id: string) => {
      const todo = await todosRepository.getById(id)

      if (!todo) {
        throw new Error('Todo not found')
      }

      return todosRepository.delete(todo)
    }
  }
}
