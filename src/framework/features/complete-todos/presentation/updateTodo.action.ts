'use server'

import { completeTodoUseCase } from '@/core/features/complete-todos/application/completeTodo.useCase'
import { todoRepository } from '@/compositionRoot'
import { runTodoAction } from '@/framework/shared/runTodoAction'

export async function completeTodo(formData: FormData) {
  return runTodoAction(() =>
    completeTodoUseCase(todoRepository).execute(formData.get('id')?.toString() ?? '')
  )
}
