import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

export function CarouselCollaborators() {
  return (
    <>
      <Carousel className="w-full" opts={{ dragFree: true }}>
        <CarouselContent className="-ml-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem
              key={index}
              className="h-12 w-[10.9375rem] basis-3/5 md:basis-1/6"
            >
              <div
                className={`h-12 w-[10.9375rem] ${index === 0 ? 'bg-primary' : 'bg-muted'} flex items-center gap-2 rounded-xl px-3 py-2`}
              >
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    className="h-8 w-8 rounded-full"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <p
                  className={`text-sm font-semibold ${index === 0 ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  Mc Lovin
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  )
}
