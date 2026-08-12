import { listTodosUseCase } from '@/core/features/list-todos/application/listTodos.useCase'
import { TodoRepository } from '@/core/shared/domain/Todo.repository'
import { NextRequest, NextResponse } from 'next/server'
import { toHttpError } from '@/framework/shared/http/httpErrorMapper'

export function createHandlersGetTodos(todoRepository: TodoRepository) {
  async function GET(request: NextRequest) {
    const params = Object.fromEntries(new URL(request.url).searchParams)

    try {
      const useCase = listTodosUseCase(todoRepository)
      const todos = await useCase.execute(params)

      return NextResponse.json(todos)
    } catch (error) {
      const { status, body } = toHttpError(error)
      return NextResponse.json(body, { status })
    }
  }

  return { GET }
}
