import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import Image from 'next/image'

import Calendar from '@/assets/Calendar.svg'
import Clock from '@/assets/horario.svg'

type CollaboratorType = {
  name: string
  services: {
    description: string
    price: number
    time: number
  }[]
  startHour: string
  endHour: string
  timeService: string
}

interface PropsType {
  setStep: React.Dispatch<React.SetStateAction<number>>
  collaborator: CollaboratorType
  setColl: React.Dispatch<React.SetStateAction<CollaboratorType>>
}

export function CardCollaborator(props: PropsType) {
  const { setStep, collaborator, setColl } = props

  function hanldeClick() {
    setStep(2)
    setColl(collaborator)
  }

  return (
    <>
      <div
        onClick={() => hanldeClick()}
        className="flex h-[7rem] w-[342px] flex-row items-center rounded-lg border border-muted bg-muted px-4 py-4"
      >
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
          <p className="text-lg text-foreground">{collaborator.name}</p>
          <div className="mt-3 flex flex-row">
            <Image src={Calendar} alt="icon" className="w-[0.875rem]" />
            <span className="ml-2.5 text-secondary-foreground ">
              Segunda à sexta
            </span>
          </div>
          <div className="flex flex-row">
            <Image src={Clock} alt="clock" className="w-[0.875rem]" />
            <span className="ml-2.5 text-secondary-foreground ">8h às 18h</span>
          </div>
        </div>
      </div>
    </>
  )
}
