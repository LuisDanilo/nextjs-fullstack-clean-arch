/**
 * Tipos de estado que puede tener una tarea.
 */
export type TaskStatus = 'pending' | 'in-progress' | 'review' | 'blocked' | 'done'

export const TASK_STATUSES: ReadonlyArray<TaskStatus> = [
  'pending',
  'in-progress',
  'review',
  'blocked',
  'done'
]

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  pending: 'Pendiente',
  'in-progress': 'En progreso',
  review: 'En revisión',
  blocked: 'Bloqueada',
  done: 'Hecha'
}

export function isTaskStatus(value: unknown): value is TaskStatus {
  return typeof value === 'string' && (TASK_STATUSES as ReadonlyArray<string>).includes(value)
}
