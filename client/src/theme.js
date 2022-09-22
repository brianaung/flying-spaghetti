import { createTheme } from '@mui/material';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2C2C2C'
    },
    secondary: {
      main: '#E8DB7D'
    },
    success: {
      main: '#499f68'
    }
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
  shadows: ['none']
});
