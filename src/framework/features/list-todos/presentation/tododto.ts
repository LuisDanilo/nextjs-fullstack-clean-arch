import { TodoEntity } from '@/core/shared/domain/Todo.entity'

export interface TodoDto {
  id: string
  title: string
  description: string
  completed: boolean
  createdAt: string
  subtasks: Array<TodoDto>
}

export function toTodoDto(todo: TodoEntity): TodoDto {
  return {
    ...todo,
    createdAt: todo.createdAt.toISOString(),
    subtasks: todo.subtasks.map(toTodoDto)
  }
}