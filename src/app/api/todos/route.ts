import { todoRepository } from '@/compositionRoot'
import { createHandlersCreateTodo } from '@/framework/features/create-todos/http/createTodo.controller'
import { createHandlersGetTodos } from '@/framework/features/list-todos/http/getTodos.controller'

export const GET = createHandlersGetTodos(todoRepository).GET
export const POST = createHandlersCreateTodo(todoRepository).POST