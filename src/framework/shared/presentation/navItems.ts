import { Checklist as ListChecksIcon, CheckCircle as CheckCircleIcon, Settings as SettingsIcon, type SvgIconComponent } from '@mui/icons-material'

export interface NavItem {
  label: string
  href: string
  icon: SvgIconComponent
}

export const navItems: Array<NavItem> = [
  { label: 'Tareas', href: '/', icon: ListChecksIcon },
  { label: 'Completados', href: '/completed', icon: CheckCircleIcon },
  { label: 'Configuración', href: '/settings', icon: SettingsIcon },
]
