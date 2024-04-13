import { CardCollaborator } from './components/card-collaborator'

export function Collaborators() {
  return (
    <>
      <div className="flex flex-col gap-7">
        <p className="text-2xl font-medium">Cabeleireiros</p>

        <section className="flex flex-wrap gap-4">
          <CardCollaborator />
          <CardCollaborator />
          <CardCollaborator />
          <CardCollaborator />
          <CardCollaborator />
          <CardCollaborator />
          <CardCollaborator />
          <CardCollaborator />
          <CardCollaborator />
          <CardCollaborator />
          <CardCollaborator />
        </section>
      </div>
    </>
  )
}
