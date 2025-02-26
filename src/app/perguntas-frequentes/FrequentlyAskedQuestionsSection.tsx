'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { Faqs } from '@/components/Faqs'
import { SpinLoader } from '@/components/SpinLoader'
import { getAllFrequentlyAskedQuestions } from '@/data/faqs'
import { FaqsType } from '@/types/faqs'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const FrequentlyAskedQuestionsSection = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [faqs, setFaqs] = useState<FaqsType[]>()

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true)

      const response = await getAllFrequentlyAskedQuestions()

      if (response.success) {
        setFaqs(response.data)
      } else {
        toast.error('Erro ao buscar perguntas frequentes')
      }

      setLoading(false)
    }

    fetchQuestions()
  }, [])

  return (
    <section className="mx-auto mb-24 mt-16 min-h-screen-header max-w-1440px px-6 md:px-10">
      <h1 className="mb-10 text-center text-2xl font-semibold">
        Perguntas frequêntes (FAQS)
      </h1>

      <div className="mb-10 flex flex-col items-start justify-between gap-8 px-6 md:px-10 lg:flex-row">
        <p className="max-w-[820px] font-medium">
          Não encontrou a resposta que esperava? Envie uma mensagem para nosso
          suporte. Nossa equipe responderá o mais rápido possível
        </p>

        <ButtonDefault
          text="Fale conosco"
          type="link"
          link="/fale-conosco"
          paddingy="py-2"
          paddingx="px-10"
          radius="rounded-md"
          tailwind="w-[232px] text-nowrap ml-auto"
        />
      </div>

      {loading && (
        <div className="relative mt-16 flex items-center justify-center">
          <SpinLoader />
        </div>
      )}

      {!loading && faqs && faqs.length > 0 && <Faqs faqs={faqs} />}

      {!loading && faqs && faqs.length === 0 && (
        <p className="text-center">Nenhuma pergunta encontrada</p>
      )}
    </section>
  )
}
