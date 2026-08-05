'use client'

interface CheckTodoInputProps {
  checked: boolean
}

export function CheckTodoInput({ checked }: CheckTodoInputProps) {
  return (
    <input
      checked={checked}
      onChange={(e) => {
        const form = e.currentTarget.form

        if(form) {
          form.requestSubmit()
        }
      }}
      type='checkbox'
    />
  )
}
