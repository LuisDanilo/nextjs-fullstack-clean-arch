'use client'

export function DeleteTodoButton() {
  return <button onClick={(e) => {
    const form = e.currentTarget.form
    if (form) {
      form.requestSubmit()
    }
  }}>
    Delete
  </button>
}
