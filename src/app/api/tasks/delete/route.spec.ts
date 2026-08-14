import { describe, it, expect } from 'vitest'
import { createHandlersDeleteTask } from '@/framework/features/delete-tasks/http/deleteTask.controller'
import { createMockRepository } from '@/test/mockTaskRepository'
import { NextRequest } from 'next/server'

describe('DELETE /api/tasks/delete', () => {
  it('deletes a Task and returns success', async () => {
    const mockRepo = createMockRepository()
    const task = {
      id: '1', 
      title: 'Buy milk', 
      description: 'Need milk for coffee', 
      completed: false, 
      createdAt: new Date(),
      subtasks: []
    }

    await mockRepo.save(task)

    const { DELETE } = createHandlersDeleteTask(mockRepo)
    const deleteReq = new NextRequest('http://localhost/api/tasks/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id: '1' }),
    })
    const res = await DELETE(deleteReq)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.success).toBe(true)
  })

  it('returns 404 when Task does not exist', async () => {
    const mockRepo = createMockRepository()
    const { DELETE } = createHandlersDeleteTask(mockRepo)

    const req = new NextRequest('http://localhost/api/tasks/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id: 'non-existent-id' }),
    })
    const res = await DELETE(req)
    const body = await res.json()

    expect(res.status).toBe(404)
    expect(body.error).toBe('Task not found')
  })

  it('returns 500 when repository fails', async () => {
    const mockRepo = createMockRepository({
      getById: async () => { throw new Error('DB connection failed') },
    })
    const { DELETE } = createHandlersDeleteTask(mockRepo)

    const req = new NextRequest('http://localhost/api/tasks/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id: 'any-id' }),
    })
    const res = await DELETE(req)
    const body = await res.json()

    expect(res.status).toBe(500)
    expect(body.error).toBe('Error deleting Task')
  })
})
