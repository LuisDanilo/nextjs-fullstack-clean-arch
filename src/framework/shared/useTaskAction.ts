'use client'

import { useRef, useTransition } from 'react'

import { type TaskActionResult } from '@/framework/shared/runTaskAction'

type TaskAction = (prevState: TaskActionResult, formData: FormData) => Promise<TaskActionResult>

const initialState: TaskActionResult = { ok: false, message: '' }

export function useTaskAction(action: TaskAction, onResult: (state: TaskActionResult) => void) {
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
