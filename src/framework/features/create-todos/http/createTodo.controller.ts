import { createTodoUseCase } from '@/core/features/create-todos/application/createTodo.useCase'
import { TodoRepository } from '@/core/shared/domain/Todo.repository'
import { NextRequest, NextResponse } from 'next/server'
import { toHttpError } from '@/framework/shared/http/httpErrorMapper'

export function createHandlersCreateTodo(todoRepository: TodoRepository) {
  async function POST(request: NextRequest) {
    const body = await request.json()

    try {
      const useCase = createTodoUseCase(todoRepository)
      const todo = await useCase.execute({ title: body.title, description: body.description })

      return NextResponse.json(todo, { status: 201 })
    } catch (error) {
      const { status, body: errorBody } = toHttpError(error)
      return NextResponse.json(errorBody, { status })
    }
  }

  return { POST }
}
