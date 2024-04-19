import {createBrowserRouter} from 'react-router-dom'
import { Dashboard } from './pages/app/dashboard/dashboard'
import { SignIn } from './pages/auth/sign-in'
import { SignUp } from './pages/auth/sign-up'
import { AppLayout } from './pages/_layoutys/app'
import { AppClientLayout } from './pages/_layoutys/app-client'
import { AuthLayout } from './pages/_layoutys/auth'
import { Orders } from './pages/app/orders/orders'
import { NotFound } from './pages/404'
import { Schedule } from './pages/app/schedule/schedule'
import { Appointment } from './pages/app/appointment/appointment'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: '/orders', element: <Orders /> },
      { path: '/schedule', element: <Schedule /> },
    ],
  },
  {
    path: '/',
    element: <AppClientLayout />,
    children: [{ path: '/appointment', element: <Appointment /> }],
  },
  {
    path: '/', 
    element: <AuthLayout/>,
    children: [
      { path: "/sign-in", element: <SignIn/>, },
      { path: "/sign-up", element: <SignUp/>, }
    ]
  }
])