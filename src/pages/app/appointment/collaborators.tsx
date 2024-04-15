import { CardCollaborator } from './components/card-collaborator'

interface PropsType {
  setStep: React.Dispatch<React.SetStateAction<number>>
}

export function Collaborators(props: PropsType) {
  const { setStep } = props
  return (
    <>
      <div className="flex flex-col gap-7">
        <p className="text-2xl font-medium">Cabeleireiros</p>

        <section className="flex flex-wrap gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <CardCollaborator key={i} setStep={setStep} />
          ))}
        </section>
      </div>
    </>
  )
}
