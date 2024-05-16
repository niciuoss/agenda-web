import './global.css'

import { Helmet, HelmetProvider } from 'react-helmet-async'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'

import { ThemeProvider } from './components/theme/theme-provider'
import { AuthContextProvider } from './context/AuthContext'
import { router } from './routes'
export function App() {
  return (
    <HelmetProvider>
      <AuthContextProvider>
        <ThemeProvider storageKey="pizzashop-theme" defaultTheme="dark">
          <Helmet titleTemplate="%s | pizza.shop" />
          <Toaster richColors />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthContextProvider>
    </HelmetProvider>
  )
}
