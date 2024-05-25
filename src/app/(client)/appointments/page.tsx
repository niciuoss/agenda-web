import { child, get, getDatabase, ref } from 'firebase/database'

import { app } from '@/service/firebase'

import { Home } from './home'

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

async function getData() {
  const db = ref(getDatabase(app))
  const result = await get(child(db, '/collaborators'))

  if (result.exists()) {
    return result.val()
  }
}

export default async function Appointment() {
  const collaborators: CollaboratorType[] = await getData()

  return <Home collaborators={collaborators} />
}
