import { type NextRequest, NextResponse } from 'next/server'

import { updateTaskStatusUseCase } from '@/core/features/update-task-status/application/updateTaskStatus.useCase'
import { type TaskRepository } from '@/core/shared/domain/Task.repository'
import { toHttpError } from '@/framework/shared/http/httpErrorMapper'

export function createHandlersUpdateTaskStatus(taskRepository: TaskRepository) {
  async function PATCH(request: NextRequest) {
    try {
      const body = await request.json()

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
