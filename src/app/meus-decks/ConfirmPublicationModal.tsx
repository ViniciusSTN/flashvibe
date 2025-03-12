import { ButtonDefault } from '@/components/ButtonDefault'
import { SpinLoader } from '@/components/SpinLoader'
import { publishDeck } from '@/data/decks'
import { useCookies } from '@/hooks/cookies'
import { publicationModalAtom } from '@/states'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'

export const ConfirmPublicationModal = () => {
  const jwtToken = useCookies('Authorization')

  const [publicationModal, setPublicationModal] =
    useRecoilState(publicationModalAtom)

  const [publishLoading, setPublishLoading] = useState<boolean>(false)

  const handlePublishClick = async (allowEdit: boolean) => {
    if (!publicationModal.deckId || !jwtToken) return

    setPublishLoading(true)

    const response = await publishDeck(
      publicationModal.deckId,
      jwtToken,
      allowEdit,
    )

    if (response.success) {
      toast.success('Deck publicado')
      setPublicationModal({ deckId: 0, modalActive: false })
    } else {
      toast.error('Erro ao publicar deck')
    }

    setPublishLoading(false)
  }

  return (
    <>
      <button
        className={`fixed inset-0 z-50 bg-black transition-opacity ${
          !publicationModal.modalActive
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-50'
        }`}
        onClick={() => setPublicationModal({ deckId: 0, modalActive: false })}
      ></button>

      <div
        aria-hidden={!publicationModal.modalActive}
        className={`fixed left-1/2 top-1/2 z-50 max-w-[560px] -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-14 transition-opacity sm:px-10 md:px-14 ${
          !publicationModal.modalActive
            ? 'pointer-events-none opacity-0'
            : 'opacity-100'
        }`}
      >
        <h4 className="mb-10 text-center font-medium">
          Deseja permitir edição?
        </h4>

        <p className="mb-10 text-center text-light-gray500">
          Permitirá que outros usuário editem o deck e os flashcards. Isso{' '}
          <span className="font-semibold">não</span> afetará o deck original.
        </p>

        <div className="flex justify-between gap-5">
          <ButtonDefault
            text="Não permitir"
            type="button"
            tailwind="w-28 vsm:w-[168px] h-10"
            radius="rounded-md"
            style="outDark"
            onClick={() => handlePublishClick(false)}
            disabled={publishLoading}
          />

          <ButtonDefault
            text="Permitir"
            type="button"
            tailwind="w-28 vsm:w-[168px] h-10"
            radius="rounded-md"
            style="dark"
            onClick={() => handlePublishClick(true)}
            disabled={publishLoading}
          />
        </div>
      </div>

      {publishLoading && (
        <div className="fixed left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center">
          <SpinLoader />
        </div>
      )}
    </>
  )
}
