import { completeTodoUseCase } from '@/core/features/complete-todos/application/completeTodo.useCase'
import { inMemoryTodoRepository } from '@/core/shared/infrastructure/inMemoryTodoRepository'
import { TodoRepository } from '@/core/shared/domain/Todo.repository'
import { NextRequest, NextResponse } from 'next/server'
import { toHttpError } from '../../_utils/httpErrorMapper'


/**
 * Función que crea los controladores del endpoint para completar una tarea.
 * @param todoRepository Repositorio de tareas
 * @returns Controladores del endpoint
 */
export function createHandlersCompleteTodoRoute(todoRepository: TodoRepository = inMemoryTodoRepository()) {
  async function PATCH(request: NextRequest) {
    const body = await request.json()

    try {
      const useCase = completeTodoUseCase(todoRepository)
      const todo = await useCase.execute(body.id)

      return NextResponse.json(todo)
    } catch (error) {
      const { status, body } = toHttpError(error)
      return NextResponse.json(body, { status })
    }
  }

  return { PATCH }
}

const handlers = createHandlersCompleteTodoRoute()
export const PATCH = handlers.PATCH
