import { useState } from 'react'
import { ButtonDefault } from './ButtonDefault'
import { toast } from 'react-toastify'
import { deleteFlashcard } from '@/data/flashcards'
import { DeleteFlashcardModalType } from '@/types/flashcard'
import { flashcardOverlayAtom } from '@/states'
import { useSetRecoilState } from 'recoil'
import { useRouter } from 'next/navigation'

export const DeleteFlashcardModal: DeleteFlashcardModalType = ({
  flashcardId,
  deckId,
  jwtToken,
}) => {
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)

  const setOverlay = useSetRecoilState(flashcardOverlayAtom)

  const handleDeleteClick = async () => {
    if (flashcardId && deckId && jwtToken) {
      setLoading(true)

      const response = await deleteFlashcard(
        Number(flashcardId),
        Number(deckId),
        jwtToken,
      )

      if (response.success) {
        toast.success('Flashcard deletado')
        setOverlay(null)
        router.push(`/flashcards?pag=1&deckId=${deckId}`)
      } else {
        toast.error('Erro ao deletar o flashcard')
      }

      setLoading(false)
    }
  }

  return (
    <div className="fixed left-1/2 top-1/2 z-50 w-[80%] max-w-464px -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-8 shadow-very-clean">
      <h3 className="mb-6 text-center text-xl font-medium">
        Deletar flashcard
      </h3>

      <p className="mb-8 text-center text-light-gray500">
        Tem certeza que deseja deletar o flashcard?
      </p>

      <div className="flex justify-between gap-5">
        <ButtonDefault
          text="Cancelar"
          type="button"
          style="outDark"
          radius="rounded-md"
          tailwind="w-[175px] h-[42px]"
          onClick={() => setOverlay(null)}
          disabled={loading}
        />

        <ButtonDefault
          text={`${loading ? 'Deletando...' : 'Deletar'}`}
          type="button"
          radius="rounded-md"
          tailwind="w-[175px] h-[42px]"
          onClick={handleDeleteClick}
          disabled={loading}
        />
      </div>
    </div>
  )
}
