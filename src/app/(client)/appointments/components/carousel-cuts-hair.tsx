import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import * as React from 'react';
import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/components/ui/button';

type PropsType = {
  setService: (serviceName: string, index: number) => void;
  services: {
    description: string;
    price: number;
    time: number;
  }[];
  selectedIndices: boolean[];
};

export function CarouselCutsHair({
  setService,
  services,
  selectedIndices,
}: PropsType) {
  return (
    <>
      <Swiper
        direction="vertical"
        slidesPerView={'auto'}
        spaceBetween={15}
        freeMode={true}
        modules={[FreeMode]}
        className="h-[75vh]"
      >
        {services.map((service, index) => (
          <SwiperSlide
            key={index}
            style={{
              height: '10rem',
              width: 'auto',
            }}
          >
            <div
              className={`h-full w-full ${selectedIndices[index] ? 'bg-primary' : 'bg-muted'} flex gap-2 rounded-xl px-3 py-2`}
            >
              <div className="flex flex-col h-full justify-around text-left w-3/5">
                <span
                  className={`text-lg font-semibold ${selectedIndices[index] ? 'text-foreground' : 'text-muted-foreground'}`}
                >
                  {service.description}
                </span>
                <div className="flex flex-col w-full mt-2">
                  <span
                    className={`text-sm font-semibold ${selectedIndices[index] ? 'text-foreground' : 'text-green-500'}`}
                  >
                    {Intl.NumberFormat('pt-br', {
                      style: 'currency',
                      currency: 'BRL',
                    }).format(service.price)}
                  </span>
                  <span
                    className={`text-sm font-semibold ${selectedIndices[index] ? 'text-foreground' : 'text-muted-foreground'}`}
                  >
                    {service.time + ' min'}
                  </span>
                </div>
              </div>
              <div className="flex flex-col w-2/5 items-center justify-around">
                <img
                  src="https://i.pinimg.com/550x/0a/cb/b1/0acbb18f79d915be38769a766a539ad9.jpg"
                  alt="Corte de cabelo"
                  className="h-14 w-14 rounded-full border-2 border-blue-900"
                />
                <Button
                  type="button"
                  onClick={() => setService(service.description, index)}
                  className={`text-sm font-semibold ${selectedIndices[index] ? 'bg-white border border-red-500 text-red-500 font-bold' : 'bg-blue-600 text-white font-bold'}`}
                  style={{
                    backgroundColor: selectedIndices[index]
                      ? 'white'
                      : 'rgb(37,99,235)',
                  }}
                >
                  {selectedIndices[index] ? 'Desmarcar' : 'Selecionar'}
                </Button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
