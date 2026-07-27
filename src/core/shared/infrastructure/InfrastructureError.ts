/**
 * Clase que representa un error en la capa de infraestructura.
 */
export class InfrastructureError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'InfrastructureError'
  }
}

