'use server'

import { deleteTaskUseCase } from '@/core/features/delete-tasks/application/deleteTask.useCase'
import { taskRepository } from '@/compositionRoot'
import { runTaskAction } from '@/framework/shared/runTaskAction'
import type { TaskActionResult } from '@/framework/shared/runTaskAction'

export async function deleteTask(_prevState: TaskActionResult, formData: FormData) {
  return runTaskAction(
    () => deleteTaskUseCase(taskRepository).execute(formData.get('id')?.toString() ?? ''),
    'Tarea eliminada',
    '/'
  )
}
