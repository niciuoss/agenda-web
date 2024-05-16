import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useAuth } from '@/hooks/use-auth'

export function SignUp() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [displaName, setDisplayName] = useState('')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSignUp() {
    signUp(displaName, email, password)
    // navigate('/sign-in')
  }

  return (
    <>
      <Helmet title="Cadastro" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Fazer login</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Criar conta grátis
            </h1>
            <p className="text-sm text-muted-foreground">
              Seja um parceiro e comerce suas vendas
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="managerName">Seu nome</Label>
            <Input
              id="managerName"
              type="text"
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Seu e-mail</Label>
            <Input
              id="email"
              type="email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Sua senha</Label>
            <Input
              id="password"
              type="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <Button onClick={() => handleSignUp()} className="w-full">
            Cadastrar
          </Button>
          

          <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
            Ao continuar, você conconrdar com nossos{' '}
            <a className="underline underline-offset-4" href="">
              termos de serviços
            </a>{' '}
            e{' '}
            <a className="underline underline-offset-4" href="">
              políticas de privacidade.
            </a>
          </p>
        </div>
      </div>
    </>
  )
}
