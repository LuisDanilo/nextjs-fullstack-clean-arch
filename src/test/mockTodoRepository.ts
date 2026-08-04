import { TodoRepository } from '@/core/shared/domain/Todo.repository'
import { inMemoryTodoRepository } from '@/core/shared/infrastructure/inMemoryTodoRepository'
import { vi } from 'vitest'

/**
 * Función que crea un mock de un repositorio de tareas.
 * Encapsula un repositorio en memoria con funciones espía de vitest.
 * Permite ademas sobreescribir las funciones del repositorio en memoria con las funciones pasadas como parámetro.
 *
 * @param overrides - Funciones a sobreescribir en el repositorio en memoria.
 * @returns Mock de repositorio de tareas con funciones espía de vitest.
 */
export function createMockRepository(overrides: Partial<TodoRepository> = {}): TodoRepository {
  const real = inMemoryTodoRepository()
  const mocked = {} as TodoRepository

  const entries = Object.entries(real) as Array<[keyof TodoRepository, any]>

  for (let [key, realFn] of entries) {
    mocked[key] = vi.fn(overrides[key] ?? realFn)
  }

  return mocked
}
