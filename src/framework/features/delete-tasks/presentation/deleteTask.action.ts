'use server'

import { taskRepository } from '@/compositionRoot'
import { deleteTaskUseCase } from '@/core/features/delete-tasks/application/deleteTask.useCase'
import { runTaskAction } from '@/framework/shared/runTaskAction'
import { type TaskActionResult } from '@/framework/shared/runTaskAction'

export async function deleteTask(_prevState: TaskActionResult, formData: FormData) {
  return runTaskAction(
    () => deleteTaskUseCase(taskRepository).execute(formData.get('id')?.toString() ?? ''),
    'taskDeleted',
    '/'
  )
}
