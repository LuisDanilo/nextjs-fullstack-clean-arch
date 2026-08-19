import { updateTaskStatusUseCase } from '@/core/features/update-task-status/application/updateTaskStatus.useCase'
import { TaskRepository } from '@/core/shared/domain/Task.repository'
import { NextRequest, NextResponse } from 'next/server'
import { toHttpError } from '@/framework/shared/http/httpErrorMapper'

export function createHandlersUpdateTaskStatus(taskRepository: TaskRepository) {
  async function PATCH(request: NextRequest) {
    const body = await request.json()

    try {
      const useCase = updateTaskStatusUseCase(taskRepository)
      const task = await useCase.execute(body.id, body.status)

      return NextResponse.json(task)
    } catch (error) {
      const { status, body: errorBody } = toHttpError(error)
      return NextResponse.json(errorBody, { status })
    }
  }

  return { PATCH }
}
