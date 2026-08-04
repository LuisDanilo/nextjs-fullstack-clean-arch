import { deleteTodoUseCase } from '@/core/features/delete-todos/application/deleteTodo.useCase'
import { inMemoryTodoRepository } from '@/core/shared/infrastructure/inMemoryTodoRepository'
import { TodoRepository } from '@/core/shared/domain/Todo.repository'
import { NextRequest, NextResponse } from 'next/server'
import { toHttpError } from '../../_utils/httpErrorMapper'


/**
 * Función que crea los controladores del endpoint para eliminar una tarea
 * @param todoRepository Repositorio de tareas
 * @returns Controladores del endpoint
 */
export function createHandlersDeleteTodo(todoRepository: TodoRepository = inMemoryTodoRepository()) {
  async function DELETE(request: NextRequest) {
    const body = await request.json()

    try {
      const useCase = deleteTodoUseCase(todoRepository)
      const result = await useCase.execute(body.id)

      return NextResponse.json({ success: result }, { status: result ? 200 : 500 })
    } catch (error) {
      const { status, body } = toHttpError(error)
      return NextResponse.json(body, { status })
    }
  }

  return { DELETE }
}

const handlers = createHandlersDeleteTodo()
export const DELETE = handlers.DELETE
