import { TaskEntity } from '@/core/shared/domain/Task.entity'

export interface TaskDto {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
  subtasks: Array<TaskDto>
}

export function toTaskDto(task: TaskEntity): TaskDto {
  return {
    ...task,
    createdAt: task.createdAt.toISOString(),
    subtasks: task.subtasks.map(toTaskDto)
  }
}
