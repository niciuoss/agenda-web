import { GoogleLogo } from '@phosphor-icons/react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'sonner'
import { string, z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { auth } from '@/service/firebase'
import * as FirebaseController from '@/service/firebase'


// const signInForm = z.object({
//   email: z.string(),
//   password: z.string(),
// })
// type SignInForm = z.infer<typeof signInForm>

export function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = useForm<SignInForm>()

  async function buttonSignIn() {
    setErrorMessage('')
    try{
      await FirebaseController.signIn(email, password)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
      setErrorMessage('error')
    }
  }

  async function buttonReset() {
    setErrorMessage('')
    try{
      await FirebaseController.resetPassword(email)
    } catch (error) {
      console.error(error)
      setErrorMessage('error')
    }
  }

  async function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider()

    signInWithPopup(auth, provider).then((result) => {
      console.log('result', result)
    })
  }

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

          <form className="space-y-4">
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
              onClick={() => buttonSignIn()}
              className="w-full"
              type="submit"
            >
              Acessar painel
            </Button>
          </form>
          <Separator />
          <Button variant="destructive" onClick={() => handleGoogleSignIn()}>
            <GoogleLogo size={32} weight="bold" className="mr-2" /> Login com
            Google
          </Button>

          <div className='text-sm text-right text-muted-foreground'>
            <a onClick={() => buttonReset()}>esqueceu a senha?</a>
          </div>
        </div>
      </div>
    </>
  )
}
