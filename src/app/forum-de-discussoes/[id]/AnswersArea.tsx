import { ButtonDefault } from '@/components/ButtonDefault'
import { OrderByDefault } from '@/components/OrderByDefault'
import { UserIconDefault } from '@/components/UserIconDefault'
import { discussionAnswersOrderBy } from '@/mocks/orderBy'
import { answerModalActiveAtom, orderByAtom } from '@/states'
import { AnswersAreaType } from '@/types/discussions'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { AnswerModal } from './AnswerModal'
import Image from 'next/image'

export const AnswersArea: AnswersAreaType = ({ answers, title }) => {
  const [orderBy, setOrderBy] = useRecoilState(orderByAtom)
  const [isAnswerModalActive, setIsAnswerModalActive] = useRecoilState(
    answerModalActiveAtom,
  )

  const [likedAnswers, setLikedAnswers] = useState<{ [key: string]: boolean }>(
    {},
  )
  const [likesLoading, setLikesLoading] = useState<{ [key: string]: boolean }>(
    {},
  )

  const handleAnswerClick = () => {
    // abrir modal de resposta
    setIsAnswerModalActive(true)
  }

  const handleLikeClick = async (answerId: number) => {
    setLikesLoading((prev) => ({ ...prev, [answerId]: true }))

    // Simulação de requisição assíncrona
    // Enviar para o back end depois
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setLikedAnswers((prev) => ({
      ...prev,
      [answerId]: !prev[answerId],
    }))

    setLikesLoading((prev) => ({ ...prev, [answerId]: false }))
  }

  return (
    <>
      {isAnswerModalActive && <AnswerModal title={title} />}

      <h2 className="mb-4 text-center text-xl font-semibold">Respostas</h2>

      <div className="mb-10 flex flex-wrap items-center justify-between gap-6">
        <OrderByDefault
          activeOrder={orderBy}
          setActiveOrder={setOrderBy}
          options={discussionAnswersOrderBy}
        />

        <ButtonDefault
          text="Responder"
          type="button"
          paddingy="py-2"
          paddingx="px-16"
          radius="rounded-md"
          onClick={handleAnswerClick}
        />
      </div>

      {answers.length > 0 && (
        <ul className="flex flex-col gap-8">
          {answers.map((answer) => {
            const isLiked = likedAnswers[answer.id] || false
            const isLoading = likesLoading[answer.id] || false

            return (
              <li
                key={answer.id}
                className="border-y border-light-gray225 px-8 pb-6 pt-8"
              >
                <p className="mb-4">{answer.answer}</p>

                <div className="flex items-center justify-between">
                  <UserIconDefault
                    userName={answer.userName}
                    userImage={answer.userImage}
                  />

                  <div className="flex items-center justify-center gap-1">
                    <button
                      onClick={() => handleLikeClick(answer.id)}
                      disabled={isLoading}
                    >
                      <Image
                        src={
                          isLiked
                            ? 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/like-svgrepo-com-blue.svg?alt=media&token=7a69ec98-ef16-429d-8031-4c73b1c0c9c0'
                            : 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/like-svgrepo-com.svg?alt=media&token=3b672516-42a3-47c8-b06d-f6790b6d471a'
                        }
                        alt="Curtir discussão"
                        width={24}
                        height={24}
                        className="h-6 w-6"
                      />
                    </button>

                    {!isLoading && isLiked ? (
                      <span className="text-xl font-medium text-secondary-blue">
                        {answer.likes + 1}
                      </span>
                    ) : (
                      <span className="text-xl font-medium">
                        {answer.likes}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </>
  )
}
