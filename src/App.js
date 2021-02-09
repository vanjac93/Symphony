import React, { Suspense } from 'react'
import Router from './pages/Router'
import 'semantic-ui-css/semantic.min.css'
import { ThemeProvider } from 'styled-components'
import theme from '../public/theme'

export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </Suspense>
  )
}
