'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { frontSchema } from '@/schemas/flashcard'
import {
  flashcardOverlayAtom,
  newFlashcardDataAtom,
  newFlashcardErrorsAtom,
} from '@/states'
import { NewFlashcardErrorsType } from '@/types/flashcard'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { TranslationsModal } from './TranslationsModal'
import { SearchTranslations } from './SearchTranslations'

export const AddFlashcardSection = () => {
  const [flashcardData, setFlashcardData] = useRecoilState(newFlashcardDataAtom)

  const [errors, setErrors] = useRecoilState<NewFlashcardErrorsType>(
    newFlashcardErrorsAtom,
  )

  const [overlay, setOverlay] = useRecoilState(flashcardOverlayAtom)

  const [keywordOptions, setKeywordOptions] = useState<string[]>([])

  function handleFrontChange(event: React.ChangeEvent<HTMLInputElement>) {
    clearError('front')

    setFlashcardData((prevState) => ({
      ...prevState,
      front: event.target.value,
      keyword: '',
    }))
  }

  function handleFrontFinished() {
    const validation = frontSchema.safeParse({
      front: flashcardData.front,
    })

    if (validation.success) {
      // API de correção gramatical

      const keywords = Array.from(
        new Set(flashcardData.front.toLowerCase().split(' ').filter(Boolean)),
      )

      setKeywordOptions(keywords)
    } else {
      const frontError = validation.error.formErrors.fieldErrors?.front
      if (frontError) {
        setErrors((prevState) => ({
          ...prevState,
          front: frontError,
        }))
      }
    }
  }

  function clearError(field: keyof NewFlashcardErrorsType) {
    if (errors[field].length > 0) {
      setErrors((prevState) => ({
        ...prevState,
        [field]: [],
      }))
    }
  }

  return (
    <section className="mx-auto my-24 min-h-screen-header max-w-1440px px-6 md:px-10">
      <button
        className={`fixed inset-0 z-50 bg-black transition-opacity ${
          !overlay
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-50'
        }`}
        onClick={() => setOverlay(null)}
      ></button>

      {overlay === 'translations' && <TranslationsModal />}
      {overlay === 'searchTranslations' && <SearchTranslations />}

      <form action="" className="flex flex-col items-center">
        <h1 className="mb-16 text-center text-3xl font-semibold">
          Adicionar flashcard
        </h1>

        <div className="mb-16 flex flex-wrap justify-center gap-36">
          <fieldset className="flex max-w-420px flex-col gap-8">
            <div>
              <legend className="mb-3 text-xl font-semibold">
                Informações principais
              </legend>
              <p className="font-medium text-light-gray500">
                Apenas as traduções serão possíveis serem alteradas depois
              </p>
            </div>

            <InputDefault
              name="front"
              type="text"
              label="Frente *"
              placeholder="Ex: I eat an apple every day"
              error={errors.front}
              onChange={handleFrontChange}
              onBlur={handleFrontFinished}
            />

            <div>
              <label>
                <h3 className="mb-1 font-medium">Palavra-chave *</h3>
                <select
                  name=""
                  id=""
                  className={`inputDefault px-4`}
                  disabled={
                    flashcardData.front.length === 0 || errors.front.length > 0
                  }
                  value={flashcardData.keyword}
                  onChange={(event) => {
                    setFlashcardData((prevState) => ({
                      ...prevState,
                      keyword: event.target.value,
                    }))
                  }}
                >
                  <option value="">Selecionar</option>
                  {keywordOptions.map((option, index) => {
                    return (
                      <option value={option} key={index}>
                        {option}
                      </option>
                    )
                  })}
                </select>
              </label>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-medium">Traduções</h3>
              {flashcardData.translations &&
              flashcardData.translations.length > 0 ? (
                flashcardData.translations.map((translation, index) => (
                  <p key={index}>{translation}</p>
                ))
              ) : (
                <p className="font-medium italic text-light-gray500">
                  Nenhuma tradução adicionada
                </p>
              )}
              <ButtonDefault
                text="Adicionar traduções"
                radius="rounded-md"
                style="outDark"
                type="button"
                paddingy="py-2"
                tailwind="w-[238px]"
                disabled={
                  flashcardData.keyword.length === 0 || errors.front.length > 0
                }
                onClick={() => setOverlay('translations')}
              />
            </div>
          </fieldset>

          <fieldset className="flex max-w-420px flex-col gap-8">
            <div>
              <legend className="mb-3 text-xl font-semibold">Exemplos</legend>
              <p className="font-medium text-light-gray500">
                Todos os exemplos poderão ser alterados depois
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-medium">
                Exemplos de uso da palavra-chave *
              </h3>
              {flashcardData.examples && flashcardData.examples.length > 0 ? (
                <p>Adicionar exemplos depois</p>
              ) : (
                <p className="font-medium italic text-light-gray500">
                  Nenhum exemplo adicionado
                </p>
              )}
              <ButtonDefault
                text="Adicionar exemplos"
                radius="rounded-md"
                style="outDark"
                type="button"
                paddingy="py-2"
                tailwind="w-[238px]"
                disabled={
                  flashcardData.keyword.length === 0 || errors.front.length > 0
                }
                onClick={() => setOverlay('examples')}
              />
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-medium">Pronúncias</h3>
              {flashcardData.pronunciations &&
              flashcardData.pronunciations.length > 0 ? (
                <p>Adicionar pronuncias depois</p>
              ) : (
                <p className="font-medium italic text-light-gray500">
                  Nenhuma pronúncia adicionada
                </p>
              )}
              <ButtonDefault
                text="Adicionar pronúncias"
                radius="rounded-md"
                style="outDark"
                type="button"
                paddingy="py-2"
                tailwind="w-[238px]"
                disabled={
                  flashcardData.keyword.length === 0 || errors.front.length > 0
                }
                onClick={() => setOverlay('pronunciations')}
              />
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-medium">Imagens</h3>
              {flashcardData.images && flashcardData.images.length > 0 ? (
                <p>Adicionar imagens depois</p>
              ) : (
                <p className="font-medium italic text-light-gray500">
                  Nenhuma imagem adicionada
                </p>
              )}
              <ButtonDefault
                text="Adicionar imagens"
                radius="rounded-md"
                style="outDark"
                type="button"
                paddingy="py-2"
                tailwind="w-[238px]"
                disabled={
                  flashcardData.keyword.length === 0 || errors.front.length > 0
                }
                onClick={() => setOverlay('images')}
              />
            </div>
          </fieldset>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <ButtonDefault
            text="Cancelar"
            type="link"
            link="/meus-decks"
            style="outDark"
            radius="rounded-md"
            tailwind="w-[175px] h-[42px]"
          />

          <ButtonDefault
            text="Criar flashcard"
            type="button"
            radius="rounded-md"
            submit
            tailwind="w-[175px] h-[42px]"
          />
        </div>
      </form>
    </section>
  )
}
