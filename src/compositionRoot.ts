import { inMemoryTodoRepository } from '@/core/shared/infrastructure/inMemoryTodoRepository'
import type { TodoRepository } from '@/core/shared/domain/Todo.repository'

export const todoRepository: TodoRepository = inMemoryTodoRepository()
