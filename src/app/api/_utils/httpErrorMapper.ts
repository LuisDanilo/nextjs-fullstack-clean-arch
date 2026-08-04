import { DomainError } from '@/core/shared/domain/DomainError'
import { ApplicationError } from '@/core/shared/application/ApplicationError'

/**
 * Representa una respuesta de error de la API.
 */
export interface ApiErrorResponse {
  status: number
  body: {
    error: string
  }
}

/**
 * Traduce errores de dominio y aplicación a errores HTTP.
 *
 * @param error - Error a traducir.
 * @returns Objeto {@link ApiErrorResponse} con el código de estado HTTP y el cuerpo de la respuesta.
 */
export function toHttpError(error: unknown): ApiErrorResponse {
  if (error instanceof DomainError) {
    return { status: 400, body: { error: error.message } }
  }

  if (error instanceof ApplicationError) {
    if (error.message.toLowerCase().includes('not found')) {
      return { status: 404, body: { error: error.message } }
    }

    if (error.cause) {
      return { status: 500, body: { error: error.message } }
    }

    return { status: 400, body: { error: error.message } }
  }

  return { status: 500, body: { error: 'Internal server error' } }
}
