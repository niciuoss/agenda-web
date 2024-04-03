export function AppointmentList() {
  return (
    <>
      <div className="flex flex-col gap-12">
        <div className="flex flex-col gap-3">
          <h1 className="text-[2.25rem] text-foreground">Horários agendados</h1>
          <span className="text-[1rem] text-primary">
            Hoje | Dia 06 | Segunda-feira
          </span>
        </div>

        <div className="">
          <span className="bg-card text-secondary-foreground">
            Atendendimento a seguir
          </span>

          <div className="h-[7rem] w-[40rem]"></div>
        </div>
      </div>
    </>
  )
}
