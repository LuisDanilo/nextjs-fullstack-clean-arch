import { randomUUID } from 'crypto'
import { GetTodosFilters, TodoRepository } from '../domain/Todo.repository'
import { TodoEntity } from '../domain/Todo.entity'
import InfrastructureError from './InfrastructureError'

const todos: Array<TodoEntity> = [
  {
    id: randomUUID(),
    title: 'Buy milk',
    description: 'I need milk for my coffee',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  },
  {
    id: randomUUID(),
    title: 'Buy eggs',
    description: 'I need eggs for my breakfast',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  },
  {
    id: randomUUID(),
    title: 'Buy bread',
    description: 'I need bread for my sandwich',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  },
  {
    id: randomUUID(),
    title: 'Buy butter',
    description: 'I need butter for my toast',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  },
  {
    id: randomUUID(),
    title: 'Buy cheese',
    description: 'I need cheese for my sandwich',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  },
  {
    id: randomUUID(),
    title: 'Buy apples',
    description: 'I need apples for my lunch',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  },
  {
    id: randomUUID(),
    title: 'Buy bananas',
    description: 'I need bananas for my breakfast',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  },
  {
    id: randomUUID(),
    title: 'Buy oranges',
    description: 'I need oranges for my juice',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  },
  {
    id: randomUUID(),
    title: 'Buy carrots',
    description: 'I need carrots for my salad',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  },
  {
    id: randomUUID(),
    title: 'Buy lettuce',
    description: 'I need lettuce for my salad',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  },
  {
    id: randomUUID(),
    title: 'Buy tomatoes',
    description: 'I need tomatoes for my salad',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  },
  {
    id: randomUUID(),
    title: 'Buy potatoes',
    description: 'I need potatoes for my dinner',
    completed: false,
    createdAt: new Date(),
    subtasks: []
  }
]

export default function InMemoryTodoRepository(): TodoRepository {
  return {
    getAll: async function () {
      try{
        return todos
      } catch(error) {
        throw new InfrastructureError(`Error getting todos: ${error}`)
      }
    },
    find: async function({ completed, startDate, endDate, search }: GetTodosFilters) {
      try {
        const filteredTodos = todos.filter(todo => {
          if(todo.completed !== completed) return false
          if(startDate && todo.createdAt < startDate) return false
          if(endDate && todo.createdAt > endDate) return false
          if(search && !todo.title.includes(search)) return false

          return true
        })

        return filteredTodos
      } catch(error) {
        throw new InfrastructureError(`Error getting todos: ${error}`)
      }
    },
    getById: async function(id: string) {
      try {
        const todo = todos.find(todo => todo.id === id)
        return todo || null 
      } catch(error) {
        throw new InfrastructureError(`Error getting todo by id: ${error}`)
      } 

    },
    save: async function(todo: TodoEntity) {
      try {
        todos.push(todo)

        return true
      } catch(error) {      
        throw new InfrastructureError(`Error saving todo: ${error}`)
      }
    },
    delete: async function(todo: TodoEntity) {
      try {
        const index = todos.findIndex(t => t.id === todo.id)

        todos.splice(index, 1)

        return true
      } catch(error) {

        throw new InfrastructureError(`Error deleting todo: ${error}`) 
      }
    }
  }
}
