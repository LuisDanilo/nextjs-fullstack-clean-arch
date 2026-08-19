import { taskRepository } from '@/compositionRoot'
import { createHandlersUpdateTaskStatus } from '@/framework/features/update-task-status/http/updateTaskStatus.controller'

export const PATCH = createHandlersUpdateTaskStatus(taskRepository).PATCH
