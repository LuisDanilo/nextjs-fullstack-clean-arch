import { describe, it, expect } from 'vitest'
import { createHandlersCompleteTodoRoute } from './route'
import { createMockRepository } from '@/test/mockTodoRepository'
import { NextRequest } from 'next/server'

describe('PATCH /api/todos/complete', () => {
  it('completes a Todo and returns 200', async () => {
    const mockRepo = createMockRepository()
    const date = new Date()
    const todo = {
        id: '1', 
        title: 'Buy milk',
        description: 'Need milk for coffee',
        completed: false,
        createdAt: date, 
        subtasks: []
    }
    
    await mockRepo.save(todo)

    const { PATCH } = createHandlersCompleteTodoRoute(mockRepo)
    const patchReq = new NextRequest('http://localhost/api/todos/complete', {
      method: 'PATCH',
      body: JSON.stringify({ id: '1' }),
    })

    const res = await PATCH(patchReq)
    const body = await res.json()
    
    expect(res.status).toBe(200)
    expect(body).toEqual({ ...todo, completed: true, createdAt: date.toISOString() })
  })

  it('returns 404 when Todo does not exist', async () => {
    const mockRepo = createMockRepository()
    const { PATCH } = createHandlersCompleteTodoRoute(mockRepo)

    const req = new NextRequest('http://localhost/api/todos/complete', {
      method: 'PATCH',
      body: JSON.stringify({ id: 'non-existent-id' }),
    })
    const res = await PATCH(req)
    expect(res.status).toBe(404)

    const body = await res.json()
    expect(body.error).toBe('Todo not found')
  })

  it('returns 400 when Todo is already completed', async () => {
    const mockRepo = createMockRepository()
    const todo = {
        id: '1', 
        title: 'Buy milk',
        description: 'Need milk for coffee',
        completed: false,
        createdAt: new Date(),
        subtasks: []
    }
    
    await mockRepo.save(todo)

    const { PATCH } = createHandlersCompleteTodoRoute(mockRepo)
    const firstPatch = new NextRequest('http://localhost/api/todos/complete', {
      method: 'PATCH',
      body: JSON.stringify({ id : '1' }),
    })

    await PATCH(firstPatch)

    const secondPatch = new NextRequest('http://localhost/api/todos/complete', {
      method: 'PATCH',
      body: JSON.stringify({ id: '1' }),
    })
    const res = await PATCH(secondPatch)
    const body = await res.json()
    
    expect(res.status).toBe(400)
    expect(body.error).toBe('Todo is already marked as completed')
  })

  it('returns 500 when repository fails', async () => {
    const mockRepo = createMockRepository({
      getById: async () => { throw new Error('DB connection failed') },
    })
    const { PATCH } = createHandlersCompleteTodoRoute(mockRepo)

    const req = new NextRequest('http://localhost/api/todos/complete', {
      method: 'PATCH',
      body: JSON.stringify({ id: 'any-id' }),
    })
    const res = await PATCH(req)
    const body = await res.json()
    
    expect(res.status).toBe(500)
    expect(body.error).toBe('Error completing Todo')
  })
})

