'use server'

import { createTodoUseCase } from '@/core/features/create-todos/application/createTodo.useCase'
import { todoRepository } from '@/compositionRoot'
import { runTodoAction } from '@/framework/shared/runTodoAction'

export async function createTodo(formData: FormData) {
  return runTodoAction(() =>
    createTodoUseCase(todoRepository).execute({
      title: formData.get('title')?.toString() ?? '',
      description: formData.get('description')?.toString() ?? ''
    })
  )
}
