import { describe, it, expect, vi } from 'vitest'
import { deleteTodoUseCase } from './deleteTodo.useCase'
import { TodoEntity } from '@/core/shared/domain/Todo.entity'
import { createMockRepository } from '@/test/mockTodoRepository'
import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { InfrastructureError } from '@/core/shared/infrastructure/InfrastructureError'

describe('deleteTodoUseCase', () => {
  const todo: TodoEntity = {
    id: '1',
    title: 'Test',
    description: 'A valid description here',
    createdAt: new Date(),
    completed: false,
    subtasks: []
  }

  it('should delete an existing Todo', async () => {
    const repository = createMockRepository()
    await repository.save(todo)

    const useCase = deleteTodoUseCase(repository)
    const result = await useCase.execute(todo.id)

    expect(result).toBe(true)
  })

  it('should throw ApplicationError when Todo is not found', async () => {
    const repository = createMockRepository()
    const useCase = deleteTodoUseCase(repository)

    await expect(useCase.execute('nonExistentId')).rejects.toThrow(new ApplicationError('Todo not found'))
  })

  it('should throw ApplicationError when delete fails', async () => {
    const repository = createMockRepository({ delete: vi.fn().mockRejectedValue(new InfrastructureError('DB down')) })

    await repository.save(todo)

    const useCase = deleteTodoUseCase(repository)
    
    await expect(useCase.execute(todo.id)).rejects.toThrow(new ApplicationError('Error deleting Todo'))
  })
})
