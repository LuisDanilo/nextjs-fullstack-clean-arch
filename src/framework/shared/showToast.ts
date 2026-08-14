import { toast } from 'sonner'
import { TaskActionResult } from './runTaskAction'

export function showToast(state: TaskActionResult) {
  const t = state.ok ? toast.success : toast.error

  t(state.message)
}
