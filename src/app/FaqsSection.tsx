'use client'

import { Faqs } from '@/components/Faqs'
import { homeFaqs } from '@/mocks/faqs'

export const FaqsSection = () => {
  return (
    <section className="bg-bluish-white py-16">
      <div className="mx-auto max-w-1248px">
        <h2 className="mb-12 px-6 text-3xl font-bold md:px-10 md:text-center">
          Perguntas Frequentes (FAQs)
        </h2>
        <div className="flex flex-col gap-6 px-6 md:px-10">
          <Faqs faqs={homeFaqs} />
        </div>
      </div>
    </section>
  )
}
