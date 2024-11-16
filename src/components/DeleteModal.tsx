import { deleteDeckAtom } from '@/states'
import { useRecoilState } from 'recoil'
import { ButtonDefault } from './ButtonDefault'
import { deleteUserDeck } from '@/data/decks'
import { useCookies } from '@/hooks/cookies'
import { toast } from 'react-toastify'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'

export const DeleteModal = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const [deckDelete, setDeckDelete] = useRecoilState(deleteDeckAtom)

  const jwtToken = useCookies('Authorization')

  const router = useRouter()
  const pathname = usePathname()

  async function handleDeleteClick() {
    if (deckDelete.deckId && jwtToken) {
      setLoading(true)

      const response = await deleteUserDeck(deckDelete.deckId, jwtToken)

      if (response.success) {
        toast.success('Deck deletado')
        setDeckDelete({ deckId: null, modalActive: false })

        // router.push('/meus-decks?pag=0')

        if (pathname === '/meus-decks') {
          window.location.reload()
          // router.refresh()
        } else {
          router.push('/meus-decks?pag=1')
        }
      } else {
        toast.error('Não foi possível deletar o deck')
        setDeckDelete({ deckId: null, modalActive: false })
      }

      setLoading(false)
    }
  }

  return (
    <>
      <button
        aria-hidden={!deckDelete.modalActive}
        className={`fixed inset-0 z-50 bg-black transition-opacity ${
          !deckDelete.modalActive
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-50'
        }`}
        onClick={() => setDeckDelete({ deckId: null, modalActive: false })}
      ></button>

      <div
        aria-hidden={!deckDelete.modalActive}
        className={`fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white px-6 py-14 transition-opacity sm:px-10 md:px-14 ${
          !deckDelete.modalActive
            ? 'pointer-events-none opacity-0'
            : 'opacity-100'
        }`}
      >
        <h4 className="mb-10 text-center font-medium">
          Tem certeza que deseja deletar o deck?
        </h4>

        <div className="flex justify-between gap-5">
          <ButtonDefault
            text="Cancelar"
            type="button"
            tailwind="w-24 h-10"
            radius="rounded-md"
            style="outDark"
            onClick={() => setDeckDelete({ deckId: null, modalActive: false })}
          />

          <ButtonDefault
            text={`${loading ? 'Deletando' : 'Deletar'}`}
            type="button"
            tailwind="w-24 h-10"
            radius="rounded-md"
            disabled={loading}
            onClick={handleDeleteClick}
          />
        </div>
      </div>
    </>
  )
}
