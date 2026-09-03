import { describe, expect,it } from 'vitest'

import { type TaskEntity } from '@/core/shared/domain/Task.entity'
import { toTaskDto } from '@/framework/features/list-tasks/presentation/dto'

function makeEntity(overrides: Partial<TaskEntity> = {}): TaskEntity {
  return {
    id: '1',
    title: 'Comprar leche',
    description: 'Comprar leche en el supermercado',
    status: 'pending',
    createdAt: new Date('2026-01-01T10:00:00.000Z'),
    subtasks: [],
    ...overrides,
  }
}

describe('toTaskDto', () => {
  it('serializes the createdAt date to ISO', () => {
    const dto = toTaskDto(makeEntity())

    expect(dto.createdAt).toBe('2026-01-01T10:00:00.000Z')
  })

  it('keeps the rest of the Task fields', () => {
    const entity = makeEntity()

    const dto = toTaskDto(entity)

    expect(dto).toMatchObject({
      id: entity.id,
      title: entity.title,
      description: entity.description,
      status: entity.status,
    })
  })

  it('maps nested subtasks recursively', () => {
    const subtask = makeEntity({ id: '2', title: 'Subtarea' })
    const entity = makeEntity({ subtasks: [subtask] })

    const dto = toTaskDto(entity)

    expect(dto.subtasks).toEqual([
      {
        id: '2',
        title: 'Subtarea',
        description: 'Comprar leche en el supermercado',
        status: 'pending',
        createdAt: '2026-01-01T10:00:00.000Z',
        subtasks: [],
      },
    ])
  })
})
