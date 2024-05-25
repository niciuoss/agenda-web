'use client'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Building, ChevronDown, LogOut, UserCog } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/hooks/use-auth'

type DataType = {
  name: string
  photo: string
}

export function Header() {
  const { user } = useAuth()
  const [data, setData] = useState({} as DataType)
  const router = useRouter()

  useEffect(() => {
    setData({
      name: user?.displayName as string,
      photo: user?.photoURL as string,
    })
  }, [user?.displayName, user?.photoURL])
  const { signOut } = useAuth()

  async function handleSignOut() {
    try {
      await signOut()
      router.push('/sign-in')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <div className="border-b">
      <div className="flex h-24 items-center justify-between px-6">
        <div className="flex flex-col">
          <span className="text-xl text-muted-foreground">Bem vindo,</span>
          <span className="text-xl font-medium text-primary">
            {data?.name ?? ''}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex items-center cursor-pointer">
              <Avatar className="h-14 w-14">
                <AvatarImage
                  src={data?.photo ?? ''}
                  alt="avatar"
                  className="rounded-full"
                />
                <AvatarFallback>
                  {user?.displayName ? user?.displayName[0] : 'CN'}
                </AvatarFallback>
              </Avatar>
              <ChevronDown className="ml-2" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="flex flex-col">
              <span>{user?.displayName}</span>
              <span className="text-xs font-normal text-muted-foreground">
                {user?.email}
              </span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <UserCog className="cursor-pointer text-blue-500 dark:text-blue-500 mr-2 h-4 w-4" />
              <span>Editar perfil</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              className="cursor-pointer text-rose-500 dark:text-rose-400"
              onClick={() => handleSignOut()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sair</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
