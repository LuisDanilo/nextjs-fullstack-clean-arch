// @vitest-environment jsdom
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach,describe, expect, it, vi } from 'vitest'

import { Sidebar } from '@/framework/layout/Sidebar'
import { renderWithTheme as render } from '@/test/renderWithTheme'

vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string }) => <a href={href} {...props}>{children}</a>,
}))

const usePathnameMock = vi.hoisted(() => vi.fn())

vi.mock('next/navigation', () => ({ usePathname: usePathnameMock }))

describe('Sidebar', () => {
  beforeEach(() => {
    usePathnameMock.mockReturnValue('/')
  })

  it('renders the navigation links', () => {
    render(<Sidebar />)

    expect(screen.getByRole('link', { name: 'Tareas' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'Completados' })).toHaveAttribute('href', '/completed')
    expect(screen.getByRole('link', { name: 'Configuración' })).toHaveAttribute('href', '/settings')
  })

  it('highlights the active link based on the current pathname', () => {
    usePathnameMock.mockReturnValue('/completed')
    render(<Sidebar />)

    const listItems = screen.getAllByRole('link')
    const completedItem = listItems.find(el => el.textContent?.includes('Completados'))
    expect(completedItem).toBeDefined()
    expect(completedItem!.closest('[class*="Mui-selected"]')).toBeInTheDocument()
  })

  it('opens and closes the mobile menu', async () => {
    const user = userEvent.setup()
    render(<Sidebar />)

    const openButton = screen.getByRole('button', { name: 'Abrir menú' })
    expect(openButton).toHaveAttribute('aria-expanded', 'false')

    await user.click(openButton)
    expect(openButton).toHaveAttribute('aria-expanded', 'true')

    await user.click(screen.getByRole('button', { name: 'Cerrar menú' }))
    expect(openButton).toHaveAttribute('aria-expanded', 'false')
  })
})
