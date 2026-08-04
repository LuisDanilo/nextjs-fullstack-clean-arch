import { describe, it, expect } from 'vitest'
import { createHandlersCreateTodo, createHandlersGetTodos } from './route'
import { createMockRepository } from '@/test/mockTodoRepository'
import { NextRequest } from 'next/server'

describe('POST /api/todos', () => {
  it('creates a Todo and returns 201', async () => {
    const mockRepo = createMockRepository()
    const { POST } = createHandlersCreateTodo(mockRepo)

    const req = new NextRequest('http://localhost/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test', description: 'Description for test' }),
    })

    const res = await POST(req)
    const body = await res.json()

    expect(res.status).toBe(201)
    expect(body).toMatchObject({
      title: 'Test',
      description: 'Description for test',
      completed: false,
      subtasks: []
    })
    expect(body.id).toBeDefined()
    expect(body.createdAt).toBeDefined()
  })

  it('returns 400 when title is empty', async () => {
    const mockRepo = createMockRepository()
    const { POST } = createHandlersCreateTodo(mockRepo)

    const req = new NextRequest('http://localhost/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title: '', description: 'Description for test' }),
    })

    const res = await POST(req)
    expect(res.status).toBe(400)

    const body = await res.json()
    expect(body.error).toBe('Todo title cannot be empty')
  })

  it('returns 400 when description is too short', async () => {
    const mockRepo = createMockRepository()
    const { POST } = createHandlersCreateTodo(mockRepo)

    const req = new NextRequest('http://localhost/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test', description: 'Short' }),
    })

    const res = await POST(req)
    expect(res.status).toBe(400)

    const body = await res.json()
    expect(body.error).toBe('Todo description must be at least 10 characters long')
  })

  it('returns 500 when save fails', async () => {
    const mockRepo = createMockRepository({
      save: async () => { throw new Error('DB connection failed') },
    })
    const { POST } = createHandlersCreateTodo(mockRepo)

    const req = new NextRequest('http://localhost/api/todos', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test', description: 'Description for test' }),
    })

    const res = await POST(req)
    expect(res.status).toBe(500)

    const body = await res.json()
    expect(body.error).toBe('Error creating Todo')
  })
})

describe('GET /api/todos', () => {
  it('returns an empty list', async () => {
    const mockRepo = createMockRepository()
    const { GET } = createHandlersGetTodos(mockRepo)

    const req = new NextRequest('http://localhost/api/todos')
    const res = await GET(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body).toEqual([])
  })

  it('returns Todos from repository', async () => {
    const mockRepo = createMockRepository()
    const date = new Date()
    const todo = {
      id: '1',
      title: 'Buy milk',
      description: 'Buy milk from the store',
      completed: false,
      subtasks: [],
      createdAt: date 
    }

    mockRepo.save(todo)
    
    const { GET } = createHandlersGetTodos(mockRepo)
    const getReq = new NextRequest('http://localhost/api/todos')
    const res = await GET(getReq)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toHaveLength(1)
    expect(body).toEqual([{ ...todo, createdAt: date.toISOString() }])
  })

  it('filters by completed status', async () => {
    const mockRepo = createMockRepository()
    const date = new Date()
    const todo1 = {
      id: '1',
      title: 'Buy milk',
      description: 'Buy milk from the store',
      completed: false,
      subtasks: [],
      createdAt: date 
    }
    const todo2 = {
      id: '2',
      title: 'Buy eggs',
      description: 'Buy eggs from the store',
      completed: true,
      subtasks: [],
      createdAt: date 
    }

    mockRepo.save(todo1)
    mockRepo.save(todo2)

    const { GET } = createHandlersGetTodos(mockRepo)

    const getReq = new NextRequest('http://localhost/api/todos?completed=false')
    const res = await GET(getReq)
    const body = await res.json()
    
    expect(res.status).toBe(200)
    expect(body).toHaveLength(1)
    expect(body).toEqual([{ ...todo1, createdAt: date.toISOString() }])
  })
})
