/**
 * Interfaz que representa un TodoEntity.
 * Un TodoEntity es un objeto que representa una tarea pendiente en una lista de tareas.
 */
export interface TodoEntity {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

/**
 * Función que valida regla de negocio: El título de un Todo no puede estar vacío. 
 * Lanza un error si el título es invalido. 
 *
 * @param title - El título del Todo a validar.
 * @throws Error - Si el título es invalido.
 */
function assertValidTodoTitle(title: string): void {
  if (!title || !title.trim()) {
    throw new Error('Todo title cannot be empty')
  }
}

/**
 * Funcion que crea un nuevo TodoEntity.
 * Lanza un error si el título es invalido.
 *
 * @param title - El título del nuevo Todo.
 * @returns Un nuevo objeto TodoEntity.
 * @see assertValidTodoTitle
 * @see TodoEntity
 * @throws Error - Si el título es invalido.
 */
export function createTodoEntity(title: string): TodoEntity {
  assertValidTodoTitle(title)
  return {
    id: crypto.randomUUID(),
    title: title.trim(),
    completed: false,
    createdAt: new Date(),
  }
}

