import { describe, it, expect } from 'vitest'
import { completeTodoUseCase } from './completeTodo.useCase'
import { createTodo } from '@/core/features/create-todos/domain/createTodo.domain'
import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'
import { createMockRepository } from '@/test/mockTodoRepository'

describe('completeTodoUseCase', () => {
  it('should complete an existing Todo', async () => {
    const todo = createTodo({ title: 'Test', description: 'A valid description here' })
    const repository = createMockRepository()

    await repository.save(todo)

    const useCase = completeTodoUseCase(repository)
    
    await expect(useCase.execute(todo.id)).resolves.toEqual({ ...todo, completed: true })
  })

  it('should complete an existing Todo with subtasks', async () => {
    const todo1 = createTodo({ title: 'Test', description: 'A valid description here' })
    const todo2 = createTodo({ title: 'Subtask', description: 'A valid description here' })
    const repository = createMockRepository()

    todo1.subtasks = [todo2]
    
    await repository.save(todo2)
    await repository.save(todo1)

    const useCase = completeTodoUseCase(repository)

    await expect(useCase.execute(todo2.id)).resolves.toEqual({ ...todo2, completed: true })
    await expect(useCase.execute(todo1.id)).resolves.toEqual({ ...todo1, subtasks: [{ ...todo2, completed: true }], completed: true })
  })

  it('should throw ApplicationError when Todo is not found', async () => {
    const repository = createMockRepository()
    const useCase = completeTodoUseCase(repository)

    await expect(useCase.execute('nonExistentId')).rejects.toThrow(new ApplicationError('Todo not found'))
  })

  it('should let DomainError propagate when Todo is already completed', async () => {
    const todo = createTodo({ title: 'Test', description: 'A valid description here' })
    const repository = createMockRepository()
    
    await repository.save(todo)

    const useCase = completeTodoUseCase(repository)

    await useCase.execute(todo.id)
    
    await expect(useCase.execute(todo.id)).rejects.toThrow(new DomainError('Todo is already marked as completed'))
  })

  it('should let DomainError propagate when Todo has incomplete subtasks', async () => {
    const todo1 = createTodo({ title: 'Test', description: 'A valid description here' })
    const todo2 = createTodo({ title: 'Subtask', description: 'A valid description here' })
    const repository = createMockRepository()
    
    todo1.subtasks = [todo2]

    await repository.save(todo2)
    await repository.save(todo1)

    const useCase = completeTodoUseCase(repository)

    await expect(useCase.execute(todo1.id)).rejects.toThrow(new DomainError('Cannot mark Todo as completed because it has incomplete subtasks'))
  })
})
