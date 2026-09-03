'use server'

import { taskRepository } from '@/compositionRoot'
import { createTaskUseCase } from '@/core/features/create-tasks/application/createTask.useCase'
import { runTaskAction } from '@/framework/shared/runTaskAction'
import { type TaskActionResult } from '@/framework/shared/runTaskAction'

export async function createTask(_prevState: TaskActionResult, formData: FormData) {
  return runTaskAction(
    () =>
      createTaskUseCase(taskRepository).execute({
        title: formData.get('title')?.toString() ?? '',
        description: formData.get('description')?.toString() ?? ''
      }),
    'taskCreated',
    '/'
  )
}
