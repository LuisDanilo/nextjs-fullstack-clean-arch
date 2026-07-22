import { describe, it, expect } from 'vitest'
import { createTodo, completeTodo } from './Todo.entity'

describe('createTodo', () => {
  it('should create a todo with valid data', () => {
    const todo = createTodo({ title: 'Test todo', description: 'This is a test description' })

    expect(todo).toMatchObject({
      title: 'Test todo',
      description: 'This is a test description',
      completed: false,
      subtasks: []
    })
    expect(todo.id).toBeDefined()
    expect(todo.createdAt).toBeInstanceOf(Date)
  })

  it('should throw DomainError when title is empty', () => {
    expect(() => createTodo({ title: '', description: 'Valid description' })).toThrow('Todo title cannot be empty')
  })

  it('should throw DomainError when title is whitespace only', () => {
    expect(() => createTodo({ title: '   ', description: 'Valid description' })).toThrow('Todo title cannot be empty')
  })

  it('should throw DomainError when description is too short', () => {
    expect(() => createTodo({ title: 'Test', description: 'Short' })).toThrow('Todo description must be at least 10 characters long')
  })

  it('should throw DomainError when description is empty', () => {
    expect(() => createTodo({ title: 'Test', description: '' })).toThrow('Todo description must be at least 10 characters long')
  })
})

describe('completeTodo', () => {
  it('should mark an incomplete todo as completed', () => {
    const todo = createTodo({ title: 'Test', description: 'A valid description here' })
    const updated = completeTodo(todo)

    expect(updated.completed).toBe(true)
  })

  it('should throw DomainError when todo is already completed', () => {
    const todo = createTodo({ title: 'Test', description: 'A valid description here' })
    const updated = completeTodo(todo)

    expect(() => completeTodo(updated)).toThrow('Todo is already marked as completed')
  })

  it('should throw DomainError when todo has incomplete subtasks', () => {
    const todo = createTodo({ title: 'Test', description: 'A valid description here' })
    todo.subtasks = [
      { ...todo, id: '1', title: 'Subtask', completed: false, subtasks: [] }
    ]

    expect(() => completeTodo(todo)).toThrow('Cannot mark Todo as completed because it has incomplete subtasks')
  })

  it('should complete a todo when all subtasks are completed', () => {
    const todo = createTodo({ title: 'Test', description: 'A valid description here' })
    todo.subtasks = [
      { ...todo, id: '1', title: 'Subtask', completed: true, subtasks: [] }
    ]

    const updated = completeTodo(todo)

    expect(updated.completed).toBe(true)
  })
})
