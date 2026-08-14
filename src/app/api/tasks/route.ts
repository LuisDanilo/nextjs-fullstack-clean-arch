import { taskRepository } from '@/compositionRoot'
import { createHandlersCreateTask } from '@/framework/features/create-tasks/http/createTask.controller'
import { createHandlersGetTasks } from '@/framework/features/list-tasks/http/getTasks.controller'

export const GET = createHandlersGetTasks(taskRepository).GET
export const POST = createHandlersCreateTask(taskRepository).POST
