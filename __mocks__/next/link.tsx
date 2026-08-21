import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from 'react'

interface MockLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children?: ReactNode
}

const MockLink = forwardRef<HTMLAnchorElement, MockLinkProps>(({ href, children, ...props }, ref) => (
  <a ref={ref} href={href} {...props}>
    {children}
  </a>
))
MockLink.displayName = 'MockLink'

export default MockLink
