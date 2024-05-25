import '../globals.css'

import { Cake } from 'lucide-react'
import { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'

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
            <div className="grid min-h-screen grid-cols-2 antialiased">
              <div className="flex h-full flex-col justify-between border-r border-foreground/5 bg-muted p-10 text-muted-foreground">
                <div className="flex items-center gap-3 text-lg text-foreground">
                  <Cake className="h-5 w-5" />
                  <span className="font-semibold">agendamento</span>
                </div>
                <footer className="text-sm">
                  Painel do parceiro &copy; agendamento -{' '}
                  {new Date().getFullYear()}
                </footer>
              </div>

              <div className="relative flex flex-col items-center justify-center">
                {children}
              </div>
            </div>
          </ThemeProvider>
        </AuthContextProvider>
      </body>
    </html>
  )
}
