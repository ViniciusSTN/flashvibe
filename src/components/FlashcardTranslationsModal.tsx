'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { translationSchema } from '@/schemas/flashcard'
import {
  flashcardOverlayAtom,
  newFlashcardDataAtom,
  newFlashcardErrorsAtom,
} from '@/states'
import { FlashcardTranslationsType } from '@/types/flashcard'
import { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

export const FlashcardTranslationsModal = () => {
  const [newFlashcardData, setNewFlashcardData] =
    useRecoilState(newFlashcardDataAtom)

  const [newFlashcardErrors, setNewFlashcardErrors] = useRecoilState(
    newFlashcardErrorsAtom,
  )

  const setOverlay = useSetRecoilState(flashcardOverlayAtom)

  const [word, setWord] = useState<string>('')

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault()

    setNewFlashcardErrors((prevState) => ({ ...prevState, translations: [] }))

    const validation = translationSchema.safeParse({ translation: word })

    if (!validation.success) {
      setNewFlashcardErrors((prevState) => ({
        ...prevState,
        translations: [
          ...(validation.error.formErrors.fieldErrors.translation || []),
        ],
      }))
    } else {
      // enviar 'word' para API de correção gramatical

      const allTranslations: FlashcardTranslationsType[] =
        newFlashcardData.translations || []

      if (
        allTranslations &&
        !allTranslations.some(
          (translation) => translation.textTranslation === word,
        )
      ) {
        setNewFlashcardData((prevState) => ({
          ...prevState,
          translations: [
            ...(prevState.translations || []),
            { id: 0, textTranslation: word },
          ],
        }))
      }

      setOverlay(null)
    }
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

      <form
        action=""
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-12"
      >
        <InputDefault
          name="translation"
          type="text"
          placeholder="Informe a tradução"
          value={word}
          onChange={(event) => setWord(event.target.value)}
          error={newFlashcardErrors.translations}
        />

        <div className="mx-auto">
          <ButtonDefault
            text="Buscar traduções"
            type="button"
            paddingy="py-2"
            paddingx="px-4"
            radius="rounded-md"
            style="outDark"
            onClick={() => setOverlay('searchTranslations')}
          />
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
