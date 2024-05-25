'use client';
import { ptBR } from 'date-fns/locale';
import { CalendarIcon, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

import { CarouselCollaborators } from './components/carousel-collaborators';
import { CarouselCutsHair } from './components/carousel-cuts-hair';

type CollaboratorType = {
  name: string;
  services: {
    description: string;
    price: number;
    time: number;
  }[];
  startHour: string;
  endHour: string;
  timeService: string;
};

interface PropsType {
  collaborators: {
    name: string;
    services: {
      description: string;
      price: number;
      time: number;
    }[];
    startHour: string;
    endHour: string;
    timeService: string;
  }[];
  setColl: React.Dispatch<React.SetStateAction<CollaboratorType>>;
  coll: CollaboratorType;
}

export function ScheduleCollaborators({
  collaborators,
  setColl,
  coll,
}: PropsType) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedHour, setSelectedHour] = useState<string>();
  const [serviceSelected, setServiceSelected] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<boolean[]>(
    Array(coll.services.length).fill(false),
  );
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [selectedTab, setSelectedTab] = useState('manha');
  const [selectedCollaborator, setSelectedCollaborator] = useState<CollaboratorType | null>(null);

  useEffect(() => {
    const total = serviceSelected.reduce((sum, serviceName) => {
      const service = coll.services.find((s) => s.description === serviceName);
      return service ? sum + service.price : sum;
    }, 0);
    setTotalPrice(total);
  }, [serviceSelected]);

  function handleFormatDate(date: Date) {
    const dia = date.getDate();
    const mes = date.getMonth() + 1;
    const ano = date.getFullYear();

    return `${dia < 10 ? '0' + dia : dia}/${mes < 10 ? '0' + mes : mes}/${ano}`;
  }

  function handleSelected(serviceName: string, index: number) {
    if (serviceSelected.includes(serviceName)) {
      setServiceSelected(
        serviceSelected.filter((service) => service !== serviceName),
      );
    } else {
      setServiceSelected((prevState) => [...prevState, serviceName]);
    }
    const newSelectedIndices = [...selectedIndices];
    newSelectedIndices[index] = !newSelectedIndices[index];
    setSelectedIndices(newSelectedIndices);
  }

  function handleRemoveBadge(serviceName: string) {
    const index = coll.services.findIndex(
      (service) => service.description === serviceName,
    );
    if (index !== -1) {
      setServiceSelected(
        serviceSelected.filter((service) => service !== serviceName),
      );
      const newSelectedIndices = [...selectedIndices];
      newSelectedIndices[index] = false;
      setSelectedIndices(newSelectedIndices);
    }
  }

  function timeStringToMinutes(timeString: string) {
    const [hours, minutes] = timeString.split(':').map(Number);
    return hours * 60 + minutes;
  }

  function minutesToTimeString(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
  }

  function generateTimes(start: string, end: string, intervalMinutes: number) {
    const startMinutes = timeStringToMinutes(start);
    const endMinutes = timeStringToMinutes(end);
    const times = [];

    for (let time = startMinutes; time < endMinutes; time += intervalMinutes) {
      times.push(minutesToTimeString(time));
    }

    return times;
  }

  return (
    <>
      <div className="flex flex-col gap-6">
      <CarouselCollaborators
          setColl={(collaborator) => {
            setColl(collaborator);
            setSelectedCollaborator(collaborator);
          }}
          coll={coll}
          collaborators={collaborators}
        />
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          Escolha a data
        </h1>
        <div className="flex justify-center items-center w-full">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-[280px] justify-center text-left font-normal',
                  !date && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? handleFormatDate(date) : <span>Calendário</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-[278px] rounded-md border"
                locale={ptBR}
                showOutsideDays={false}
                defaultMonth={new Date()}
                disabled={[{ dayOfWeek: [0, 1] }, { before: new Date() }]}
              />
            </PopoverContent>
          </Popover>
        </div>
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          Escolha os servicos
        </h1>
        <div className="flex justify-center items-center w-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button className="w-[280px]" variant="outline">
                Exibir servicos
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh]">
              <SheetHeader>
                <SheetTitle>Escolha seu servico abaixo</SheetTitle>
                <SheetDescription>
                  <CarouselCutsHair
                    setService={handleSelected}
                    services={coll.services}
                    selectedIndices={selectedIndices}
                  />
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex flex-wrap justify-center gap-2">
          {serviceSelected &&
            serviceSelected.map((service) => (
              <Badge key={service}>
                {service}
                <div
                  className="ml-1 flex items-center justify-center"
                  style={{ width: '16px', height: '16px' }}
                >
                  <X
                    onClick={() => handleRemoveBadge(service)}
                    size={16}
                    className="cursor-pointer"
                  />
                </div>
              </Badge>
            ))}
        </div>
        <h1 className="mt-4 text-2xl font-bold text-foreground">
          Escolha o horário
        </h1>
        <div className="flex justify-center w-full">
          <Tabs
            defaultValue="manha"
            className="w-[280px]"
            onValueChange={setSelectedTab}
          >
            <TabsList className="w-full justify-center">
              <TabsTrigger
                className="w-[280px] data-[state=active]:bg-primary"
                value="manha"
              >
                Manhã
              </TabsTrigger>
              <TabsTrigger
                className="w-[280px] data-[state=active]:bg-primary"
                value="tarde"
              >
                Tarde
              </TabsTrigger>
              <TabsTrigger
                className="w-[280px] data-[state=active]:bg-primary"
                value="noite"
              >
                Noite
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="manha"
              className="flex flex-wrap mt-[10px] gap-3 w-[280px]"
            >
              {generateTimes(
                coll.startHour,
                '12:00',
                parseInt(coll.timeService),
              ).map((item, index) => (
                <Badge
                  key={index}
                  className={`${
                    selectedHour === item ? 'bg-primary' : 'bg-muted'
                  } cursor-pointer`}
                  onClick={() => setSelectedHour(item)}
                >
                  {item}
                </Badge>
              ))}
            </TabsContent>
            <TabsContent
              value="tarde"
              className="flex flex-wrap gap-3 -mt-[0.15px] w-[280px]"
            >
              {generateTimes('12:00', '18:00', parseInt(coll.timeService)).map(
                (item, index) => (
                  <Badge
                    key={index}
                    className={`${
                      selectedHour === item ? 'bg-primary' : 'bg-muted'
                    } cursor-pointer`}
                    onClick={() => setSelectedHour(item)}
                  >
                    {item}
                  </Badge>
                ),
              )}
            </TabsContent>
            <TabsContent
              value="noite"
              className="flex flex-wrap gap-3 -mt-[0.15px] w-[280px]"
            >
              {generateTimes(
                '18:00',
                coll.endHour,
                parseInt(coll.timeService),
              ).map((item, index) => (
                <Badge
                  key={index}
                  className={`${
                    selectedHour === item ? 'bg-primary' : 'bg-muted'
                  } cursor-pointer `}
                  onClick={() => setSelectedHour(item)}
                >
                  {item}
                </Badge>
              ))}
            </TabsContent>
          </Tabs>
        </div>
        <div className="flex justify-center items-center w-full">
          <Sheet>
            <SheetTrigger asChild>
              <Button 
                variant="default" 
                className="w-[280px] h-12 bg-primary"
                disabled={!date || !selectedHour || serviceSelected.length === 0}
              >
                Agendar
              </Button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[85vh]">
              <SheetHeader>
                <SheetTitle>Detalhes do Agendamento</SheetTitle>
                <SheetDescription>
                  <div className="flex items-center gap-2">
                    
                  </div>
                  <Separator />
                  <div className=" pt-2 flex flex-col gap-2">
                    <div className="text-left">
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-center">
                            <div>
                              {serviceSelected.map((service) => (
                                <span key={service} className="block">
                                  {service}
                                </span>
                              ))}
                            </div>
                            <div className="text-right">
                              <span className="block">
                                {selectedTab.charAt(0).toUpperCase() +
                                  selectedTab.slice(1)}
                              </span>
                              <span className="block">{selectedHour}</span>
                            </div>
                          </div>
                        </CardHeader>
                        <Separator />
                        <CardContent>
                          <div className="text-lg font-medium text-green-700 pt-2">
                            Total:{' '}
                            {Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(totalPrice)}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    <Separator />
                    <div className="flex flex-col gap-2">
                      <span className="text-white text-left">
                        Deixe sua observação abaixo:
                      </span>
                      <Input id="name" placeholder="Sua observação..." />
                    </div>
                    <Separator />
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="secundary"
                        className="w-[280px] text-primary border border-primary"
                      >
                        Cancelar
                      </Button>
                      <Button className="w-[280px]">Agendar</Button>
                    </div>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
}
