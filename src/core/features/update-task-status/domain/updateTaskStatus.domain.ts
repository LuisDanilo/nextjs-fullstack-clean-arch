import { DomainError } from '@/core/shared/domain/DomainError'
import { TaskEntity } from '@/core/shared/domain/Task.entity'
import { TaskStatus } from '@/core/shared/domain/TaskStatus'

/**
 * Función que actualiza el estado de una tarea.
 * Cualquier estado puede transicionar a cualquier otro, excepto que no se puede
 * marcar como hecha una tarea que tenga subtareas sin completar.
 *
 * @param task - La entidad {@link TaskEntity} a actualizar.
 * @param newStatus - El nuevo estado {@link TaskStatus} de la tarea.
 * @returns La entidad {@link TaskEntity} actualizada.
 * @throws {DomainError} Si la tarea tiene subtareas incompletas y se intenta marcar como hecha.
 */
export function updateTaskStatus(task: TaskEntity, newStatus: TaskStatus): TaskEntity {
  if (newStatus === 'done') {
    const hasIncompleteSubtasks = task.subtasks.some(subtask => subtask.status !== 'done')

    if (hasIncompleteSubtasks) {
      throw new DomainError('Cannot mark Task as done because it has incomplete subtasks')
    }
  }

  if (newStatus === task.status) {
    return task
  }

  return {
    ...task,
    status: newStatus
  }
}
