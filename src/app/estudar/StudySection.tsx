'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { Flashcard } from '@/components/Flashcard'
import { SpinLoader } from '@/components/SpinLoader'
import { getCardsToStudy } from '@/data/flashcards'
import useConvertFlashcard from '@/hooks/convertFlashcard'
import {
  flashcardFeedbackAtom,
  flashcardModalAtom,
  flashcardsToStudyAtom,
  flashcardWasTurnedAtom,
} from '@/states'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState, useRecoilValue } from 'recoil'
import { FeedbackModal } from './FeedbackModal'

export const StudySection = () => {
  const searchParams = useSearchParams()
  const deckId = searchParams.get('deckId')

  const [flashcardsToStudy, setFlashcardsToStudy] = useRecoilState(
    flashcardsToStudyAtom,
  )
  const [flashcardActive, setFlashcardActive] =
    useRecoilState(flashcardModalAtom)
  const flashcardWasTurned = useRecoilValue(flashcardWasTurnedAtom)
  const [feedback, setFeedback] = useRecoilState(flashcardFeedbackAtom)

  const [searchingFlashcards, setSearchingFlashcards] = useState<boolean>(true)

  const convertToFlashcardModal = useConvertFlashcard()

  useEffect(() => {
    const fetchCards = async () => {
      const response = await getCardsToStudy(Number(deckId))

      if (response.success) {
        setFlashcardsToStudy({
          flashcards: response.flashcards,
          deckName: response.deckName,
        })

        if (response.flashcards.length > 0)
          setFlashcardActive(convertToFlashcardModal(response.flashcards[0]))
      }

      setSearchingFlashcards(false)
    }

    if (!flashcardsToStudy) {
      fetchCards()
    } else {
      setSearchingFlashcards(false)

      if (flashcardsToStudy.flashcards.length > 0)
        setFlashcardActive(
          convertToFlashcardModal(flashcardsToStudy.flashcards[0]),
        )
    }
  }, [
    deckId,
    setFlashcardsToStudy,
    setFlashcardActive,
    convertToFlashcardModal,
    flashcardsToStudy,
  ])

  function handleNextClick() {
    if (!flashcardWasTurned) {
      toast.warning('Você deve ver o verso do flashcard')
    } else {
      if (flashcardActive && flashcardActive.flashcardId) {
        setFeedback({
          active: true,
          stars: 0,
          flashcardId: flashcardActive?.flashcardId,
        })
      }
    }
  }

  return (
    <section className="mx-auto mb-24 mt-16 min-h-screen-header max-w-1440px px-6 md:px-10">
      {searchingFlashcards && (
        <div className="relative flex h-420px w-full items-center justify-center">
          <SpinLoader />
        </div>
      )}

      {!searchingFlashcards &&
        flashcardsToStudy?.flashcards &&
        flashcardsToStudy?.flashcards.length > 0 && (
          <>
            <h1 className="mb-10 text-center text-2xl font-semibold">
              Estudando {flashcardsToStudy.deckName}
            </h1>

            <div className="flex items-center justify-center">
              <Flashcard>
                <ButtonDefault
                  text="Próximo"
                  type="button"
                  paddingy="py-2"
                  radius="rounded-md"
                  tailwind="px-2 vsm:px-5"
                  onClick={handleNextClick}
                />
              </Flashcard>
            </div>
          </>
        )}

      {!searchingFlashcards &&
        flashcardsToStudy?.flashcards &&
        flashcardsToStudy?.flashcards.length === 0 && (
          <>
            <h1 className="mb-24 text-center text-2xl font-semibold">
              Estudando {flashcardsToStudy.deckName}
            </h1>

            <p className="mb-4 text-center text-lg">
              Não há mais flashcards para serem estudados nesse deck hoje
            </p>

            <div className="flex justify-center">
              <ButtonDefault
                text="Voltar"
                type="link"
                link="/meus-decks?pag=1"
                radius="rounded-md"
                paddingx="px-5"
                paddingy="py-2"
              />
            </div>
          </>
        )}

      {feedback.active && <FeedbackModal />}
    </section>
  )
}
