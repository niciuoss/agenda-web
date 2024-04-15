import { useState } from 'react'

import { Collaborators } from './collaborators'
import { ScheduleCollaborators } from './schedule-collaborators'

export function Appointment() {
  const [step, setstep] = useState(1)
  return (
    <>
      {step === 1 && <Collaborators setStep={setstep} />}
      {step === 2 && <ScheduleCollaborators />}
    </>
  )
}
