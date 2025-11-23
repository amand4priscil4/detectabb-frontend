import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#FFDD00',
      light: '#FFED4E',
      dark: '#C7AA00',
      contrastText: '#003D7A'
    },
    secondary: {
      main: '#003D7A',
      light: '#1565C0',
      dark: '#002952',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#00AA13',
      light: '#33BB43',
      dark: '#007A0D'
    },
    error: {
      main: '#E00000',
      light: '#E63333',
      dark: '#A00000'
    },
    warning: {
      main: '#FF9800',
      light: '#FFB333',
      dark: '#C77700'
    },
    background: {
      default: '#F5F5F5',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#003D7A',
      secondary: '#666666'
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#003D7A'
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#003D7A'
    },
    h3: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: '#003D7A'
    },
    body1: {
      fontSize: '1rem',
      color: '#666666'
    },
    button: {
      textTransform: 'none',
      fontWeight: 600
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '12px 24px',
          fontSize: '1rem',
          minHeight: 48
        },
        containedPrimary: {
          backgroundColor: '#FFDD00',
          color: '#003D7A',
          '&:hover': {
            backgroundColor: '#C7AA00'
          }
        }
      }
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12
          }
        }
      }
    }
  }
});