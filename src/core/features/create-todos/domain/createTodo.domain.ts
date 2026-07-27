import { DomainError } from '@/core/shared/domain/DomainError'
import { TodoEntity } from '@/core/shared/domain/Todo.entity'

/**
 * Tipo que representa los datos necesarios para crear una nueva tarea. 
 */
export type CreateTodoData = Pick<TodoEntity, 'title' | 'description'>

/**
 * Función que crea una nueva tarea con los datos proporcionados.
 * Por defecto una tarea es creada como incompleta, sin subtareas y con una fecha de creación actual.
 *
 * @param data - Los datos necesarios para crear una nueva tarea.
 * @returns La nueva entidad {@link TodoEntity} creada.
 */
export function createTodo(data: CreateTodoData): TodoEntity {
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

