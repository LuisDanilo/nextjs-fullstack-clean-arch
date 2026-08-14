import { inMemoryTaskRepository } from '@/core/shared/infrastructure/inMemoryTaskRepository'
import type { TaskRepository } from '@/core/shared/domain/Task.repository'

export const taskRepository: TaskRepository = inMemoryTaskRepository()
