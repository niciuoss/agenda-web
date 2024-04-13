import { useState } from 'react'

import { Collaborators } from './collaborators'
import { ScheduleCollaborators } from './schedule-collaborators'

export function Appointment() {
  const [step, setstep] = useState(2)
  return (
    <>
      {step === 1 && <Collaborators />}
      {step === 2 && <ScheduleCollaborators />}
    </>
  )
}
