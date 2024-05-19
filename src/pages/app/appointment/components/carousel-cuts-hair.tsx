import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

export function CarouselCutsHair() {
  return (
    <>
      <Carousel className="w-full" opts={{ dragFree: true }}>
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="grid grid-row-3 h-[22] w-[10.9375rem] basis-2/4 md:basis-1/6 flex-row"
            >
              <div
                className={`h-28 w-[10.9375rem] flex-col ${index === 0 ? 'bg-primary' : 'bg-muted'} flex gap-2 rounded-xl px-3 py-2`}
              >
                <div className="flex items-center gap-11">
                <div>
                    <span
                      className={`text-sm font-semibold ${index === 0 ? 'text-foreground' : 'text-muted-foreground'}`}
                    >
                      Degradê
                    </span>
                    <div>
                      <span className={`text-sm font-semibold ${index === 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                        R$ 30,00
                      </span>
                    </div>
                  </div>
                  <img
                    src="https://i.pinimg.com/550x/0a/cb/b1/0acbb18f79d915be38769a766a539ad9.jpg"
                    alt="Corte de cabelo"
                    className="h-10 w-10 rounded-full mr-3" 
                  />
                </div>
                <div className="">
                  <Button type="submit" className={`bg-emerald-500 w-full text-sm font-semibold ${index === 0 ? 'text-foreground' : 'text-muted-foreground'}`}>
                    Selecionar
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