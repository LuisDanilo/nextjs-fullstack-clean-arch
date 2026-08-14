import { taskRepository } from '@/compositionRoot'
import { createHandlersCompleteTask } from '@/framework/features/complete-tasks/http/completeTask.controller'

export const PATCH = createHandlersCompleteTask(taskRepository).PATCH
