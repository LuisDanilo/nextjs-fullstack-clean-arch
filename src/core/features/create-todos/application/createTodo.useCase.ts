import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { createTodo, CreateTodoData } from '@/core/shared/domain/Todo.entity'
import { TodoRepository } from '@/core/shared/domain/Todo.repository'


export default function createTodoUseCase(todosRepository: TodoRepository) {
  return {
    execute: (data: CreateTodoData) => {
      try {
        const newTodo = createTodo(data)
        return todosRepository.save(newTodo)
      } catch (error) {
        console.error(error)

        if(error instanceof DomainError) {
          throw error
        }

        throw new ApplicationError(String(error))
      } 
    }
  }
}

