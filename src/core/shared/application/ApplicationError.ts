/**
 * Clase que representa un error en la capa de aplicación. 
 */
export class ApplicationError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ApplicationError'
  }
}

