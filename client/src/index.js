import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Grid from '@mui/material/Grid';
// import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const root = ReactDOM.createRoot(document.getElementById('root'));
const theme = createTheme({
  palette: {
    primary: {
      main: '#3D3D3D',
    },
    secondary: {
      main: '#282828',
    },
  },
  typography: {
    h1: {
      fontSize: '3rem',
      color: '#E1E1E1',
    },
    h2: {
      fontSize: '2rem',
      color: '#E1E1E1',
    },
    h3: {
      color: '#E1E1E1',
    },
    h4: {
      color: '#E1E1E1',
    },
    h5: {
      color: '#E1E1E1',
    },
    h6: {
      color: '#E1E1E1',
    },
    h7: {
      color: '#E1E1E1',
    }
  },
});
root.render(
  <BrowserRouter>
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
  </BrowserRouter>

);
// reportWebVitals();