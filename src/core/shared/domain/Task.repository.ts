import { TaskEntity } from './Task.entity'
import { TaskStatus } from './TaskStatus'

/**
 * Interfaz que define los filtros que se pueden aplicar al obtener las tareas.
 */
export interface GetTasksFilters {
  status?: TaskStatus
  search?: string
  startDate?: Date
  endDate?: Date
}


/**
 * Interfaz que define los métodos que debe implementar un repositorio de tareas.
 * Cualquier repositorio de tareas debe poder realizar estas acciones de persistencia.
 */
export interface TaskRepository {
  /**
   * Busca tareas según los filtros proporcionados.
   *
   * @param filters - Objeto que contiene los filtros para la búsqueda de tareas.
   * @returns Una promesa que resuelve con un arreglo de entidades {@link TaskEntity} que coinciden con los filtros.
   */
  find(filters: GetTasksFilters): Promise<Array<TaskEntity>>
  /**
   * Obtiene todas las tareas almacenadas en memoria.
   *
   * @returns Una promesa que resuelve con un arreglo de entidades {@link TaskEntity} 
   */
  getAll(): Promise<Array<TaskEntity>>
  /**
   * Obtiene una tarea por su ID.
   *
   * @param id - Identificador de la tarea a buscar.
   * @returns Una promesa que resuelve con la entidad {@link TaskEntity} correspondiente al ID proporcionado, o `null` si no se encuentra.
   */
  getById(id: string): Promise<TaskEntity | null>
  /**
   * Guarda una tarea en el repositorio.
   *
   * @param task - Entidad {@link TaskEntity} que se va a guardar.
   * @returns Una promesa que resuelve con la entidad {@link TaskEntity} guardada.
   */
  save(task: TaskEntity): Promise<TaskEntity>
   /**
   * Elimina una tarea del repositorio.
   *
   * @param task - Entidad {@link TaskEntity} que se va a eliminar.
   * @returns Una promesa que resuelve con un valor booleano indicando si la eliminación fue exitosa.
   */
  delete(task: TaskEntity): Promise<boolean>
} 

