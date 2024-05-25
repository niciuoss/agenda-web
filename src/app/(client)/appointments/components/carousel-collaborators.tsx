'use client'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

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
  collaborators: CollaboratorType[]
  setColl: React.Dispatch<React.SetStateAction<CollaboratorType>>
  coll: CollaboratorType
}

export function CarouselCollaborators({
  collaborators,
  setColl,
  coll,
}: PropsType) {
  return (
    <>
      <Swiper
        slidesPerView={'auto'}
        spaceBetween={15}
        freeMode={true}
        modules={[FreeMode]}
        className="w-full"
      >
        {collaborators.map((item, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: '5rem', 
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            onClick={() => setColl(item)}
          >
            <div className="flex flex-col items-center">
              <Avatar className="h-16 w-16">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  className={`h-full w-full rounded-full ${item.name === coll.name ? 'border-[3px] border-primary' : 'opacity-50 hover:opacity-100'}`}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p
                className={`text-sm font-semibold text-center  ${item.name === coll.name ? 'text-primary' : 'text-muted-foreground'}`}
              >
                {item.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
