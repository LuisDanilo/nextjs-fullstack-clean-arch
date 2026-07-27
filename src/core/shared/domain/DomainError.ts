/**
 * Clase que representa un error en la capa de dominio.
 */
export class DomainError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'DomainError'
  }
}

