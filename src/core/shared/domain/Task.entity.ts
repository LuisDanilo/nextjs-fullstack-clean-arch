import { TaskStatus } from './TaskStatus'

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
