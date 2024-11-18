import { ButtonDefault } from '@/components/ButtonDefault'
import {
  flashcardFeedbackAtom,
  flashcardsToStudyAtom,
  flashcardWasTurnedAtom,
} from '@/states'
import { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { sendFlashcardFeedback } from '@/data/flashcards'
import Image from 'next/image'
import { FeedbackModalType } from '@/types/flashcard'
import { useCookies } from '@/hooks/cookies'
import { toast } from 'react-toastify'

export const FeedbackModal: FeedbackModalType = ({ deckId }) => {
  const [feedback, setFeedback] = useRecoilState(flashcardFeedbackAtom)
  const [flashcardsToStudy, setFlashcardsToStudy] = useRecoilState(
    flashcardsToStudyAtom,
  )
  const setFlashcardWasTurned = useSetRecoilState(flashcardWasTurnedAtom)

  const [hoveredStars, setHoveredStars] = useState<number>(0)

  const jwtToken = useCookies('Authorization')

  function handleStarClick(stars: number) {
    setFeedback({ ...feedback, active: true, stars })
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!jwtToken) return

    console.log(feedback)

    const response = await sendFlashcardFeedback(
      feedback.flashcardId,
      deckId,
      feedback.stars,
      jwtToken,
    )

    if (response.success) {
      setFeedback((prevState) => ({
        ...prevState,
        active: false,
        stars: 0,
      }))

      if (
        flashcardsToStudy &&
        flashcardsToStudy.flashcards &&
        flashcardsToStudy.flashcards.length > 0
      ) {
        setFlashcardsToStudy((prevState) => {
          if (prevState) {
            return {
              flashcards: prevState.flashcards.slice(1),
              deckName: prevState.deckName,
            }
          }
          return prevState
        })
      }

      setFlashcardWasTurned(false)
    } else {
      toast.error('Erro ao enviar feedback')
    }
  }

  return (
    <>
      <button
        className={`fixed inset-0 z-50 bg-black transition-opacity ${
          !feedback.active
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-50'
        }`}
        onClick={() =>
          setFeedback((prevState) => ({
            ...prevState,
            active: false,
            stars: 0,
          }))
        }
      ></button>

      <div
        className={`fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-6 transition-opacity vsm:px-8 ${
          !feedback.active ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <form action="" onSubmit={handleFormSubmit}>
          <h4 className="mb-16 text-base font-medium">
            Descreva seu nível de compreensão da palavra-chave
          </h4>

          <div className="mb-16 flex flex-col items-center">
            <div className="mb-1 flex items-center justify-center gap-1">
              {[...Array(5)].map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onMouseEnter={() => setHoveredStars(index + 1)}
                  onMouseLeave={() => setHoveredStars(0)}
                  onClick={() => handleStarClick(index + 1)}
                >
                  <Image
                    src={
                      index + 1 <= (hoveredStars || feedback.stars)
                        ? 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/star.svg?alt=media&token=2a7b7e53-ad74-4bd1-bd3a-428c034e6469'
                        : 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/empty-star.svg?alt=media&token=8087f02a-bb31-4514-a518-c7ec5d4855cb'
                    }
                    alt={`${index + 1} estrelas`}
                    width={32}
                    height={32}
                    className="h-8 w-8"
                  />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-[110px] font-medium">
              <small>Difícil</small>
              <small>Fácil</small>
            </div>
          </div>

          <div className="flex justify-between gap-5">
            <ButtonDefault
              text="Cancelar"
              type="button"
              radius="rounded-md"
              style="outDark"
              paddingy="py-2"
              tailwind="w-[178px]"
              onClick={() =>
                setFeedback((prevState) => ({
                  ...prevState,
                  active: false,
                  stars: 0,
                }))
              }
            />

            <ButtonDefault
              text="Próximo"
              type="button"
              radius="rounded-md"
              paddingy="py-2"
              tailwind="w-[178px]"
              submit
            />
          </div>
        </form>
      </div>
    </>
  )
}
