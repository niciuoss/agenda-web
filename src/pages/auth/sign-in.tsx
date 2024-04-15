import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signInForm = z.object({
  cpf: z.string(),
  password: z.string(),
})

type SignInForm = z.infer<typeof signInForm>

export function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignInForm>()

  async function handleSignIn(data: SignInForm) {
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success('Enviamos um link de autenticação para seu email.', {
        action: {
          label: 'Reenviar',
          onClick: () => handleSignIn(data),
        },
      })
    } catch {
      toast.error('Erro ao fazer login.')
    }
  }

  function whatsapp() {
    fetch('https://graph.facebook.com/v18.0/229084290284887/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer EAAZAjdvm6Bn8BO7vZBnPhwmfMY3bMZCdkNPFj9jpSvbwxUpabRYnZAJMDNrxbvgisQFdOdHiKKV9ydEGZCNbKF6LVKXv2AHwfJCJQprd3D3E0WDyRXXuxQkYUvcUK5CEc5oZB9JrDyRY6PEedjBTxqTPYI47053mnDDkdHuSAKfwxU1Cwf2nFK8i67jCx9S0MsVeoRE3Hk2ngxMe6aSAwZD',
      },
      body: '{ "messaging_product": "whatsapp", "to": "5585992004669", "type": "template", "template": { "name": "hello_world", "language": { "code": "en_US" } } }',
    })
  }

  return (
    <>
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

          <form onSubmit={handleSubmit(handleSignIn)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cpf">Seu cpf</Label>
              <Input id="cpf" type="cpf" {...register('cpf')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Sua senha</Label>
              <Input id="password" type="password" {...register('password')} />
            </div>

            <Button
              disabled={isSubmitting}
              // onClick={() => whatsapp()}
              className="w-full"
              type="submit"
            >
              Acessar painel
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
