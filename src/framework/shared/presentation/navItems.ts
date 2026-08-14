import { ListChecks, CheckCircle2, Settings, type LucideIcon } from 'lucide-react'

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { label: 'Tareas', href: '/', icon: ListChecks },
  { label: 'Completados', href: '/completed', icon: CheckCircle2 },
  { label: 'Configuración', href: '/settings', icon: Settings },
]
