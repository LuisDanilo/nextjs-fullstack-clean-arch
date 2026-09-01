import { createTheme } from '@mui/material/styles'

export type ThemePreference = 'light' | 'dark' |'system'

export const theme = createTheme({
  typography: {
    fontFamily: 'var(--font-geist-sans), Arial, Helvetica, sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
  cssVariables: {
    colorSchemeSelector: 'data-mui-color-scheme',
  },
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
        primary: {
          light: '#5e4ab5',
          main: '#4b3b91',
          dark: '#382c6d',
          contrastText: '#eef6f3',
        },
        secondary: {
          light: '#0ac254',
          main: '#08913f',
          dark: '#05612a',
          contrastText: '#0f1412',
        },
        success: {
          light: '#0ac254',
          main: '#08913f',
          dark: '#05612a',
          contrastText: '#0f1412',
        },
        error: { main: '#d32f2f' },
        background: {
          default: '#eef6f3',
          paper: '#ffffff',
        },
        divider: '#bddbce',
        text: {
          primary: '#0f1412',
          secondary: '#587466',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          light: '#7e6ec4',
          main: '#5e4ab5',
          dark: '#4b3b91',
          contrastText: '#eef6f3',
        },
        secondary: {
          light: '#3df587',
          main: '#0ac254',
          dark: '#08913f',
          contrastText: '#0f1412',
        },
        success: {
          light: '#3df587',
          main: '#0df269',
          dark: '#0ac254',
          contrastText: '#0f1412',
        },
        error: { main: '#ef5350' },
        background: {
          default: '#0f1412',
          paper: '#161d1a',
        },
        divider: '#2c3a33',
        text: {
          primary: '#eef6f3',
          secondary: '#9cc9b6',
        },
      },
    }
  }
})
