import { CheckCircle as CheckCircleIcon, Checklist as ListChecksIcon, Settings as SettingsIcon, type SvgIconComponent } from '@mui/icons-material'

export interface NavItem {
  labelKey: string
  href: string
  icon: SvgIconComponent
}

export const navItems: Array<NavItem> = [
  { labelKey: 'sidebar.tasks', href: '/', icon: ListChecksIcon },
  { labelKey: 'sidebar.completed', href: '/completed', icon: CheckCircleIcon },
  { labelKey: 'sidebar.settings', href: '/settings', icon: SettingsIcon },
]
