'use server'

import { createTodoUseCase } from '@/core/features/create-todos/application/createTodo.useCase'
import { todoRepository } from '@/compositionRoot'
import { runTodoAction } from '@/framework/shared/runTodoAction'
import type { TodoActionResult } from '@/framework/shared/runTodoAction'

export async function createTodo(_prevState: TodoActionResult, formData: FormData) {
  return runTodoAction(
    () =>
      createTodoUseCase(todoRepository).execute({
        title: formData.get('title')?.toString() ?? '',
        description: formData.get('description')?.toString() ?? ''
      }),
    'Todo creado',
    '/'
  )
}
