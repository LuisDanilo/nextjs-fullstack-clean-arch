import { describe, it, expect } from 'vitest'
import { createHandlersDeleteTodo } from './route'
import { createMockRepository } from '@/test/mockTodoRepository'
import { NextRequest } from 'next/server'

describe('DELETE /api/todos/delete', () => {
  it('deletes a Todo and returns success', async () => {
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

    const { DELETE } = createHandlersDeleteTodo(mockRepo)
    const deleteReq = new NextRequest('http://localhost/api/todos/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id: '1' }),
    })
    const res = await DELETE(deleteReq)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body.success).toBe(true)
  })

  it('returns 404 when Todo does not exist', async () => {
    const mockRepo = createMockRepository()
    const { DELETE } = createHandlersDeleteTodo(mockRepo)

    const req = new NextRequest('http://localhost/api/todos/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id: 'non-existent-id' }),
    })
    const res = await DELETE(req)
    const body = await res.json()

    expect(res.status).toBe(404)
    expect(body.error).toBe('Todo not found')
  })

  it('returns 500 when repository fails', async () => {
    const mockRepo = createMockRepository({
      getById: async () => { throw new Error('DB connection failed') },
    })
    const { DELETE } = createHandlersDeleteTodo(mockRepo)

    const req = new NextRequest('http://localhost/api/todos/delete', {
      method: 'DELETE',
      body: JSON.stringify({ id: 'any-id' }),
    })
    const res = await DELETE(req)
    const body = await res.json()

    expect(res.status).toBe(500)
    expect(body.error).toBe('Error deleting Todo')
  })
})
