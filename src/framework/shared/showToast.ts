import { toast } from 'sonner'
import { TodoActionResult } from './runTodoAction'

export function showToast(state: TodoActionResult) {
  const t = state.ok ? toast.success : toast.error

  t(state.message)
}
