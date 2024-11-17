'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { exampleSchema } from '@/schemas/flashcard'
import {
  flashcardOverlayAtom,
  newFlashcardDataAtom,
  newFlashcardErrorsAtom,
} from '@/states'
import { FlashcardExampleType } from '@/types/flashcard'
import { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'

export const EditFlashcardExamplesModal = () => {
  const [newFlashcardData, setNewFlashcardData] =
    useRecoilState(newFlashcardDataAtom)

  const [newFlashcardErrors, setNewFlashcardErrors] = useRecoilState(
    newFlashcardErrorsAtom,
  )

  const setOverlay = useSetRecoilState(flashcardOverlayAtom)

  const [example, setExample] = useState<string>('')

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault()

    setNewFlashcardErrors((prevState) => ({ ...prevState, examples: [] }))

    const validation = exampleSchema.safeParse({ example })

    if (!validation.success) {
      setNewFlashcardErrors((prevState) => ({
        ...prevState,
        examples: [...(validation.error.formErrors.fieldErrors.example || [])],
      }))
    } else {
      // enviar 'example' para API de correção gramatical

      const newExample: FlashcardExampleType = {
        id: 0,
        textExample: example,
      }

      const allExamples = newFlashcardData.examples

      if (!allExamples.some((ex) => ex.textExample === example)) {
        setNewFlashcardData((prevState) => ({
          ...prevState,
          examples: [...allExamples, newExample],
        }))
      }

      setOverlay(null)
    }
  }

  return (
    <div className="fixed left-1/2 top-1/2 z-50 w-[80%] -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-8 shadow-very-clean vsm:w-auto">
      <h3 className="mb-6 text-center text-xl font-medium">
        Adicionar exemplos de uso
      </h3>

      <p className="mb-6 text-center text-light-gray500">
        Exemplo de uso da palavra
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
          placeholder="Informe o exemplo"
          value={example}
          onChange={(event) => setExample(event.target.value)}
          error={newFlashcardErrors.examples}
        />

        <div className="mx-auto">
          <ButtonDefault
            text="Buscar exemplos"
            type="button"
            paddingy="py-2"
            paddingx="px-4"
            radius="rounded-md"
            style="outDark"
            onClick={() => setOverlay('searchExamples')}
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
