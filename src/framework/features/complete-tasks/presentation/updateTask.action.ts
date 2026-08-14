'use server'

import { completeTaskUseCase } from '@/core/features/complete-tasks/application/completeTask.useCase'
import { taskRepository } from '@/compositionRoot'
import { runTaskAction } from '@/framework/shared/runTaskAction'
import type { TaskActionResult } from '@/framework/shared/runTaskAction'

export async function completeTask(_prevState: TaskActionResult, formData: FormData) {
  return runTaskAction(
    () => completeTaskUseCase(taskRepository).execute(formData.get('id')?.toString() ?? ''),
    'Tarea completada',
    '/'
  )
}
