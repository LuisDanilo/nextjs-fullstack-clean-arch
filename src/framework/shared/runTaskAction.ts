import { revalidatePath } from 'next/cache'
import { ApplicationError } from '@/core/shared/application/ApplicationError'
import { DomainError } from '@/core/shared/domain/DomainError'

export interface TaskActionResult {
  ok: boolean
  message: string
}

/**
 * Función que ejecuta una "server action" y devuelve un resultado con un mensaje para el usuario.
 * @param fn Función que ejecuta la acción.
 * @param successMessage Mensaje a mostrar si la acción se ejecuta correctamente.
 * @param path Path a revalidar si la acción se ejecuta correctamente.
 * @returns Resultado {@link TaskActionResult} de la acción con un mensaje para el usuario.
 */
export async function runTaskAction(
  fn: () => Promise<unknown>,
  successMessage: string,
  path?: string
): Promise<TaskActionResult> {
  try {
    await fn()
    return { ok: true, message: successMessage }
  } catch (error) {
    return { ok: false, message: toUserMessage(error) }
  } finally {
    if(path) {
      revalidatePath(path)
    }
  }
}

// TODO Deberia usar un mapa de errores personalizado, D001, A001, I001, etc
const userMessages: Record<string, string> = {
  'Task title cannot be empty': 'El título no puede estar vacío',
  'Task description must be at least 10 characters long': 'La descripción debe tener al menos 10 caracteres',
  'Task is already marked as completed': 'La tarea ya está completada',
  'Cannot mark Task as completed because it has incomplete subtasks': 'No se puede completar: tiene subtareas incompletas',
  'Task not found': 'Tarea no encontrada',
  'Error creating Task': 'Ocurrió un error al crear la tarea',
  'Error deleting Task': 'Ocurrió un error al eliminar la tarea',
  'Error completing Task': 'Ocurrió un error al completar la tarea'
}

function toUserMessage(error: unknown): string {
  if (error instanceof DomainError || error instanceof ApplicationError) {
    return userMessages[error.message] ?? 'Ocurrió un error inesperado'
  }

  return 'Ocurrió un error inesperado'
}
