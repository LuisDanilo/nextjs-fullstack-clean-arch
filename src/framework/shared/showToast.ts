import { toast } from 'sonner'
import { type TaskActionResult } from '@/framework/shared/runTaskAction'

export function showToast(state: TaskActionResult) {
  const t = state.ok ? toast.success : toast.error

  t(state.message)
}
