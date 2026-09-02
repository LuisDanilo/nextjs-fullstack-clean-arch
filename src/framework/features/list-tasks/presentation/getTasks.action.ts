'use server'

import { taskRepository } from '@/compositionRoot'
import { listTasksUseCase } from '@/core/features/list-tasks/application/listTasks.useCase'
import { toTaskDto } from '@/framework/features/list-tasks/presentation/taskdto'

export async function getTasks() {
  try {
    const tasks = await listTasksUseCase(taskRepository).execute()
    return tasks.map(toTaskDto)
  } catch {
    return []
  }
}
