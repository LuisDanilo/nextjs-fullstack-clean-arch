import { completeTaskUseCase } from '@/core/features/complete-tasks/application/completeTask.useCase'
import { TaskRepository } from '@/core/shared/domain/Task.repository'
import { NextRequest, NextResponse } from 'next/server'
import { toHttpError } from '@/framework/shared/http/httpErrorMapper'

export function createHandlersCompleteTask(taskRepository: TaskRepository) {
  async function PATCH(request: NextRequest) {
    const body = await request.json()

    try {
      const useCase = completeTaskUseCase(taskRepository)
      const task = await useCase.execute(body.id)

      return NextResponse.json(task)
    } catch (error) {
      const { status, body: errorBody } = toHttpError(error)
      return NextResponse.json(errorBody, { status })
    }
  }

  return { PATCH }
}
