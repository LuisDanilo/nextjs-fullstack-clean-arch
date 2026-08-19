import { TaskEntity } from '@/core/shared/domain/Task.entity'
import { TaskStatus } from '@/core/shared/domain/TaskStatus'

export interface TaskDto {
  id: string
  title: string
  description: string
  status: TaskStatus
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
