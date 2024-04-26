import Icon from '@/assets/Horário.svg'
import { Separator } from '@/components/ui/separator'

import { CardUser } from './card-user'

export function AppointmentList() {
  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <h1 className="text-[2.25rem] text-foreground">Horários agendados</h1>
          <span className="text-[1rem] text-primary">
            Hoje | Dia 06 | Segunda-feira
          </span>
        </div>

        <div className="">
          <span className="font-medium text-secondary-foreground">
            Atendendimento a seguir
          </span>

          <CardUser primary={true} />

          <div className="mt-10 flex w-[40rem] flex-col">
            <span className="font-medium text-secondary-foreground">manhã</span>
            <Separator orientation="horizontal" className="mt-4 h-[1px]" />

            <div className="mt-11 flex items-center">
              <div className="mr-5 flex">
                <img src={Icon} alt="icon" />
                <span className="ml-2.5 text-secondary-foreground">08:00</span>
              </div>
              <CardUser primary={false} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
