import { taskRepository } from '@/compositionRoot'
import { createHandlersDeleteTask } from '@/framework/features/delete-tasks/http/deleteTask.controller'

export const DELETE = createHandlersDeleteTask(taskRepository).DELETE
