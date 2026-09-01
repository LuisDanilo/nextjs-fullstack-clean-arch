'use client'

import { type PropsWithChildren } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { theme, type ThemePreference } from '@/app/theme'

interface MuiThemeProps extends PropsWithChildren {
  initialTheme: ThemePreference
}

export function MuiTheme({ children, initialTheme }: MuiThemeProps) {
  return (
      <ThemeProvider 
        theme={theme} 
        defaultMode={initialTheme} 
        storageManager={null}
      >
        <CssBaseline />
          {children}
      </ThemeProvider>
  )
}
