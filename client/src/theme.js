// import { createTheme } from '@mui/material';

export const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // light mode
          background: {
            main: '#fbfefb'
          },
          divider: '#2f2f35',
          text: {
            primary: '#18181b'
          },
          // accent colors
          primary: {
            main: '#27272a'
          },
          secondary: {
            main: '#E8DB7D'
          },
          error: {
            main: '#ce2d4f'
          },
          info: {
            main: '#1c77c3'
          }
        }
      : {
          // dark mode
          background: {
            main: '#18181b'
          },
          divider: '#2f2f35',
          text: {
            primary: '#fbfefb'
          },
          // accent colors
          primary: {
            main: '#27272a'
          },
          secondary: {
            main: '#E8DB7D'
          },
          error: {
            main: '#ce2d4f'
          },
          info: {
            main: '#39a9db'
          }
        })
  },

  typography: {
    fontFamily: ['"Montserrat"', 'Roboto', 'Arial'].join(','),
    h1: {
      fontSize: '40px',
      fontWeight: '700'
    },
    h2: {
      fontSize: '32px',
      fontWeight: '600'
    },
    h3: {
      fontSize: '24px'
    },
    body1: {
      fontSize: '16px'
    },
    body2: {
      fontSize: '14px'
    },
    button: {
      fontWeight: '600'
    }
  },

  shadows: Array(25).fill('none'),

  components: {
    // you can set global styles here
    MuiListItemButton: {
      styleOverrides: {
        root: {
          // use class names or regular css properties
          // e.g.
          // '&.Mui-selected': {
          //   backgroundColor: 'grey',
          // },
        }
      }
    }
  }
});

// export const theme = createTheme(getDesignTokens('light'));
