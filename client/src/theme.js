import { createTheme } from '@mui/material';

export const theme = createTheme({
  // currently just for light mode
  palette: {
    // white background and black text and gray divider
    background: {
      main: '#ffffff'
    },
    divider: '#2c2c2c',
    text: {
      primary: '#2c2c2c'
    },
    // this will stay the same in darkmode??
    // accent colors
    primary: {
      main: '#2c2c2c'
    },
    secondary: {
      main: '#E8DB7D'
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
