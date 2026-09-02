'use client'

import TableChartIcon from '@mui/icons-material/TableChart'
import ViewKanbanIcon from '@mui/icons-material/ViewKanban'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Stack from '@mui/material/Stack'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { useTranslations } from 'next-intl'

export type ViewMode = 'table' | 'kanban'

const viewOptions: Array<{ value: ViewMode; labelKey: string; icon: typeof TableChartIcon }> = [
  { value: 'table', labelKey: 'views.table', icon: TableChartIcon },
  { value: 'kanban', labelKey: 'views.kanban', icon: ViewKanbanIcon },
]

interface ViewSwitchProps {
  view: ViewMode
  onChange: (view: ViewMode) => void
}

export function ViewSwitch({ view, onChange }: ViewSwitchProps) {
  const t = useTranslations()
  return (
    <>
      <ToggleButtonGroup
        value={view}
        exclusive
        onChange={(_, v) => v && onChange(v)}
        size='small'
        sx={{ display: { xs: 'none', lg: 'flex' } }}
      >
        {viewOptions.map(({ value, labelKey, icon: Icon }) => (
          <ToggleButton key={value} value={value} sx={{ gap: 0.75, textTransform: 'none' }}>
            <Icon fontSize='small' />
            {t(labelKey)}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>

      <Stack sx={{ 
        display: { xs: 'flex', lg: 'none' }, 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1200, 
        borderTop: 1, 
        borderColor: 'divider'
      }}>
        <BottomNavigation
          value={view}
          onChange={(_, v) => v && onChange(v)}
          showLabels
        >
          {viewOptions.map(({ value, labelKey, icon: Icon }) => (
            <BottomNavigationAction key={value} value={value} label={t(labelKey)} icon={<Icon />} />
          ))}
        </BottomNavigation>
      </Stack>
    </>
  )
}
