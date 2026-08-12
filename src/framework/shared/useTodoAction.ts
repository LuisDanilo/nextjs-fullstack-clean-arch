'use client'

import { useRef, useTransition } from 'react'
import type { TodoActionResult } from './runTodoAction'

type TodoAction = (prevState: TodoActionResult, formData: FormData) => Promise<TodoActionResult>

const initialState: TodoActionResult = { ok: false, message: '' }

export function useTodoAction(action: TodoAction, onResult: (state: TodoActionResult) => void) {
  const [pending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  const formAction = (formData: FormData) => {
    const form = formRef.current

    startTransition(async () => {
      const result = await action(initialState, formData)
      form?.reset()
      onResult(result)
    })
  }

  return { pending, formRef, formAction }
}
