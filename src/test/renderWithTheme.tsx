import { type ReactElement } from 'react'
import { type RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const theme = createTheme()

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export function renderWithTheme(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: ThemeWrapper, ...options })
}
