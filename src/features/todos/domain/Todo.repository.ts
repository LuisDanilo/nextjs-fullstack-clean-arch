import { TodoEntity } from "./Todo.entity"

/**
 * Interfaz que define los métodos que debe implementar un repositorio de tareas (Todos).
 * Cualquier repositorio de Todos debe poder hacer estas acciones. 
 */
export interface TodoRepository {
  getAll(): Promise<TodoEntity[]>
  getById(id: string): Promise<TodoEntity | null>
  create(title: string, description: string): Promise<TodoEntity>
  update(id: string, title: string, description: string): Promise<TodoEntity | null>
  delete(id: string): Promise<boolean>
  toggle(id: string): Promise<boolean>
} 

