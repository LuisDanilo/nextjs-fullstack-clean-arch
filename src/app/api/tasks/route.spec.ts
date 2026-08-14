import { describe, it, expect } from 'vitest'
import { createHandlersCreateTask } from '@/framework/features/create-tasks/http/createTask.controller'
import { createHandlersGetTasks } from '@/framework/features/list-tasks/http/getTasks.controller'
import { createMockRepository } from '@/test/mockTaskRepository'
import { NextRequest } from 'next/server'

describe('POST /api/tasks', () => {
  it('creates a Task and returns 201', async () => {
    const mockRepo = createMockRepository()
    const { POST } = createHandlersCreateTask(mockRepo)

    const req = new NextRequest('http://localhost/api/tasks', {
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
    const { POST } = createHandlersCreateTask(mockRepo)

    const req = new NextRequest('http://localhost/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title: '', description: 'Description for test' }),
    })

    const res = await POST(req)
    expect(res.status).toBe(400)

    const body = await res.json()
    expect(body.error).toBe('Task title cannot be empty')
  })

  it('returns 400 when description is too short', async () => {
    const mockRepo = createMockRepository()
    const { POST } = createHandlersCreateTask(mockRepo)

    const req = new NextRequest('http://localhost/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test', description: 'Short' }),
    })

    const res = await POST(req)
    expect(res.status).toBe(400)

    const body = await res.json()
    expect(body.error).toBe('Task description must be at least 10 characters long')
  })

  it('returns 500 when save fails', async () => {
    const mockRepo = createMockRepository({
      save: async () => { throw new Error('DB connection failed') },
    })
    const { POST } = createHandlersCreateTask(mockRepo)

    const req = new NextRequest('http://localhost/api/tasks', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test', description: 'Description for test' }),
    })

    const res = await POST(req)
    expect(res.status).toBe(500)

    const body = await res.json()
    expect(body.error).toBe('Error creating Task')
  })
})

describe('GET /api/tasks', () => {
  it('returns an empty list', async () => {
    const mockRepo = createMockRepository()
    const { GET } = createHandlersGetTasks(mockRepo)

    const req = new NextRequest('http://localhost/api/tasks')
    const res = await GET(req)
    expect(res.status).toBe(200)

    const body = await res.json()
    expect(body).toEqual([])
  })

  it('returns Tasks from repository', async () => {
    const mockRepo = createMockRepository()
    const date = new Date()
    const task = {
      id: '1',
      title: 'Buy milk',
      description: 'Buy milk from the store',
      completed: false,
      subtasks: [],
      createdAt: date 
    }

    mockRepo.save(task)
    
    const { GET } = createHandlersGetTasks(mockRepo)
    const getReq = new NextRequest('http://localhost/api/tasks')
    const res = await GET(getReq)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toHaveLength(1)
    expect(body).toEqual([{ ...task, createdAt: date.toISOString() }])
  })

  it('filters by completed status', async () => {
    const mockRepo = createMockRepository()
    const date = new Date()
    const task1 = {
      id: '1',
      title: 'Buy milk',
      description: 'Buy milk from the store',
      completed: false,
      subtasks: [],
      createdAt: date 
    }
    const task2 = {
      id: '2',
      title: 'Buy eggs',
      description: 'Buy eggs from the store',
      completed: true,
      subtasks: [],
      createdAt: date 
    }

    mockRepo.save(task1)
    mockRepo.save(task2)

    const { GET } = createHandlersGetTasks(mockRepo)

    const getReq = new NextRequest('http://localhost/api/tasks?completed=false')
    const res = await GET(getReq)
    const body = await res.json()
    
    expect(res.status).toBe(200)
    expect(body).toHaveLength(1)
    expect(body).toEqual([{ ...task1, createdAt: date.toISOString() }])
  })
})
