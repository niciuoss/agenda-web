import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { NavLink } from "react-router-dom";
import { Collaborators } from './collaborators'
import { ScheduleCollaborators } from './schedule-collaborators'
import { ArrowLeft } from 'lucide-react'

export function Appointment() {
  const [step, setstep] = useState(1)
  return (
    <>
      <Helmet title="Agendamentos" />
      <NavLink to='/orders'>
      <ArrowLeft/>
      </NavLink>
      {step === 1 && <Collaborators setStep={setstep} />}
      {step === 2 && <ScheduleCollaborators />}
    </>
  )
}