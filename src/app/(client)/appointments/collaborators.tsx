'use client'

import { CardCollaborator } from './components/card-collaborator'

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
  collaborators: {
    name: string
    services: {
      description: string
      price: number
      time: number
    }[]
    startHour: string
    endHour: string
    timeService: string
  }[]
  setColl: React.Dispatch<React.SetStateAction<CollaboratorType>>
}

export function Collaborators(props: PropsType) {
  const { setStep, collaborators, setColl } = props

  return (
    <>
      <div className="flex flex-col gap-7">
        <p className="text-2xl font-medium">Cabeleireiros</p>

        <section className="flex flex-wrap gap-4">
          {collaborators.map((collaborator: CollaboratorType) => (
            <CardCollaborator
              key={collaborator.name}
              setStep={setStep}
              collaborator={collaborator}
              setColl={setColl}
            />
          ))}
        </section>
      </div>
    </>
  )
}
