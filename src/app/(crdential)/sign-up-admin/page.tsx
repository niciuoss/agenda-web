'use client'

import * as FirebaseAuth from 'firebase/auth'
import { getDatabase, push, ref } from 'firebase/database'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { app } from '@/service/firebase'

export default function SignUpEstablishment() {
  const router = useRouter()

  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [address, setAddress] = useState('')

  async function handleSignUp() {
    try {
      const result = await FirebaseAuth.createUserWithEmailAndPassword(
        FirebaseAuth.getAuth(),
        email,
        password,
      )
      const { uid } = result.user

      const db = getDatabase(app)
      await push(ref(db, 'establishments/' + uid), {
        displayName,
        email,
        role: 'admin',
        address,
      }).then(() => router.push('/sign-in'))
    } catch (error) {
      console.log('🚀 ~ AuthContextProvider ~ error:', error)
    }
  }

  return (
    <>
      <div className="p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link href="/sign-in">Fazer login</Link>
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

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="managerName">Nome da empresa</Label>
              <Input
                id="managerName"
                type="text"
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Seu endereço</Label>
              <Input
                id="address"
                type="text"
                placeholder="Rua nº, bairro, cidade - estado"
                onChange={(e) => setAddress(e.target.value)}
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
      </div>
    </>
  )
}
