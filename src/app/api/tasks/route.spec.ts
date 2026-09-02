import { NextRequest } from 'next/server'
import { describe, expect,it } from 'vitest'

import { createHandlersCreateTask } from '@/framework/features/create-tasks/http/createTask.controller'
import { createHandlersGetTasks } from '@/framework/features/list-tasks/http/getTasks.controller'
import { createMockRepository } from '@/test/mockTaskRepository'

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
      status: 'pending',
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

  it('returns 500 when the request body is invalid JSON', async () => {
    const mockRepo = createMockRepository()
    const { POST } = createHandlersCreateTask(mockRepo)

    const req = new NextRequest('http://localhost/api/tasks', {
      method: 'POST',
      body: '{invalid json',
    })

    const res = await POST(req)
    expect(res.status).toBe(500)

    const body = await res.json()
    expect(body.error).toBe('Internal server error')
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
      status: 'pending' as const,
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

  it('filters by status', async () => {
    const mockRepo = createMockRepository()
    const date = new Date()
    const task1 = {
      id: '1',
      title: 'Buy milk',
      description: 'Buy milk from the store',
      status: 'pending' as const,
      subtasks: [],
      createdAt: date 
    }
    const task2 = {
      id: '2',
      title: 'Buy eggs',
      description: 'Buy eggs from the store',
      status: 'done' as const,
      subtasks: [],
      createdAt: date 
    }

    mockRepo.save(task1)
    mockRepo.save(task2)

    const { GET } = createHandlersGetTasks(mockRepo)

    const getReq = new NextRequest('http://localhost/api/tasks?status=pending')
    const res = await GET(getReq)
    const body = await res.json()
    
    expect(res.status).toBe(200)
    expect(body).toHaveLength(1)
    expect(body).toEqual([{ ...task1, createdAt: date.toISOString() }])
  })

  it('filters by search', async () => {
    const mockRepo = createMockRepository()
    const date = new Date()
    const task1 = {
      id: '1',
      title: 'Buy milk',
      description: 'Buy milk from the store',
      status: 'pending' as const,
      subtasks: [],
      createdAt: date
    }
    const task2 = {
      id: '2',
      title: 'Buy coffee',
      description: 'Buy coffee from the store',
      status: 'pending' as const,
      subtasks: [],
      createdAt: date
    }

    mockRepo.save(task1)
    mockRepo.save(task2)

    const { GET } = createHandlersGetTasks(mockRepo)

    const getReq = new NextRequest('http://localhost/api/tasks?search=coffee')
    const res = await GET(getReq)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toHaveLength(1)
    expect(body).toEqual([{ ...task2, createdAt: date.toISOString() }])
  })

  it('ignores an invalid status filter', async () => {
    const mockRepo = createMockRepository()
    const date = new Date()
    const task1 = {
      id: '1',
      title: 'Buy milk',
      description: 'Buy milk from the store',
      status: 'pending' as const,
      subtasks: [],
      createdAt: date
    }

    mockRepo.save(task1)

    const { GET } = createHandlersGetTasks(mockRepo)

    const getReq = new NextRequest('http://localhost/api/tasks?status=invalid')
    const res = await GET(getReq)
    const body = await res.json()

    expect(res.status).toBe(200)
    expect(body).toEqual([{ ...task1, createdAt: date.toISOString() }])
  })

  it('returns 500 when repository fails', async () => {
    const mockRepo = createMockRepository({
      getAll: async () => { throw new Error('DB connection failed') },
    })
    const { GET } = createHandlersGetTasks(mockRepo)

    const getReq = new NextRequest('http://localhost/api/tasks')
    const res = await GET(getReq)

    expect(res.status).toBe(500)
    const body = await res.json()
    expect(body.error).toBe('Error getting Tasks')
  })
})
