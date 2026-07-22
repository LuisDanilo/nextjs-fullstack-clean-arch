import { DomainError } from './DomainError'

/**
 * Interfaz que representa una tarea.
 */
export interface TodoEntity {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: Date
  subtasks: Array<TodoEntity>
}

/**
 * Función que aplica las reglas de negocio para marcar una tarea como completada.
 * Valida que la tarea no esté ya marcada como completada y que no tenga subtareas incompletas. 
 * Lanza un error si la tarea ya está marcada como completada o si tiene subtareas incompletas.
 *
 * @param todo - El {@link TodoEntity} a marcar como completado. 
 * @returns boolean - true si el {@link TodoEntity} puede ser marcado como completado, false en caso contrario.
 * @throws {DomainError} - Si el {@link TodoEntity} ya está marcado como completado o si tiene subtareas incompletas.
 */
export function completeTodo(todo: TodoEntity): TodoEntity {
  const isMarkedAsCompleted = todo.completed
  const hasSubtasks = todo.subtasks && todo.subtasks.length > 0
  const hasIncompleteSubtasks = hasSubtasks && todo.subtasks!.some(subtask => !subtask.completed)

  if (isMarkedAsCompleted) {
    throw new DomainError('Todo is already marked as completed')
  }

  if (hasIncompleteSubtasks) {
    throw new DomainError('Cannot mark Todo as completed because it has incomplete subtasks')
  }

  return {
    ...todo,
    completed: true
  }
}

/**
 * Interfaz que define los datos necesarios para crear una nueva tarea.
 */
export type CreateTodoData = Pick<TodoEntity, 'title' | 'description'>

/**
 * Función que aplica las reglas de negocio para la creación de una nueva tarea.
 * Valida que el título y la descripción no estén vacíos y que la descripción tenga al menos 10 caracteres.
 * Lanza un error si alguna de las validaciones falla.
 *
 * @param data - Los datos necesarios para crear un nuevo {@link TodoEntity}.
 * @returns - El nuevo {@link TodoEntity} creado.
 * @throws {DomainError} - Si el título o la descripción no cumplen con las reglas de negocio.
 */
export function createTodo(data: CreateTodoData):  TodoEntity {
  const { title, description } = data

  if (!title || !title.trim()) {
    throw new DomainError('Todo title cannot be empty')
  }

  if (!description || !description.trim() || description.length < 10) {
    throw new DomainError('Todo description must be at least 10 characters long')
  }

  return {
    id: crypto.randomUUID(),
    title,
    description,
    completed: false,
    createdAt: new Date(),
    subtasks: []
  }
}

