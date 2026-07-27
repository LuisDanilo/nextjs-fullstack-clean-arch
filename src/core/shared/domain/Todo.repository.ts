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
  /**
   * Busca tareas según los filtros proporcionados.
   *
   * @param filters - Objeto que contiene los filtros para la búsqueda de tareas.
   * @returns Una promesa que resuelve con un arreglo de entidades {@link TodoEntity} que coinciden con los filtros.
   */
  find(filters: GetTodosFilters): Promise<Array<TodoEntity>>
  /**
   * Obtiene todas las tareas almacenadas en memoria.
   *
   * @returns Una promesa que resuelve con un arreglo de entidades {@link TodoEntity} 
   */
  getAll(): Promise<Array<TodoEntity>>
  /**
   * Obtiene una tarea por su ID.
   *
   * @param id - Identificador de la tarea a buscar.
   * @returns Una promesa que resuelve con la entidad {@link TodoEntity} correspondiente al ID proporcionado, o `null` si no se encuentra.
   */
  getById(id: string): Promise<TodoEntity | null>
  /**
   * Guarda una tarea en el repositorio.
   *
   * @param todo - Entidad {@link TodoEntity} que se va a guardar.
   * @returns Una promesa que resuelve con la entidad {@link TodoEntity} guardada.
   */
  save(todo: TodoEntity): Promise<TodoEntity>
   /**
   * Elimina una tarea del repositorio.
   *
   * @param todo - Entidad {@link TodoEntity} que se va a eliminar.
   * @returns Una promesa que resuelve con un valor booleano indicando si la eliminación fue exitosa.
   */
  delete(todo: TodoEntity): Promise<boolean>
} 

