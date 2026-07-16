/**
 * Interfaz que representa un TodoEntity.
 * Un TodoEntity es un objeto que representa una tarea de una lista de tareas.
 */
export interface TodoEntity {
  id: string
  title: string
  completed: boolean
  createdAt: Date
  subtasks?: Array<TodoEntity>
}

/**
 * Función que valida regla de negocio: El título de una tarea no puede estar vacío. 
 * Lanza un error si el título es invalido. 
 *
 * @param title - El título del Todo a validar.
 * @throws Error - Si el título es invalido.
 */
function isValidTodoTitle(title: string): void {
  if (!title || !title.trim()) {
    throw new Error('Todo title cannot be empty')
  }
}

/**
 * Función que valida si un TodoEntity puede ser marcado como completado.
 * Lanza un error si el TodoEntity ya está marcado como completado o si tiene subtareas incompletas.
 *
 * @param todo - El TodoEntity a validar.
 * @throws Error - Si el TodoEntity ya está marcado como completado o si tiene subtareas incompletas.
 */
function canTodoBeCompleted(todo: TodoEntity): void {
  const isMarkedAsCompleted = todo.completed
  const hasSubtasks = todo.subtasks && todo.subtasks.length > 0
  const hasIncompleteSubtasks = hasSubtasks && todo.subtasks!.some(subtask => !subtask.completed)

  if (isMarkedAsCompleted) {
    throw new Error('Todo is already marked as completed')
  }

  if (hasIncompleteSubtasks) {
    throw new Error('Cannot mark Todo as completed because it has incomplete subtasks')
  }
}

/**
 * Funcion que crea un nuevo TodoEntity.
 * Lanza un error si el título es invalido.
 *
 * @param title - El título de la nueva tarea.
 * @returns Un nuevo objeto TodoEntity.
 * @see isValidTodoTitle
 * @see TodoEntity
 * @throws Error - Si el título es invalido.
 */
// export function createTodoEntity(title: string): TodoEntity {
//   isValidTodoTitle(title)
//   return {
//     id: crypto.randomUUID(),
//     title: title.trim(),
//     completed: false,
//     createdAt: new Date(),
//   }
// }

