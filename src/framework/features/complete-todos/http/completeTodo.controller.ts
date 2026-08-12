import { completeTodoUseCase } from '@/core/features/complete-todos/application/completeTodo.useCase'
import { TodoRepository } from '@/core/shared/domain/Todo.repository'
import { NextRequest, NextResponse } from 'next/server'
import { toHttpError } from '@/framework/shared/http/httpErrorMapper'

export function createHandlersCompleteTodo(todoRepository: TodoRepository) {
  async function PATCH(request: NextRequest) {
    const body = await request.json()

    try {
      const useCase = completeTodoUseCase(todoRepository)
      const todo = await useCase.execute(body.id)

      return NextResponse.json(todo)
    } catch (error) {
      const { status, body: errorBody } = toHttpError(error)
      return NextResponse.json(errorBody, { status })
    }
  }

  return { PATCH }
}
