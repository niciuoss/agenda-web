import { GoogleLogo } from '@phosphor-icons/react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useAuth } from '@/hooks/use-auth' 
import { auth } from '@/service/firebase'

export function SignIn() {

  const {signIn, signInWithGoogle} = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')


  function handleSignIn() {
    signIn(email, password)
  }

  // export function signIn(email: string, password: string){
  //   return FirebaseAuth.signInWithEmailAndPassword(
  //     FirebaseAuth.getAuth(),
  //     email,
  //     password
  //   )
  // }

  return (
    <>
      <div id="recaptcha_container" />
      <Helmet title="Login" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">Novo estabelecimento</Link>
        </Button>
        <div className="flex w-[350px] flex-col justify-center gap-6">
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
              <Input id="email" type="email"/>
              {/* <Input id="email" type="email" {...register('email')} /> */}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Sua senha</Label>
              <Input id="password" type="password"/>
              {/* <Input id="password" type="password" {...register('password')} /> */}
            </div>

            <Button
              // disabled={isSubmitting}
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

          <div className='text-sm text-right text-muted-foreground'>
            <a>esqueceu a senha?</a>
          </div>
        </div>
      </div>
    </>
  )
}
