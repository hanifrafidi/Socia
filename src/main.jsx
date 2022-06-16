import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline';
import Theme from './Theme'
import { ThemeProvider } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material/styles';


import { HashRouter, BrowserRouter } from 'react-router-dom'

let theme = responsiveFontSizes(Theme);

ReactDOM.render(
  <ThemeProvider theme={theme}>  
    <CssBaseline />
    <BrowserRouter>
      <App />
    </BrowserRouter>  
  </ThemeProvider>,
  document.getElementById('root')
)
