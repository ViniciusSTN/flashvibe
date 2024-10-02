'use client' // Adicione isso se o seu componente for renderizado no cliente

import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules'

export const SliderSection = () => {
  return (
    <section className="mx-auto mt-16 max-w-1440px">
      <div className="container">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
          }}
          pagination={{ el: '.swiper-pagination', clickable: true }}
          // navigation={true}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          className="swiper_container"
        >
          <SwiperSlide>
            <div className="flex h-60 w-60 items-center justify-center bg-red-500 text-white">
              Slide 1
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-60 w-60 items-center justify-center bg-blue-500 text-white">
              Slide 2
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-60 w-60 items-center justify-center bg-green-500 text-white">
              Slide 3
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-60 w-60 items-center justify-center bg-yellow-500 text-white">
              Slide 4
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex h-60 w-60 items-center justify-center bg-purple-500 text-white">
              Slide 5
            </div>
          </SwiperSlide>
        </Swiper>

        <div className="swiper-pagination"></div>
      </div>
    </section>
  )
}
