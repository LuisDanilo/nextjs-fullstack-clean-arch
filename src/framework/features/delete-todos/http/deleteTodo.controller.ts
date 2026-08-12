import { deleteTodoUseCase } from '@/core/features/delete-todos/application/deleteTodo.useCase'
import { TodoRepository } from '@/core/shared/domain/Todo.repository'
import { NextRequest, NextResponse } from 'next/server'
import { toHttpError } from '@/framework/shared/http/httpErrorMapper'

export function createHandlersDeleteTodo(todoRepository: TodoRepository) {
  async function DELETE(request: NextRequest) {
    const body = await request.json()

    try {
      const useCase = deleteTodoUseCase(todoRepository)
      const result = await useCase.execute(body.id)

      return NextResponse.json({ success: result }, { status: result ? 200 : 500 })
    } catch (error) {
      const { status, body: errorBody } = toHttpError(error)
      return NextResponse.json(errorBody, { status })
    }
  }

  return { DELETE }
}
