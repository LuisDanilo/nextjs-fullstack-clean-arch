import { todoRepository } from '@/compositionRoot'
import { createHandlersDeleteTodo } from '@/framework/features/delete-todos/http/deleteTodo.controller'

export const DELETE = createHandlersDeleteTodo(todoRepository).DELETE
