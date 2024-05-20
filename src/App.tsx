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
        <ThemeProvider storageKey="barbershop-theme" defaultTheme="dark">
          <Helmet titleTemplate="%s | barber.shop" />
          <Toaster richColors />
          <RouterProvider router={router} />
        </ThemeProvider>
      </AuthContextProvider>
    </HelmetProvider>
  )
}
