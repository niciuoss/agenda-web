import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'

import { CarouselCollaborators } from './components/carousel-collaborators'

export function ScheduleCollaborators() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  return (
    <>
      <div className="flex flex-col gap-6">
        <CarouselCollaborators />

        <h1 className="mt-4 text-2xl font-bold text-foreground">
          Escolha a data
        </h1>
        <div className="flex w-full justify-center">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="w-[278px] rounded-md border"
          />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          Escolha o horário
        </h1>
        <div className="flex flex-col">
          <span>manhã</span>
          <div className="mt-4 flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className="flex h-10 w-14 items-center rounded-lg bg-primary p-2 text-sm font-medium"
              >
                {'0' + (index + 1) + ':00'}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <span>tarde</span>
          <div className="mt-4 flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className="flex h-10 w-14 items-center rounded-lg bg-primary p-2 text-sm font-medium"
              >
                {'0' + (index + 1) + ':00'}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <span>noite</span>
          <div className="mt-4 flex flex-wrap gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <span
                key={index}
                className="flex h-10 w-14 items-center rounded-lg bg-primary p-2 text-sm font-medium"
              >
                {'0' + (index + 1) + ':00'}
              </span>
            ))}
          </div>
        </div>

        <Button variant="default" className="h-12 bg-primary">
          Agendar
        </Button>
      </div>
    </>
  )
}
