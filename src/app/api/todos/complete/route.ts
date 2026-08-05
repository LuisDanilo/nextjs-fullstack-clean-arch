import { todoRepository } from '@/compositionRoot'
import { createHandlersCompleteTodo } from '@/framework/features/complete-todos/http/completeTodo.controller'

export const PATCH = createHandlersCompleteTodo(todoRepository).PATCH