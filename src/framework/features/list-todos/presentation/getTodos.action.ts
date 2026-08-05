'use server'

import { listTodosUseCase } from '@/core/features/list-todos/application/listTodos.useCase'
import { todoRepository } from '@/compositionRoot'
import { toTodoDto } from './tododto'

export async function getTodos() {
  try {
    const todos = await listTodosUseCase(todoRepository).execute()
    return todos.map(toTodoDto)
  } catch {
    return []
  }
}