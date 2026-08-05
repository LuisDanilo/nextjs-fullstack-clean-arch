import { createTodo } from './createTodo.action'

export function CreateTodoForm() {
  return (
    <form action={createTodo}>
      <label htmlFor='title'>
        Title
        <input type='text' name='title'/>
      </label>  
      <label htmlFor='description'>
        Description
        <input type='textarea' name='description' />
      </label>
      <button type='submit'>Add</button>
    </form>
  )
}
