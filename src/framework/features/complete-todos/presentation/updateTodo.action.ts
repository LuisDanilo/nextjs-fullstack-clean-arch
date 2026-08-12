'use server'

import { completeTodoUseCase } from '@/core/features/complete-todos/application/completeTodo.useCase'
import { todoRepository } from '@/compositionRoot'
import { runTodoAction } from '@/framework/shared/runTodoAction'
import type { TodoActionResult } from '@/framework/shared/runTodoAction'

export async function completeTodo(_prevState: TodoActionResult, formData: FormData) {
  return runTodoAction(
    () => completeTodoUseCase(todoRepository).execute(formData.get('id')?.toString() ?? ''),
    'Todo completado',
    '/'
  )
}
