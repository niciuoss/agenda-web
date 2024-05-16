import { useState } from 'react'
import { Helmet } from 'react-helmet-async'

import { Collaborators } from './collaborators'
import { ScheduleCollaborators } from './schedule-collaborators'

export function Appointment() {
  const [step, setstep] = useState(1)
  return (
    <>
      <Helmet title="Agendamentos" />
      {step === 1 && <Collaborators setStep={setstep} />}
      {step === 2 && <ScheduleCollaborators />}
    </>
  )
}
