'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

import './swiperStyle.css'

import { EffectCoverflow, Pagination } from 'swiper/modules'
import { sliders } from '@/mocks/slider'

export const SliderSection = () => {
  return (
    <section className="relative mx-auto mt-16 max-w-1440px px-6">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={4}
        spaceBetween={24}
        loop={true}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="swiper"
      >
        {sliders.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`h-full w-full rounded-lg border-8 border-[${slide.color}]`}
            >
              <p>{slide.text}</p>
              <img src={slide.image} alt={slide.alt} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
