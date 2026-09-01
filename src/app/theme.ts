import { createTheme } from '@mui/material/styles'

export type ThemePreference = 'light' | 'dark' | 'system'

declare module '@mui/material/styles' {
  interface Palette {
    pending: Palette['primary']
    inProgress: Palette['primary']
    review: Palette['primary']
    blocked: Palette['primary']
    done: Palette['primary']
  }
  interface PaletteOptions {
    pending?: PaletteOptions['primary']
    inProgress?: PaletteOptions['primary']
    review?: PaletteOptions['primary']
    blocked?: PaletteOptions['primary']
    done?: PaletteOptions['primary']
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, Helvetica, sans-serif',
  },
  shape: { borderRadius: 8 },
  cssVariables: { colorSchemeSelector: 'data-mui-color-scheme' },
  components: {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => ({
          textTransform: 'none',
          ...theme.applyStyles('dark', {
            '&.MuiButton-text, &.MuiButton-outlined': {
              color: theme.vars.palette.text.primary,
            },
          }),
        }),
      },
    },
  },
  colorSchemes: {
    light: {
      palette: {
        primary: { main: '#4b3b91' },
        secondary: { main: '#08913f' },
        background: { default: '#eef6f3', paper: '#ffffff' },
        divider: '#bddbce',
        text: { primary: '#0f1412', secondary: '#587466' },

        // task status colors
        pending: { main: '#78716c' },     // gray
        inProgress: { main: '#7c3aed' },  // violet
        review: { main: '#d97706' },      // amber
        blocked: { main: '#9f1239' },     // wine/red
        done: { main: '#08913f' },        // green
      },
    },
    dark: {
      palette: {
        primary: { main: '#5e4ab5' },
        secondary: { main: '#0ac254' },
        background: { default: '#0f1412', paper: '#161d1a' },
        divider: '#2c3a33',
        text: { primary: '#eef6f3', secondary: '#9cc9b6' },

        // task status colors
        pending: { main: '#a8a29e' },
        inProgress: { main: '#a78bfa' },
        review: { main: '#fbbf24' },
        blocked: { main: '#f43f5e' },
        done: { main: '#0ac254' },
      },
    },
  },
})
