import { ButtonDefault } from '@/components/ButtonDefault'
import { TextAreaDefault } from '@/components/TextAreaDefault'
import { discussionAnswer } from '@/schemas/discussion'
import { answerModalActiveAtom } from '@/states'
import { AnswerModalType } from '@/types/discussions'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'

export const AnswerModal: AnswerModalType = ({ title }) => {
  const [isActive, setIsActive] = useRecoilState(answerModalActiveAtom)

  const [answer, setAnswer] = useState<string>('')
  const [sending, setSending] = useState<boolean>(false)
  const [answerErrors, setAnswerErrors] = useState<string[]>([])

  const handleAnswerChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const value = event.target.value

    setAnswer(value)

    if (answerErrors.length > 0) setAnswerErrors([])
  }

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setSending(true)

    const validation = discussionAnswer.safeParse({ answer })
    const errors = validation.error?.formErrors.fieldErrors.answer

    if (!validation.success && errors) {
      setAnswerErrors([...errors])
    } else {
      // enviar para o back end

      setIsActive(false)
      toast.success('Resposta enviada', {
        onClose: () => window.location.reload(),
        autoClose: 1000,
      })
    }

    setSending(false)
  }

  return (
    <>
      <button
        className={`fixed inset-0 z-50 bg-black transition-opacity ${
          !isActive
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-50'
        }`}
        onClick={() => setIsActive(false)}
      ></button>

      <form
        className="fixed left-1/2 top-1/2 z-50 max-h-screen w-72 -translate-x-1/2 -translate-y-1/2 overflow-y-scroll bg-white p-6 vsm:w-520px vsm:p-8 md:w-718px md:p-12"
        onSubmit={handleFormSubmit}
      >
        <button
          className="absolute right-2 top-2"
          onClick={() => setIsActive(false)}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/close-svgrepo-com.svg?alt=media&token=f5a52b8f-6f12-4716-a4ab-91201310fc4d"
            alt="Fechar imagem"
            className="h-8 w-8"
          />
        </button>

        <h3 className="mb-12 text-center text-xl font-semibold">Responder</h3>

        <div className="flex flex-col gap-4">
          <TextAreaDefault name="title" value={title} label="Título" disable />

          <TextAreaDefault
            name="answer"
            placeholder="Descreva com detalhes"
            value={answer}
            label="Resposta"
            onChange={handleAnswerChange}
            error={answerErrors}
          />

          <p className="text-center text-light-gray250 vsm:text-start">
            Isso ficará visível para todos os usuários e não poderá ser deletado
          </p>

          <div className="ml-auto w-full max-w-[260px]">
            <ButtonDefault
              text={sending ? 'Respondendo...' : 'Reponder'}
              type="button"
              paddingy="py-2"
              radius="rounded-md"
              tailwind="w-full"
              disabled={sending}
              submit
            />
          </div>
        </div>
      </form>
    </>
  )
}
