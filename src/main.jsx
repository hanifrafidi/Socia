import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline';
import Theme from './Theme'
import { ThemeProvider } from '@mui/material/styles';
import { responsiveFontSizes } from '@mui/material/styles';


import { HashRouter } from 'react-router-dom'

let theme = responsiveFontSizes(Theme);

ReactDOM.render(
  <ThemeProvider theme={theme}>  
    <CssBaseline />
    <HashRouter>
      <App />
    </HashRouter>  
  </ThemeProvider>,
  document.getElementById('root')
)
