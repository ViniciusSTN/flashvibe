'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { getExamplesSentences } from '@/data/flashcards'
import { flashcardOverlayAtom, newFlashcardDataAtom } from '@/states'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState, useSetRecoilState } from 'recoil'

export const SearchFlashcardExamplesModal = () => {
  const [newFlashcardData, setNewFlashcardData] =
    useRecoilState(newFlashcardDataAtom)
  const setOverlay = useSetRecoilState(flashcardOverlayAtom)

  const [examples, setExamples] = useState<string[]>([])
  const [checked, setChecked] = useState<string[]>([])

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (checked.length === 0) {
      toast.warning('Nenhuma opção selecionada')
    } else {
      setNewFlashcardData((prevState) => ({
        ...prevState,
        examples: [
          ...(prevState.examples || []),
          ...checked
            .filter(
              (example) =>
                !(prevState.examples || []).some(
                  (existingExample) => existingExample.textExample === example,
                ),
            )
            .map((example) => ({ id: 0, textExample: example })),
        ],
      }))

      setOverlay(null)
    }
  }

  useEffect(() => {
    // buscar opções de exemplos na API
    const fetchExamples = async () => {
      const response = await getExamplesSentences(newFlashcardData.keyword)

      if (response.success && response.examples.length > 0) {
        setExamples(response.examples.map((example) => example.sourceSentence))
      } else {
        toast.warning('Não foram encontrados exemplos')
      }
    }

    fetchExamples()
  }, [newFlashcardData.keyword])

  function handleSelectExample(translation: string) {
    if (!checked.includes(translation))
      setChecked((prevState) => [...prevState, translation])
    else setChecked(checked.filter((word) => word !== translation))
  }

  return (
    <div className="fixed left-1/2 top-1/2 z-50 w-[80%] -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-8 shadow-very-clean vsm:w-auto">
      <h3 className="mb-6 text-center text-xl font-medium">
        Adicionar exemplos de uso
      </h3>

      <p className="mb-6 text-center text-light-gray500">
        Exemplo encontrados para
        <span className="font-medium"> {newFlashcardData.keyword}</span>
      </p>

      <p className="mb-1 text-center text-light-gray500">
        Selecione os exemplos que deseja adicionar
      </p>

      <form action="" onSubmit={handleFormSubmit}>
        <div className="mb-8 max-h-60 max-w-464px overflow-y-scroll rounded-lg border border-light-gray225">
          <ul>
            {examples.map((translation, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleSelectExample(translation)}
                  className={`w-full border-b border-light-gray225 p-3 ${
                    checked.includes(translation)
                      ? 'bg-clean-blue700'
                      : 'bg-clean-blue200'
                  }`}
                >
                  <input type="checkbox" className="hidden" />
                  {translation}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap justify-center gap-6 vsm:flex-nowrap">
          <ButtonDefault
            text="Cancelar"
            type="button"
            paddingy="py-2"
            radius="rounded-md"
            style="outDark"
            tailwind="w-[178px] h-[42px]"
            onClick={() => setOverlay(null)}
          />

          <ButtonDefault
            text="Confirmar"
            type="button"
            paddingy="py-2"
            radius="rounded-md"
            tailwind="w-[178px] h-[42px]"
            submit
          />
        </div>
      </form>
    </div>
  )
}
