import { createTaskUseCase } from '@/core/features/create-tasks/application/createTask.useCase'
import { type TaskRepository } from '@/core/shared/domain/Task.repository'
import { type NextRequest, NextResponse } from 'next/server'
import { toHttpError } from '@/framework/shared/http/httpErrorMapper'

export function createHandlersCreateTask(taskRepository: TaskRepository) {
  async function POST(request: NextRequest) {
    const body = await request.json()

    try {
      const useCase = createTaskUseCase(taskRepository)
      const task = await useCase.execute({ title: body.title, description: body.description })

      return NextResponse.json(task, { status: 201 })
    } catch (error) {
      const { status, body: errorBody } = toHttpError(error)
      return NextResponse.json(errorBody, { status })
    }
  }

  return { POST }
}
