'use client'
import { useState } from 'react'

import { Collaborators } from './collaborators'
import { ScheduleCollaborators } from './schedule-collaborators'

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

export function Home(props: { collaborators: CollaboratorType[] }) {
  const { collaborators } = props
  const [step, setstep] = useState(1)
  const [collaboratorSlected, setCollaboratorSlected] =
    useState<CollaboratorType>([] as unknown as CollaboratorType)
  return (
    <>
      {step === 1 && (
        <Collaborators
          setStep={setstep}
          collaborators={collaborators}
          setColl={setCollaboratorSlected}
        />
      )}
      {step === 2 && (
        <ScheduleCollaborators
          collaborators={collaborators}
          setColl={setCollaboratorSlected}
          coll={collaboratorSlected}
        />
      )}
    </>
  )
}
