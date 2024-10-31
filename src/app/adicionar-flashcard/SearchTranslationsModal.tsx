'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { flashcardOverlayAtom, newFlashcardDataAtom } from '@/states'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState, useSetRecoilState } from 'recoil'

export const SearchTranslationsModal = () => {
  const [newFlashcardData, setNewFlashcardData] =
    useRecoilState(newFlashcardDataAtom)
  const setOverlay = useSetRecoilState(flashcardOverlayAtom)

  const [translations, setTranslations] = useState<string[]>([])
  const [checked, setChecked] = useState<string[]>([])

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault()

    if (checked.length === 0) {
      toast.warning('Nenhuma opção selecionada')
    } else {
      setNewFlashcardData((prevState) => ({
        ...prevState,
        translations: [
          ...(prevState.translations || []),
          ...checked.filter(
            (translation) =>
              !(prevState.translations || []).includes(translation),
          ),
        ],
      }))

      setOverlay(null)
    }
  }

  useEffect(() => {
    // buscar opções de tradução na API

    const translations = [
      'cada',
      'todo',
      'sempre',
      'qualquer',
      'tudo',
      'cada um',
      'todas as',
    ]

    setTranslations(translations)
  }, [])

  function handleSelectTranslation(translation: string) {
    if (!checked.includes(translation))
      setChecked((prevState) => [...prevState, translation])
    else setChecked(checked.filter((word) => word !== translation))
  }

  return (
    <div className="fixed left-1/2 top-1/2 z-50 w-[80%] -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-8 shadow-very-clean vsm:w-auto">
      <h3 className="mb-6 text-center text-xl font-medium">
        Adicionar traduções
      </h3>

      <p className="mb-6 text-center text-light-gray500">
        Tradução para a palavra
        <span className="font-medium"> {newFlashcardData.keyword}</span>
      </p>

      <p className="mb-1 text-center text-light-gray500">
        Selecione as traduções que deseja adicionar
      </p>

      <form action="" onSubmit={handleFormSubmit}>
        <div className="mb-8 max-h-64 max-w-464px overflow-y-scroll rounded-lg border border-light-gray225">
          <ul className="flex flex-wrap items-center justify-center gap-2 px-6 py-8">
            {translations.map((translation, index) => (
              <li key={index}>
                <button
                  type="button"
                  onClick={() => handleSelectTranslation(translation)}
                  className={`rounded-md border border-clean-blue900 px-5 py-2 ${
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
