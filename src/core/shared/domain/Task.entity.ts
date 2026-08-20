import { type TaskStatus } from '@/core/shared/domain/TaskStatus'

/**
 * Interfaz que modela una tarea.
 */
export interface TaskEntity {
  id: string
  title: string
  description: string
  status: TaskStatus
  createdAt: Date
  subtasks: Array<TaskEntity>
}
