import { type ReactNode } from 'react'

export function DndContext({ children }: { children?: ReactNode }) {
  return <>{children}</>
}

export function DragOverlay({ children }: { children?: ReactNode }) {
  return <>{children}</>
}

export function useDroppable() {
  return { setNodeRef: (node: unknown) => node, isOver: false }
}

export function useDraggable() {
  return { setNodeRef: (node: unknown) => node, attributes: {}, listeners: {}, isDragging: false }
}

export function useDndContext() {
  return { active: null }
}

export const closestCorners = () => []

export function useSensor(sensor: unknown) {
  return sensor
}

export function useSensors(...sensors: Array<unknown>) {
  return sensors
}
