import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './styles/global'
import AppProvider from './hooks'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes/Router.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <AppProvider>
        <Router />
      </AppProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
