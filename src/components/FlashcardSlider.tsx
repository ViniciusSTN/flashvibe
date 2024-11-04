'use client'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/pagination'
import '../swipper/flashcardExamples.css'

import { FlashcardSliderType } from '@/types/flashcard'
import { Pagination } from 'swiper/modules'

export const FlashcardSlider: FlashcardSliderType = ({ sliders }) => {
  return (
    <div className="relative max-w-[640px]">
      <Swiper
        slidesPerView={3}
        centeredSlides={true}
        spaceBetween={20}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="mySwiper"
        loop={true}
        // autoplay={true}
        breakpoints={{
          0: {
            slidesPerView: 1, // Menor que 610px
          },
          610: {
            slidesPerView: 2, // Entre 610px e 1023px
          },
          1024: {
            slidesPerView: 3, // Maior que 1024px
          },
        }}
      >
        {sliders.map((image, index) => (
          <SwiperSlide key={index}>
            {typeof image === 'string' && (
              <img
                src={image}
                alt={image}
                className="object-cover object-center"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
