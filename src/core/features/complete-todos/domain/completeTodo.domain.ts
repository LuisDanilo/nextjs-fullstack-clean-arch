import { DomainError } from '@/core/shared/domain/DomainError'
import { TodoEntity } from '@/core/shared/domain/Todo.entity'

/**
 * Función que marca una tarea como completada.
 *
 * @param todo - La entidad {@link TodoEntity} a marcar como completada.
 * @returns La entidad {@link TodoEntity} marcada como completada.
 * @throws {DomainError} Si la tarea ya esta marcada como completada o tiene subtareas incompletas.
 */
export function completeTodo(todo: TodoEntity): TodoEntity {
  if (todo.completed) {
    throw new DomainError('Todo is already marked as completed')
  }

  const hasIncompleteSubtasks = todo.subtasks.some(subtask => !subtask.completed)

  if (hasIncompleteSubtasks) {
    throw new DomainError('Cannot mark Todo as completed because it has incomplete subtasks')
  }

  return {
    ...todo,
    completed: true
  }
}
