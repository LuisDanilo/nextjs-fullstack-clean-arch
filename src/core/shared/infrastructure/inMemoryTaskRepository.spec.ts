import { describe, it, expect } from 'vitest'
import { inMemoryTaskRepository } from '@/core/shared/infrastructure/inMemoryTaskRepository'
import { type TaskEntity } from '@/core/shared/domain/Task.entity'

function makeTask(overrides: Partial<TaskEntity> = {}): TaskEntity {
  return {
    id: crypto.randomUUID(),
    title: 'Comprar leche',
    description: 'Comprar leche en el supermercado',
    status: 'pending',
    createdAt: new Date('2026-01-01T10:00:00.000Z'),
    subtasks: [],
    ...overrides,
  }
}

describe('inMemoryTaskRepository', () => {
  it('getAll returns an empty list when no Tasks are saved', async () => {
    const repository = inMemoryTaskRepository()

    await expect(repository.getAll()).resolves.toEqual([])
  })

  it('save stores a Task and getAll returns it', async () => {
    const repository = inMemoryTaskRepository()
    const task = makeTask()

    await repository.save(task)

    await expect(repository.getAll()).resolves.toEqual([task])
  })

  it('getById returns the Task when it exists', async () => {
    const repository = inMemoryTaskRepository()
    const task = makeTask()

    await repository.save(task)

    await expect(repository.getById(task.id)).resolves.toEqual(task)
  })

  it('getById returns null when the Task does not exist', async () => {
    const repository = inMemoryTaskRepository()

    await expect(repository.getById('non-existent')).resolves.toBeNull()
  })

  it('delete removes an existing Task and returns true', async () => {
    const repository = inMemoryTaskRepository()
    const task = makeTask()

    await repository.save(task)

    await expect(repository.delete(task)).resolves.toBe(true)
    await expect(repository.getById(task.id)).resolves.toBeNull()
  })

  it('delete returns false when the Task does not exist', async () => {
    const repository = inMemoryTaskRepository()

    await expect(repository.delete(makeTask())).resolves.toBe(false)
  })

  it('find filters Tasks by status', async () => {
    const repository = inMemoryTaskRepository()
    const pending = makeTask()
    const done = makeTask({ id: '2', status: 'done' })

    await repository.save(pending)
    await repository.save(done)

    await expect(repository.find({ status: 'pending' })).resolves.toEqual([pending])
    await expect(repository.find({ status: 'done' })).resolves.toEqual([done])
  })

  it('find filters Tasks by search on the title', async () => {
    const repository = inMemoryTaskRepository()
    const milk = makeTask()
    const coffee = makeTask({ id: '2', title: 'Comprar café' })

    await repository.save(milk)
    await repository.save(coffee)

    await expect(repository.find({ search: 'café' })).resolves.toEqual([coffee])
  })

  it('find filters Tasks by startDate', async () => {
    const repository = inMemoryTaskRepository()
    const old = makeTask({ createdAt: new Date('2026-01-01T10:00:00.000Z') })
    const recent = makeTask({ id: '2', createdAt: new Date('2026-02-01T10:00:00.000Z') })

    await repository.save(old)
    await repository.save(recent)

    await expect(repository.find({ startDate: new Date('2026-01-15T00:00:00.000Z') })).resolves.toEqual([recent])
  })

  it('find filters Tasks by endDate', async () => {
    const repository = inMemoryTaskRepository()
    const old = makeTask({ createdAt: new Date('2026-01-01T10:00:00.000Z') })
    const recent = makeTask({ id: '2', createdAt: new Date('2026-02-01T10:00:00.000Z') })

    await repository.save(old)
    await repository.save(recent)

    await expect(repository.find({ endDate: new Date('2026-01-15T00:00:00.000Z') })).resolves.toEqual([old])
  })

  it('find combines multiple filters', async () => {
    const repository = inMemoryTaskRepository()
    const target = makeTask({ title: 'Comprar café' })
    const otherPending = makeTask({ id: '2' })
    const targetDone = makeTask({ id: '3', title: 'Comprar café', status: 'done' })

    await repository.save(target)
    await repository.save(otherPending)
    await repository.save(targetDone)

    await expect(repository.find({ status: 'pending', search: 'café' })).resolves.toEqual([target])
  })

  it('save synchronizes an updated subtask in its parent', async () => {
    const repository = inMemoryTaskRepository()
    const subtask = makeTask({ id: 'sub-1' })
    const parent = makeTask({ subtasks: [subtask] })

    await repository.save(subtask)
    await repository.save(parent)

    const updated = makeTask({ id: 'sub-1', status: 'done' })
    await repository.save(updated)

    const storedParent = await repository.getById(parent.id)
    expect(storedParent?.subtasks).toEqual([updated])
  })
})
