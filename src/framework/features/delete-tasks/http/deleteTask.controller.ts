import { deleteTaskUseCase } from '@/core/features/delete-tasks/application/deleteTask.useCase'
import { TaskRepository } from '@/core/shared/domain/Task.repository'
import { NextRequest, NextResponse } from 'next/server'
import { toHttpError } from '@/framework/shared/http/httpErrorMapper'

export function createHandlersDeleteTask(taskRepository: TaskRepository) {
  async function DELETE(request: NextRequest) {
    const body = await request.json()

    try {
      const useCase = deleteTaskUseCase(taskRepository)
      const result = await useCase.execute(body.id)

      return NextResponse.json({ success: result }, { status: result ? 200 : 500 })
    } catch (error) {
      const { status, body: errorBody } = toHttpError(error)
      return NextResponse.json(errorBody, { status })
    }
  }

  return { DELETE }
}
