'use client'
import { useState } from 'react'

import { Calendar } from '@/components/ui/calendar'

import { AppointmentList } from './appointment-list'

export default function Schedule() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <>
      <div className="flex w-full justify-center gap-10">
        <div className="flex flex-col">
          <AppointmentList />
        </div>

        <div>
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </div>
    </>
  )
}
