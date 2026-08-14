import { listTasksUseCase } from '@/core/features/list-tasks/application/listTasks.useCase'
import { TaskRepository } from '@/core/shared/domain/Task.repository'
import { NextRequest, NextResponse } from 'next/server'
import { toHttpError } from '@/framework/shared/http/httpErrorMapper'

export function createHandlersGetTasks(taskRepository: TaskRepository) {
  async function GET(request: NextRequest) {
    const params = Object.fromEntries(new URL(request.url).searchParams)

    try {
      const useCase = listTasksUseCase(taskRepository)
      const tasks = await useCase.execute(params)

      return NextResponse.json(tasks)
    } catch (error) {
      const { status, body } = toHttpError(error)
      return NextResponse.json(body, { status })
    }
  }

  return { GET }
}
