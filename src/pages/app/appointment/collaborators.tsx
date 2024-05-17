import { child, get, getDatabase, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

import { useAuth } from '@/hooks/use-auth'
import { app } from '@/service/firebase'

import { CardCollaborator } from './components/card-collaborator'

interface PropsType {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

type CollaboratorType = {
  name: string
}

export function Collaborators(props: PropsType) {
  const { setStep } = props
  const [data, setData] = useState([])

  const { user } = useAuth()

  const db = ref(getDatabase(app))

  async function getCollaborators() {
    const result = await get(
      child(db, 'establishments/' + user?.uid + '/collaborators'),
    )
    if (result.exists()) {
      setData(result.val())
    }
  }

  useEffect(() => {
    getCollaborators()
  }, [])

  return (
    <>
      <div className="flex flex-col gap-7">
        <p className="text-2xl font-medium">Cabeleireiros</p>

        <section className="flex flex-wrap gap-4">
          {data.map((collaborator: CollaboratorType) => (
            <CardCollaborator
              key={collaborator.name}
              setStep={setStep}
              collaborator={collaborator.name}
            />
          ))}
        </section>
      </div>
    </>
  )
}
