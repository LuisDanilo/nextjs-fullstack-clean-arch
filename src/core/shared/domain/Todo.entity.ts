/**
 * Interfaz que modela una tarea.
 */
export interface TodoEntity {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
  subtasks: Array<TodoEntity>
}
