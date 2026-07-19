/**
 * Clase que representa un error en la capa de aplicación.
 */
export class ApplicationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ApplicationError'
  }
}

