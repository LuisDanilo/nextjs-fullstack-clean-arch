import { DomainError } from '@/core/shared/domain/DomainError'
import { TaskEntity } from '@/core/shared/domain/Task.entity'

/**
 * Función que marca una tarea como completada.
 *
 * @param task - La entidad {@link TaskEntity} a marcar como completada.
 * @returns La entidad {@link TaskEntity} marcada como completada.
 * @throws {DomainError} Si la tarea ya esta marcada como completada o tiene subtareas incompletas.
 */
export function completeTask(task: TaskEntity): TaskEntity {
  if (task.completed) {
    throw new DomainError('Task is already marked as completed')
  }

  const hasIncompleteSubtasks = task.subtasks.some(subtask => !subtask.completed)

  if (hasIncompleteSubtasks) {
    throw new DomainError('Cannot mark Task as completed because it has incomplete subtasks')
  }

  return {
    ...task,
    completed: true
  }
}
