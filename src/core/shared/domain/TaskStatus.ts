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

export function isTaskStatus(value: unknown): value is TaskStatus {
  return typeof value === 'string' && (TASK_STATUSES as ReadonlyArray<string>).includes(value)
}
