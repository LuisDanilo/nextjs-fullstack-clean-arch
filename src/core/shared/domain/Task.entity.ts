/**
 * Interfaz que modela una tarea.
 */
export interface TaskEntity {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
  subtasks: Array<TaskEntity>
}
