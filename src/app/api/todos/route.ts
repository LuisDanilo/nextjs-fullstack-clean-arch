import { createTodoUseCase } from '@/core/features/create-todos/application/createTodo.useCase'
import { listTodosUseCase } from '@/core/features/list-todos/application/listTodos.useCase'
import { inMemoryTodoRepository } from '@/core/shared/infrastructure/inMemoryTodoRepository'
import { TodoRepository } from '@/core/shared/domain/Todo.repository'
import { NextRequest, NextResponse } from 'next/server'
import { toHttpError } from '../_utils/httpErrorMapper'

/**
 * Función que crea los controladores del endpoint para ara crear una tarea.
 * @param todoRepository Repositorio de tareas.
 * @returns Controladores del endpoint.
 */
export function createHandlersCreateTodo(todoRepository: TodoRepository = inMemoryTodoRepository()) {
  async function POST(request: NextRequest) {
    const body = await request.json()

    try {
      const useCase = createTodoUseCase(todoRepository)
      const todo = await useCase.execute({ title: body.title, description: body.description })

      return NextResponse.json(todo, { status: 201 })
    } catch (error) {
      const { status, body } = toHttpError(error)
      return NextResponse.json(body, { status })
    }
  }

  return { POST }
}

/**
 * Función que crea los controladores del endpoint para listar las tareas.
 * @param todoRepository Repositorio de tareas.
 * @returns Controladores del endpoint.
 */
export function createHandlersGetTodos(todoRepository: TodoRepository = inMemoryTodoRepository()) {
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

const createTodoHandlers = createHandlersCreateTodo()
const getTodosHandlers = createHandlersGetTodos()
export const GET = getTodosHandlers.GET
export const POST = createTodoHandlers.POST
