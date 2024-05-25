import '../globals.css'

import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

import { Header } from '@/components/header'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { AuthContextProvider } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Agenda online',
  description: 'Agenda online',
}

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <AuthContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex min-h-screen flex-col antialiased">
              <Header />

              <div className="flex flex-1 flex-col gap-4 p-8 pt-6">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
