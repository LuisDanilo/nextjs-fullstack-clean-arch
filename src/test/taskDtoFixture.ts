import { type TaskStatus } from '@/core/shared/domain/TaskStatus'
import { type TaskDto } from '@/framework/features/list-tasks/presentation/taskdto'

export function makeTask(overrides: Partial<TaskDto> = {}): TaskDto {
  return {
    id: '1',
    title: 'Comprar leche',
    description: 'Comprar leche en el supermercado',
    status: 'pending',
    createdAt: '2026-01-01T00:00:00.000Z',
    subtasks: [],
    ...overrides,
  }
}

export function makeSubtask(overrides: Partial<TaskDto> = {}): TaskDto {
  return makeTask({
    id: '2',
    title: 'Subtarea',
    description: 'Descripción de la subtarea',
    status: 'done',
    ...overrides,
  })
}

export function makeTasks(): Array<TaskDto> {
  return [
    makeTask(),
    makeTask({
      id: '2',
      title: 'Revisar PR',
      description: 'Revisar el pull request pendiente',
      status: 'in-progress',
    }),
    makeTask({
      id: '3',
      title: 'Desplegar',
      description: 'Desplegar la aplicación a producción',
      status: 'done',
      subtasks: [makeSubtask()],
    }),
  ]
}

export const statuses: Array<TaskStatus> = ['pending', 'in-progress', 'review', 'blocked', 'done']
