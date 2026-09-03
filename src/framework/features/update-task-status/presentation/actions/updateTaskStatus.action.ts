'use server'

import { taskRepository } from '@/compositionRoot'
import { updateTaskStatusUseCase } from '@/core/features/update-task-status/application/updateTaskStatus.useCase'
import { runTaskAction } from '@/framework/shared/runTaskAction'
import { type TaskActionResult } from '@/framework/shared/runTaskAction'

export async function updateTaskStatus(_prevState: TaskActionResult, formData: FormData) {
  return runTaskAction(
    () =>
      updateTaskStatusUseCase(taskRepository).execute(
        formData.get('id')?.toString() ?? '',
        formData.get('status')?.toString() ?? ''
      ),
    'statusUpdated',
    '/'
  )
}
