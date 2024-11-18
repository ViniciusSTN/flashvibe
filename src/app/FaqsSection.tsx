'use client'

import { faqs } from '@/mocks/faqs'
import { useState } from 'react'

export const FaqsSection = () => {
  const [active, setActive] = useState<number | null>(null)

  function handleClick(index: number) {
    if (active === index) setActive(null)
    else setActive(index)
  }

  return (
    <section className="bg-bluish-white py-16">
      <div className="mx-auto max-w-1248px">
        <h2 className="mb-12 px-6 text-3xl font-bold md:px-10 md:text-center">
          Perguntas Frequentes (FAQs)
        </h2>
        <div className="flex flex-col gap-6 px-6 md:px-10">
          {faqs.map((faq, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className={`relative select-none rounded bg-light-blue200 py-7 pl-6 pr-20 transition-colors ${
                active === index && 'border border-light-blue800'
              }`}
            >
              <div className="relative">
                <p
                  className={`text-2xl font-semibold ${
                    active === index && 'text-secondary-blue'
                  }`}
                >
                  {faq.answer}
                </p>
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/arrow-black.svg?alt=media&token=0afdf37a-4dbd-433f-80b3-a40e3f2e4a1d"
                  alt="seta"
                  className={`absolute -right-12 top-1/2 -translate-y-1/2 transition-transform duration-200 ${
                    active === index ? 'rotate-90' : 'rotate-0'
                  }`}
                />
              </div>
              <div
                className={`transition-max-height overflow-hidden duration-200 ease-out ${
                  active === index ? 'max-h-40' : 'max-h-0'
                }`}
              >
                <p className="pt-4 text-lg font-medium">{faq.response}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
