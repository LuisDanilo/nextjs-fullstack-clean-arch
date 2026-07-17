import { TodoEntity } from './Todo.entity'

/**
 * Interfaz que define los filtros que se pueden aplicar al obtener las tareas.
 */
export interface GetTodosFilters {
  completed?: boolean
  search?: string
  startDate?: Date
  endDate?: Date
}


/**
 * Interfaz que define los métodos que debe implementar un repositorio de tareas.
 * Cualquier repositorio de tareas debe poder realizar estas acciones de persistencia.
 */
export interface TodoRepository {
  find(filters: GetTodosFilters): Promise<Array<TodoEntity>>
  getAll(): Promise<Array<TodoEntity>>
  getById(id: string): Promise<TodoEntity | null>
  save(todo: TodoEntity): Promise<boolean>
  delete(id: string): Promise<boolean>
} 

