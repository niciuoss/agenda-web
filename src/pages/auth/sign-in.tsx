import { GoogleLogo } from '@phosphor-icons/react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/use-auth'

export function SignIn() {
  const { signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [typeUser, setTypeUser] = useState('client')

  async function handleSignIn() {
    const result = await signIn(email, password, typeUser)
    if (result.user) {
      navigate(typeUser === 'client' ? '/appointment' : '/')
    }
  }

  return (
    <>
      <div id="recaptcha_container" />
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>
        <div className="flex w-[21.875rem] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Acessar painel
            </h1>
            <p className="text-sm text-muted-foreground">
              Acompanhar suas vendas pelo painel do parceiro
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Seu email</Label>
              <Input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Sua senha</Label>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Tabs defaultValue="client" className="w-[21.875rem]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger
                    value="client"
                    onClick={() => setTypeUser('client')}
                  >
                    Cliente
                  </TabsTrigger>
                  <TabsTrigger
                    value="admin"
                    onClick={() => setTypeUser('admin')}
                  >
                    Administrador
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <Button
              onClick={() => handleSignIn()}
              className="w-full"
              type="submit"
            >
              Acessar painel
            </Button>
          </div>
          <Separator />
          <Button variant="destructive" onClick={() => signInWithGoogle()}>
            <GoogleLogo size={32} weight="bold" className="mr-2" /> Login com
            Google
          </Button>

          <div className="text-right text-sm text-muted-foreground">
            <a href="">esqueceu a senha?</a>
          </div>
          <Separator />
          <div className="text-center text-sm text-muted-foreground">
            Deseja trabalhar conosco?{' '}
            <a className="text-sky-500" href="/sign-up-admin">
              {' '}
              Clique aqui{' '}
            </a>{' '}
            e venha fazer parte da nossa equipe.
          </div>
        </div>
      </div>
    </>
  )
}
