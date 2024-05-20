import * as React from "react"
import { useState } from 'react'

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export function CarouselCutsHair({ setService }) {
  const services = [
    { name: "Degradê", price: "R$ 30,00", image: "https://i.pinimg.com/550x/0a/cb/b1/0acbb18f79d915be38769a766a539ad9.jpg" },
    { name: "Barba", price: "R$ 18,00", image: "https://i.pinimg.com/550x/0a/cb/b1/0acbb18f79d915be38769a766a539ad9.jpg" },
    { name: "Social", price: "R$ 20,00", image: "https://i.pinimg.com/550x/0a/cb/b1/0acbb18f79d915be38769a766a539ad9.jpg" },
    { name: "Buss cut", price: "R$ 35,00", image: "https://i.pinimg.com/550x/0a/cb/b1/0acbb18f79d915be38769a766a539ad9.jpg" },
    { name: "Undercut", price: "R$ 30,00", image: "https://i.pinimg.com/550x/0a/cb/b1/0acbb18f79d915be38769a766a539ad9.jpg" },
  ];

  const [selectedIndices, setSelectedIndices] = useState(Array(services.length).fill(false));

  const toggleSelection = (index) => {
    const newSelectedIndices = [...selectedIndices];
    newSelectedIndices[index] = !newSelectedIndices[index];
    setSelectedIndices(newSelectedIndices);
    setService(services[index].name);
  };

  return (
    <>
      <Carousel className="w-full" opts={{ dragFree: true }}>
        <CarouselContent>
          {services.map((service, index) => (
            <CarouselItem
              key={index}
              className="grid grid-row-3 h-[22] w-[10.9375rem] basis-2/4 md:basis-1/6 flex-row"
            >
              <div
                className={`h-28 w-[10.9375rem] flex-col ${selectedIndices[index] ? 'bg-primary' : 'bg-muted'} flex gap-2 rounded-xl px-3 py-2`}
              >
                <div className="flex items-center gap-11">
                  <div>
                    <span
                      className={`text-sm font-semibold ${selectedIndices[index] ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                      {service.name}
                    </span>
                    <div>
                      <span className={`text-sm font-semibold ${selectedIndices[index] ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {service.price}
                      </span>
                    </div>
                  </div>
                  <img
                    src={service.image}
                    alt="Corte de cabelo"
                    className="h-10 w-10 rounded-full mr-3"
                  />
                </div>
                <div className="w-full">
                  <Button
                    type="button"
                    onClick={() => toggleSelection(index)}
                    className={`w-full text-sm font-semibold ${selectedIndices[index] ? 'bg-white border border-red-500 text-red-500 font-bold' : 'bg-emerald-500 text-white font-bold'}`}
                    style={{ backgroundColor: selectedIndices[index] ? 'white' : 'rgb(16 185 129)' }}
                  >
                    {selectedIndices[index] ? 'Desmarcar' : 'Selecionar'}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  )
}