import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import StoreProvider from './components/_storages/StoreProvider'
import UserProvider from './components/_storages/UserProvider'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <UserProvider>
    <BrowserRouter>
      <StoreProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </StoreProvider>
    </BrowserRouter>
  </UserProvider>
)
