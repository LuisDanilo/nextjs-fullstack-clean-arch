import { describe, it, expect } from 'vitest'
import { createHandlersCompleteTask } from '@/framework/features/complete-tasks/http/completeTask.controller'
import { createMockRepository } from '@/test/mockTaskRepository'
import { NextRequest } from 'next/server'

describe('PATCH /api/tasks/complete', () => {
  it('completes a Task and returns 200', async () => {
    const mockRepo = createMockRepository()
    const date = new Date()
    const task = {
        id: '1', 
        title: 'Buy milk',
        description: 'Need milk for coffee',
        completed: false,
        createdAt: date, 
        subtasks: []
    }
    
    await mockRepo.save(task)

    const { PATCH } = createHandlersCompleteTask(mockRepo)
    const patchReq = new NextRequest('http://localhost/api/tasks/complete', {
      method: 'PATCH',
      body: JSON.stringify({ id: '1' }),
    })

    const res = await PATCH(patchReq)
    const body = await res.json()
    
    expect(res.status).toBe(200)
    expect(body).toEqual({ ...task, completed: true, createdAt: date.toISOString() })
  })

  it('returns 404 when Task does not exist', async () => {
    const mockRepo = createMockRepository()
    const { PATCH } = createHandlersCompleteTask(mockRepo)

    const req = new NextRequest('http://localhost/api/tasks/complete', {
      method: 'PATCH',
      body: JSON.stringify({ id: 'non-existent-id' }),
    })
    const res = await PATCH(req)
    expect(res.status).toBe(404)

    const body = await res.json()
    expect(body.error).toBe('Task not found')
  })

  it('returns 400 when Task is already completed', async () => {
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

    const { PATCH } = createHandlersCompleteTask(mockRepo)
    const firstPatch = new NextRequest('http://localhost/api/tasks/complete', {
      method: 'PATCH',
      body: JSON.stringify({ id : '1' }),
    })

    await PATCH(firstPatch)

    const secondPatch = new NextRequest('http://localhost/api/tasks/complete', {
      method: 'PATCH',
      body: JSON.stringify({ id: '1' }),
    })
    const res = await PATCH(secondPatch)
    const body = await res.json()
    
    expect(res.status).toBe(400)
    expect(body.error).toBe('Task is already marked as completed')
  })

  it('returns 500 when repository fails', async () => {
    const mockRepo = createMockRepository({
      getById: async () => { throw new Error('DB connection failed') },
    })
    const { PATCH } = createHandlersCompleteTask(mockRepo)

    const req = new NextRequest('http://localhost/api/tasks/complete', {
      method: 'PATCH',
      body: JSON.stringify({ id: 'any-id' }),
    })
    const res = await PATCH(req)
    const body = await res.json()
    
    expect(res.status).toBe(500)
    expect(body.error).toBe('Error completing Task')
  })
})

