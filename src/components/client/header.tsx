import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useAuth } from '@/hooks/use-auth'

export function Header() {
  const user = useAuth()
  
  return (
    <div className="border-b">
      <div className="flex h-24 items-center justify-between px-6">
        <div className="flex flex-col">
          <span className="text-xl text-muted-foreground">Bem vindo,</span>
          <span className="text-xl font-medium text-primary">
            {user.user?.displayName}
          </span>
        </div>
        <Avatar className="h-14 w-14">
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="avatar"
            className="rounded-full"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  )
}
