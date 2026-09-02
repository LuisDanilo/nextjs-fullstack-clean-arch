import { revalidatePath } from 'next/cache'
import { getTranslations } from 'next-intl/server'

import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'

export type TaskMessageKey =
  | 'taskCreated'
  | 'taskDeleted'
  | 'statusUpdated'
  | 'titleEmpty'
  | 'descriptionTooShort'
  | 'cannotMarkDone'
  | 'taskNotFound'
  | 'invalidStatus'
  | 'errorCreating'
  | 'errorDeleting'
  | 'errorUpdatingStatus'
  | 'unexpected'

export interface TaskActionResult {
  ok: boolean
  message: string
}

/**
 * Función que ejecuta una "server action" y devuelve un resultado con un mensaje para el usuario.
 * @param fn Función que ejecuta la acción.
 * @param successMessageKey Clave del mensaje a mostrar si la acción se ejecuta correctamente.
 * @param path Path a revalidar si la acción se ejecuta correctamente.
 * @returns Resultado {@link TaskActionResult} de la acción con un mensaje para el usuario.
 */
export async function runTaskAction(
  fn: () => Promise<unknown>,
  successMessageKey: TaskMessageKey,
  path?: string
): Promise<TaskActionResult> {
  const t = await getTranslations('messages')

  try {
    await fn()
    return { ok: true, message: t(successMessageKey) }
  } catch (error) {
    return { ok: false, message: toUserMessage(error, t) }
  } finally {
    if (path) {
      revalidatePath(path)
    }
  }
}

// TODO Deberia usar un mapa de errores personalizado, D001, A001, I001, etc
const errorMessageKeys: Record<string, TaskMessageKey> = {
  'Task title cannot be empty': 'titleEmpty',
  'Task description must be at least 10 characters long': 'descriptionTooShort',
  'Cannot mark Task as done because it has incomplete subtasks': 'cannotMarkDone',
  'Task not found': 'taskNotFound',
  'Invalid status': 'invalidStatus',
  'Error creating Task': 'errorCreating',
  'Error deleting Task': 'errorDeleting',
  'Error updating Task status': 'errorUpdatingStatus'
}

function toUserMessage(error: unknown, t: (key: TaskMessageKey) => string): string {
  if (error instanceof DomainError || error instanceof ApplicationError) {
    const key = errorMessageKeys[error.message] ?? 'unexpected'
    return t(key)
  }

  return t('unexpected')
}
