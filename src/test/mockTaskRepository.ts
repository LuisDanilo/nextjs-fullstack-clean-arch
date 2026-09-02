import { vi } from 'vitest'

import { type TaskRepository } from '@/core/shared/domain/Task.repository'
import { inMemoryTaskRepository } from '@/core/shared/infrastructure/inMemoryTaskRepository'

/**
 * Función que crea un mock de un repositorio de tareas.
 * Encapsula un repositorio en memoria con funciones espía de vitest.
 * Permite ademas sobreescribir las funciones del repositorio en memoria con las funciones pasadas como parámetro.
 *
 * @param overrides - Funciones a sobreescribir en el repositorio en memoria.
 * @returns Mock de repositorio de tareas con funciones espía de vitest.
 */
export function createMockRepository(overrides: Partial<TaskRepository> = {}): TaskRepository {
  const real = inMemoryTaskRepository()

  return Object.fromEntries(
    Object.entries(real).map(([key, realFn]) => [key, vi.fn(overrides[key as keyof TaskRepository] ?? realFn)])
  ) as unknown as TaskRepository
}

