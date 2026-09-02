import { type TaskRepository } from '@/core/shared/domain/Task.repository'
import { inMemoryTaskRepository } from '@/core/shared/infrastructure/inMemoryTaskRepository'

export const taskRepository: TaskRepository = inMemoryTaskRepository()
