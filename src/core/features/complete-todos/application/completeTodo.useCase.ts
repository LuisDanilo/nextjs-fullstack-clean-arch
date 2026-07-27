import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { completeTodo } from '../domain/completeTodo.domain'
import { TodoRepository } from '@/core/shared/domain/Todo.repository'

/**
 * Función que representa el caso de uso de completar una tarea.
 *
 * @param todosRepository - Repositorio de tareas que implementa la interfaz {@link TodoRepository} adaptada a una tecnología de persistencia concreta.
 * @returns Un objeto con el método `execute` que ejecuta el caso de uso.
 */
export function completeTodoUseCase(todosRepository: TodoRepository) {
  return {
    /**
     * Ejecuta el caso de uso de completar una tarea.
     *
     * @param id - Identificador de la tarea a completar.
     * @returns Una promesa que, al resolverse, entrega el {@link TodoEntity} actualizado. 
     *
     * @throws {DomainError} Si las reglas de negocio no se satisfacen se detiene la ejecución del caso de uso.
     * @throws {ApplicationError} Si alguna validación o error inesperado detiene la ejecución del caso de uso.
     */
    execute: async (id: string) => {
      try {
        const todo = await todosRepository.getById(id)

        if (!todo) {
          throw new ApplicationError('Todo not found')
        }

        const updatedTodo = completeTodo(todo)

        return await todosRepository.save(updatedTodo)
      } catch (error) {
        if (error instanceof DomainError || error instanceof ApplicationError) throw error
        throw new ApplicationError('Error completing Todo', { cause: error })
      }
    }
  }
}

