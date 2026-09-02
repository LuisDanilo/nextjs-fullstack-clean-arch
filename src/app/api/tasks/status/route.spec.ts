import { NextRequest } from 'next/server'
import { describe, expect,it } from 'vitest'

import { createHandlersUpdateTaskStatus } from '@/framework/features/update-task-status/http/updateTaskStatus.controller'
import { createMockRepository } from '@/test/mockTaskRepository'

describe('PATCH /api/tasks/status', () => {
  it('updates a Task status and returns 200', async () => {
    const mockRepo = createMockRepository()
    const date = new Date()
    const task = {
        id: '1', 
        title: 'Buy milk',
        description: 'Need milk for coffee',
        status: 'pending' as const,
        createdAt: date, 
        subtasks: []
    }
    
    await mockRepo.save(task)

    const { PATCH } = createHandlersUpdateTaskStatus(mockRepo)
    const patchReq = new NextRequest('http://localhost/api/tasks/status', {
      method: 'PATCH',
      body: JSON.stringify({ id: '1', status: 'in-progress' }),
    })

    const res = await PATCH(patchReq)
    const body = await res.json()
    
    expect(res.status).toBe(200)
    expect(body).toEqual({ ...task, status: 'in-progress', createdAt: date.toISOString() })
  })

  it('returns 404 when Task does not exist', async () => {
    const mockRepo = createMockRepository()
    const { PATCH } = createHandlersUpdateTaskStatus(mockRepo)

    const req = new NextRequest('http://localhost/api/tasks/status', {
      method: 'PATCH',
      body: JSON.stringify({ id: 'non-existent-id', status: 'done' }),
    })
    const res = await PATCH(req)
    expect(res.status).toBe(404)

    const body = await res.json()
    expect(body.error).toBe('Task not found')
  })

  it('returns 400 when status is invalid', async () => {
    const mockRepo = createMockRepository()
    const { PATCH } = createHandlersUpdateTaskStatus(mockRepo)

    const req = new NextRequest('http://localhost/api/tasks/status', {
      method: 'PATCH',
      body: JSON.stringify({ id: 'any-id', status: 'invalid' }),
    })
    const res = await PATCH(req)
    expect(res.status).toBe(400)

    const body = await res.json()
    expect(body.error).toBe('Invalid status')
  })

  it('returns 400 when marking a Task with incomplete subtasks as done', async () => {
    const mockRepo = createMockRepository()
    const task = {
        id: '1', 
        title: 'Buy milk',
        description: 'Need milk for coffee',
        status: 'pending' as const,
        createdAt: new Date(),
        subtasks: [{
          id: '2',
          title: 'Subtask',
          description: 'A valid description here',
          status: 'pending' as const,
          createdAt: new Date(),
          subtasks: []
        }]
    }
    
    await mockRepo.save(task)

    const { PATCH } = createHandlersUpdateTaskStatus(mockRepo)
    const patchReq = new NextRequest('http://localhost/api/tasks/status', {
      method: 'PATCH',
      body: JSON.stringify({ id: '1', status: 'done' }),
    })
    const res = await PATCH(patchReq)
    const body = await res.json()
    
    expect(res.status).toBe(400)
    expect(body.error).toBe('Cannot mark Task as done because it has incomplete subtasks')
  })

  it('returns 500 when repository fails', async () => {
    const mockRepo = createMockRepository({
      getById: async () => { throw new Error('DB connection failed') },
    })
    const { PATCH } = createHandlersUpdateTaskStatus(mockRepo)

    const req = new NextRequest('http://localhost/api/tasks/status', {
      method: 'PATCH',
      body: JSON.stringify({ id: 'any-id', status: 'done' }),
    })
    const res = await PATCH(req)
    const body = await res.json()
    
    expect(res.status).toBe(500)
    expect(body.error).toBe('Error updating Task status')
  })

  it('returns 500 when the request body is invalid JSON', async () => {
    const mockRepo = createMockRepository()
    const { PATCH } = createHandlersUpdateTaskStatus(mockRepo)

    const req = new NextRequest('http://localhost/api/tasks/status', {
      method: 'PATCH',
      body: '{invalid json',
    })
    const res = await PATCH(req)
    const body = await res.json()

    expect(res.status).toBe(500)
    expect(body.error).toBe('Internal server error')
  })
})
