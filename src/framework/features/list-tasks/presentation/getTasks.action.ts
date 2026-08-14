'use server'

import { listTasksUseCase } from '@/core/features/list-tasks/application/listTasks.useCase'
import { taskRepository } from '@/compositionRoot'
import { toTaskDto } from './taskdto'

export async function getTasks() {
  try {
    const tasks = await listTasksUseCase(taskRepository).execute()
    return tasks.map(toTaskDto)
  } catch {
    return []
  }
}
