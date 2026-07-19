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
export default function createTodoUseCase(todosRepository: TodoRepository) {
  return {
    execute: (data: CreateTodoData) => {
      const newTodo = createTodo(data)

      if(!newTodo){
          throw new Error('Error creating todo')
      }

      return todosRepository.save(newTodo)
    } 
  }
}

