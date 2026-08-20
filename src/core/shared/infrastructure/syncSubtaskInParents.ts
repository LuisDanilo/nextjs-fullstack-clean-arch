import { type TaskEntity } from '@/core/shared/domain/Task.entity'

/**
 * Función utilitaria para sincronizar los cambios de una subtarea en sus padres.
 *
 * @param store Mapa de entidades {@link TaskEntity}.
 * @param updated Entidad {@link TaskEntity} actualizada.
 */
export function syncSubtaskInParents(store: Map<string, TaskEntity>, updated: TaskEntity): void {
  for (const [id, entity] of store.entries()) {
    if (id === updated.id) continue
    const idx = entity.subtasks.findIndex(st => st.id === updated.id)
    if (idx !== -1) {
      const synced = [...entity.subtasks]
      synced[idx] = updated
      store.set(id, { ...entity, subtasks: synced })
    }
  }
}

