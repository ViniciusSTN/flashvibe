import { ButtonDefault } from '@/components/ButtonDefault'
import { DeckCard } from '@/components/DeckCard'
import { assignDeckToUser } from '@/data/decks'
import { useCookies } from '@/hooks/cookies'
import { deckActiveAtom } from '@/states/atoms/deckActive'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'
import useTimeAgo from '@/hooks/timeAgo'
import Image from 'next/image'

export const StandardDeckModal = () => {
  const [deckActive, setDeckActive] = useRecoilState(deckActiveAtom)
  const timeAgo = useTimeAgo(deckActive?.lastModification || 0)
  const [loading, setLoading] = useState(false)

  const jwtToken = useCookies('Authorization')

  const handleAddDeck = async () => {
    // console.log('adicionando')

    setLoading(true)

    if (jwtToken && deckActive) {
      const response = await assignDeckToUser(deckActive.deckId, jwtToken)

      if (response.success) {
        toast.success('Deck adicionado')
      } else {
        if (response.error.includes('Already belongs to the user')) {
          toast.warning('Você já adicionou esse deck')
        } else {
          toast.error('Erro ao adicionar deck')
        }
      }
    }

    setLoading(false)
  }

  return (
    <>
      <button
        className={`fixed inset-0 z-50 bg-black transition-opacity ${
          !deckActive
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-50'
        }`}
        onClick={() => setDeckActive(null)}
      ></button>

      {deckActive && (
        <div
          className={`fixed left-1/2 top-1/2 z-50 flex max-h-screen-header -translate-x-1/2 -translate-y-1/2 flex-wrap items-start justify-center gap-5 overflow-y-scroll bg-white px-6 py-14 transition-opacity sm:px-10 md:px-14 ${
            !deckActive ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <button
            className="absolute right-1 top-1"
            onClick={() => setDeckActive(null)}
          >
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/close.svg?alt=media&token=9e1418a2-c0eb-480d-a9bc-a48215795904"
              alt="fechar deck"
              width={40}
              height={40}
            />
          </button>

          <div className="pointer-events-none">
            <DeckCard {...deckActive} />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex w-[286px] justify-center rounded border border-light-gray250 p-2">
              <div className="flex flex-col gap-3 font-medium">
                <div className="flex gap-5">
                  <p>Modificação:</p>
                  <p>{timeAgo}</p>
                </div>

                <div className="flex gap-3">
                  <p>Total de flashcards</p>
                  <p>{deckActive.flashcards}</p>
                </div>

                <p className="font-normal italic">{deckActive.description}</p>
              </div>
            </div>

            <ButtonDefault
              text={loading ? 'Adicionando...' : 'Adicionar deck'}
              type="button"
              style="dark"
              radius="rounded-lg"
              tailwind="w-full h-[50px]"
              onClick={handleAddDeck}
              disabled={loading}
            />
          </div>
        </div>
      )}
    </>
  )
}
