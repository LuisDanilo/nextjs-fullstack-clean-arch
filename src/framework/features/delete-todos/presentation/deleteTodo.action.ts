'use server'

import { deleteTodoUseCase } from '@/core/features/delete-todos/application/deleteTodo.useCase'
import { todoRepository } from '@/compositionRoot'
import { runTodoAction } from '@/framework/shared/runTodoAction'

export async function deleteTodo(formData: FormData) {
  return runTodoAction(() =>
    deleteTodoUseCase(todoRepository).execute(formData.get('id')?.toString() ?? '')
  )
}
