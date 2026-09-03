import { createTheme,ThemeProvider } from '@mui/material/styles'
import { type RenderOptions } from '@testing-library/react'
import { render } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { type ReactElement } from 'react'

import es from '@/i18n/messages/es.json'

const theme = createTheme()

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  return (
    <NextIntlClientProvider locale='es' messages={es}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </NextIntlClientProvider>
  )
}

export function renderWithTheme(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return render(ui, { wrapper: ThemeWrapper, ...options })
}
