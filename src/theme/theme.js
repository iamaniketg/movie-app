import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e50914',
      light: '#ff3d47',
      dark: '#a30000',
    },
    secondary: {
      main: '#f5c518',
      light: '#ffdb4d',
      dark: '#c49700',
    },
    background: {
      default: '#0a0e17',
      paper: '#131a2b',
    },
    text: {
      primary: '#e8eaed',
      secondary: '#9aa0a6',
    },
    error: {
      main: '#ff6b6b',
    },
    success: {
      main: '#51cf66',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.7,
    },
    body2: {
      lineHeight: 1.6,
      color: '#9aa0a6',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(229, 9, 20, 0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(245, 197, 24, 0.04) 0%, transparent 50%)',
          minHeight: '100vh',
        },
        '*::-webkit-scrollbar': {
          width: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: '#0a0e17',
        },
        '*::-webkit-scrollbar-thumb': {
          background: '#2a3040',
          borderRadius: '4px',
        },
        '*::-webkit-scrollbar-thumb:hover': {
          background: '#3a4050',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#131a2b',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-8px) scale(1.02)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(229, 9, 20, 0.1)',
            borderColor: 'rgba(229, 9, 20, 0.3)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: 'rgba(10, 14, 23, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: '8px',
          padding: '8px 24px',
        },
        contained: {
          boxShadow: '0 4px 14px rgba(229, 9, 20, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(229, 9, 20, 0.5)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(229, 9, 20, 0.5)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#e50914',
            },
          },
        },
      },
    },
  },
});

export default theme;
