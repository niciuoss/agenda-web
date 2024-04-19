import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

import Calendar from '@/assets/Calendar.svg'
import Clock from '@/assets/Horário.svg'

interface PropsType {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export function CardCollaborator(props: PropsType) {
  const {setStep} = props
  return (
    <>
      <div onClick={() => setStep(2)} className="flex h-[7rem] w-[342px] flex-row items-center rounded-lg border border-muted bg-muted px-4 py-4">
        <div className="flex flex-row items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src="https://github.com/shadcn.png"
              className="rounded-full"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>

        <div className="ml-5 flex flex-col">
          <p className="text-lg text-foreground">Tibika McLovin</p>
          <div className="mt-3 flex flex-row">
            <img src={Calendar} alt="icon" className="w-[0.875rem]" />
            <span className="ml-2.5 text-secondary-foreground ">
              Segunda à sexta
            </span>
          </div>
          <div className="flex flex-row">
            <img src={Clock} alt="icon" className="w-[0.875rem]" />
            <span className="ml-2.5 text-secondary-foreground ">8h às 18h</span>
          </div>
        </div>
      </div>
    </>
  )
}
