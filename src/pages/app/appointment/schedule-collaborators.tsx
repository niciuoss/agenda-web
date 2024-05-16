import { useState } from 'react'
import { format } from "date-fns"

import { Button } from '@/components/ui/button'
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from '@/components/ui/calendar'
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

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
        <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="w-[278px] rounded-md border"
            />
          </PopoverContent>
        </Popover>
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
