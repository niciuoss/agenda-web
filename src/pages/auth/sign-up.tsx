import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { useState } from 'react'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import * as FirebaseController from '@/service/firebase'

// const signUpForm = z.object({
//   restaurantName: z.string(),
//   managerName: z.string(),
//   phone: z.string(),
//   email: z.string().email(),
// })

// type SignUpForm = z.infer<typeof signUpForm>

export function SignUp() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const navigate = useNavigate()

  async function buttonSignUp() {
    setErrorMessage('')
    try{
      await FirebaseController.signUp(email, password)
      setIsAuthenticated(true)
    } catch (error) {
      console.error(error)
      setErrorMessage('error')
    }
  }

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { isSubmitting },
  // } = useForm<SignUpForm>()

  // async function handleSignUp(data: SignUpForm) {
  //   try {
  //     await new Promise((resolve) => setTimeout(resolve, 2000))

  //     toast.success('Restaurante cadastrado com sucesso.', {
  //       action: {
  //         label: 'Login',
  //         onClick: () => navigate('/sign-in'),
  //       },
  //     })
  //   } catch {
  //     toast.error('Erro ao cadastrar restaurante.')
  //   }
  // }

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
              <Label htmlFor="restaurantName">Nome do estabelecimento</Label>
              <Input
                id="restaurantName"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerName">Seu nome</Label>
              <Input
                id="managerName"
                type="text"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Seu e-mail</Label>
              <Input 
                id="email" 
                type="email" 
                onChange={event => setEmail(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Sua senha</Label>
              <Input 
                id="password" 
                type="password"
                onChange={event => setPassword(event.target.value)}
              />
            </div>

            <Button onClick={() => buttonSignUp()} className="w-full">
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
