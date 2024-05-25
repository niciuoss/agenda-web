'use client'
import { GoogleLogo } from '@phosphor-icons/react'
import * as FirebaseAuth from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/hooks/use-auth'
import { app, auth } from '@/service/firebase'

export default function SignIn() {
  const { setUser } = useAuth()

  const router = useRouter()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [typeUser, setTypeUser] = useState('client')

  async function handleSignIn() {
    const result = await FirebaseAuth.signInWithEmailAndPassword(
      FirebaseAuth.getAuth(app),
      email,
      password,
    )

    if (result.user) {
      router.push(typeUser === 'client' ? '/appointments' : '/dashboard')
    }
  }

  async function handleSignInWithGoogle() {
    const provider = new FirebaseAuth.GoogleAuthProvider()
    FirebaseAuth.signInWithPopup(auth, provider).then((result) => {
      if (result.user) {
        const { displayName, photoURL, email, uid } = result.user
        console.log('🚀 ~ FirebaseAuth.signInWithPopup ~ photoURL:', photoURL)

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Account.')
        }

        setUser({
          uid,
          email,
          displayName,
          photoURL,
          role: 'client',
        })
        router.push('/appointments')
      }
    })
  }

  return (
    <>
      <div id="recaptcha_container" />
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link href="/sign-up">Novo estabelecimento</Link>
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
          <Button
            variant="destructive"
            onClick={() => handleSignInWithGoogle()}
          >
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
