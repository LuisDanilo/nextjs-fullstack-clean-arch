import { describe, expect,it } from 'vitest'

import { type TaskEntity } from '@/core/shared/domain/Task.entity'
import { syncSubtaskInParents } from '@/core/shared/infrastructure/syncSubtaskInParents'

function makeTask(overrides: Partial<TaskEntity> = {}): TaskEntity {
  return {
    id: crypto.randomUUID(),
    title: 'Tarea',
    description: 'Una descripción válida',
    status: 'pending',
    createdAt: new Date('2026-01-01T10:00:00.000Z'),
    subtasks: [],
    ...overrides,
  }
}

describe('syncSubtaskInParents', () => {
  it('updates the subtask copy inside its parent', () => {
    const subtask = makeTask({ id: 'sub-1' })
    const parent = makeTask({ subtasks: [subtask] })
    const store = new Map([
      [parent.id, parent],
      [subtask.id, subtask],
    ])

    const updated = makeTask({ id: 'sub-1', status: 'done' })
    syncSubtaskInParents(store, updated)

    expect(store.get(parent.id)?.subtasks).toEqual([updated])
  })

  it('keeps parent identity and other subtasks untouched', () => {
    const subtask1 = makeTask({ id: 'sub-1' })
    const subtask2 = makeTask({ id: 'sub-2' })
    const parent = makeTask({ subtasks: [subtask1, subtask2] })
    const store = new Map([
      [parent.id, parent],
      [subtask1.id, subtask1],
      [subtask2.id, subtask2],
    ])

    const updated = makeTask({ id: 'sub-1', status: 'done' })
    syncSubtaskInParents(store, updated)

    const storedParent = store.get(parent.id)
    expect(storedParent).not.toBe(parent)
    expect(storedParent?.subtasks[0]).toEqual(updated)
    expect(storedParent?.subtasks[1]).toEqual(subtask2)
  })

  it('does nothing when the updated Task has no parent', () => {
    const subtask = makeTask({ id: 'sub-1' })
    const store = new Map([[subtask.id, subtask]])

    syncSubtaskInParents(store, subtask)

    expect(store.get(subtask.id)).toEqual(subtask)
  })

  it('does nothing when the updated Task is the entity itself', () => {
    const task = makeTask()
    const store = new Map([[task.id, task]])

    const updated = makeTask({ id: task.id, status: 'done' })
    syncSubtaskInParents(store, updated)

    expect(store.get(task.id)).toEqual(task)
  })
})
