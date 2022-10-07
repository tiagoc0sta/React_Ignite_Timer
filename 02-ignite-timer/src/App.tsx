
import { ThemeProvider } from 'styled-components'
import {BrowserRouter} from 'react-router-dom'
import { Router } from './Router'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { createContext } from 'react'



export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
      
        <Router/>
        </CyclesContext.Provider>
        <GlobalStyle />
      </BrowserRouter>
    </ThemeProvider>
  )
}
