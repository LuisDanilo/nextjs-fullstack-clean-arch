import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { completeTodo } from '@/core/shared/domain/Todo.entity'
import { TodoRepository } from '@/core/shared/domain/Todo.repository'
import InfrastructureError from '@/core/shared/infrastructure/InfrastructureError'

/**
 * Caso de uso para completar una tarea.
 * Una tarea puede ser completada solo si no ha sido completada antes y si no tiene subtareas pendientes.
 *
 * @param todosRepository Instancia de una implementación de {@link TodoRepository}.
 * @returns Un objeto con el método `execute` que ejecuta el caso de uso.
 * @throws {DomainError} Si ocurre un error de la capa dominio. 
 * @throws {ApplicationError} Si ocurre un error de la capa aplicación. 
 * @throws {InfrastructureError} Si ocurre un error de la capa de infraestructura.
 */
export default function completeTodoUseCase(todosRepository: TodoRepository) {
  return {
    execute: async (id: string) => {
      try {
        const todo = await todosRepository.getById(id)

       if(!todo) {
          throw new ApplicationError('Todo not found')
        }
        const updatedTodo = completeTodo(todo)

        return await todosRepository.save(updatedTodo) 
      } catch(error) {
        if(error instanceof DomainError || error instanceof InfrastructureError || error instanceof ApplicationError) {
          throw error
        }
        throw new ApplicationError(`Error completing todo: ${error}`)
      }
    }
  }
}
