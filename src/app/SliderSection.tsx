'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import './swiperStyle.css'

import { EffectCoverflow, Pagination } from 'swiper/modules'
import { sliders } from '@/mocks/slider'
import { Charm } from 'next/font/google'

const charm = Charm({ weight: ['700'], subsets: ['latin'] })

export const SliderSection = () => {
  return (
    <section className="relative mx-auto mb-16 max-w-1440px px-6 md:px-10">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        spaceBetween={24}
        loop={true}
        coverflowEffect={{
          rotate: 5,
          stretch: 40,
          depth: 60,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="swiper"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
      >
        {sliders.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className={`h-full w-full rounded-lg border-8 bg-white p-5 ${slide.border} flex justify-evenly ${index % 2 === 0 ? 'flex-col' : 'flex-col-reverse'}`}
            >
              <p className={`${charm.className} text-center text-3xl`}>
                {slide.text}
              </p>
              <div className="flex justify-center object-cover">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="max-h-64 max-w-64"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
