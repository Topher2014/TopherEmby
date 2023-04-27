// import './index.css';
// import reportWebVitals from './reportWebVitals';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  palette: {
    primary: {
      main: '#2e7d32',
    },
    secondary: {
      main: '#ff3d00',
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: 38,
          fontWeight: 'bold',
          marginBottom: 16,
          display: 'flex',
          fontFamily: 'Arial'
        },
      },
      variants:[
        {
          props: {variant: 'secondary'},
          style: {
            fontSize: 24,
          }
        }
      ] 
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: '16px 0',
          fontWeight: 'bold',
          '&.MuiButton-primary': {
            color: 'white',
            background: '#2e7d32',
            '&:hover': {
              background: '#1b5e20',
            },
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: '16px 0',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          margin: '4px',
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#fafafa',
          },
        },
      },
    },
  },
});
root.render(
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </BrowserRouter>

);