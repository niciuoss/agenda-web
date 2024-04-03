import Icon from '@/assets/Horário.svg'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Label } from '@/components/ui/label'

export function CardUser(props: { primary: boolean }) {
  const { primary } = props

  return (
    <div className="mt-5 flex h-[7rem] w-[40rem] flex-row items-center justify-between rounded-lg border border-muted bg-muted px-6 py-4">
      <div className="flex flex-row items-center">
        <Avatar className="h-20 w-20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Label className="ml-4 text-[1.5rem] text-foreground">
          Tibika MacLovin
        </Label>
      </div>

      {primary && (
        <div className="flex items-end">
          <img src={Icon} alt="icon" />
          <span className="ml-2.5 text-secondary-foreground">08:00</span>
        </div>
      )}
    </div>
  )
}
