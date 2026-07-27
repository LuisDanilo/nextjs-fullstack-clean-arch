import { TodoEntity } from '../domain/Todo.entity'

/**
 * Función utilitaria para sincronizar los cambios de una subtarea en sus padres.
 *
 * @param store Mapa de entidades {@link TodoEntity}.
 * @param updated Entidad {@link TodoEntity} actualizada.
 */
export function syncSubtaskInParents(store: Map<string, TodoEntity>, updated: TodoEntity): void {
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

