import { forwardRef, type ReactNode, type Ref } from 'react'

interface MotionProps {
  children?: ReactNode
  [key: string]: unknown
}

const MOTION_PROPS = new Set(['initial', 'animate', 'exit', 'transition', 'variants'])

function createMotionTag(_tag: string) {
  const MotionComponent = forwardRef<HTMLElement, MotionProps>((props, ref) => {
    const { children } = props
    const domProps = Object.fromEntries(
      Object.entries(props).filter(([key]) => key !== 'children' && !MOTION_PROPS.has(key))
    )
    return (
      <div ref={ref as Ref<HTMLDivElement>} {...domProps}>
        {children as ReactNode}
      </div>
    )
  })
  MotionComponent.displayName = `Motion.${_tag}`
  return MotionComponent
}

export const motion = new Proxy(
  {},
  {
    get: (_target: Record<string, unknown>, prop: string | symbol) => {
      if (typeof prop !== 'string') return undefined
      return createMotionTag(prop)
    },
  }
)

export function AnimatePresence({ children }: { children?: ReactNode }) {
  return <>{children}</>
}

export function usePresence(): [boolean, undefined] {
  return [true, undefined]
}
