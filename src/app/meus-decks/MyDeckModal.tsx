import { ButtonDefault } from '@/components/ButtonDefault'
import { DeckCard } from '@/components/DeckCard'
import { deleteDeckAtom } from '@/states'
import { deckActiveAtom } from '@/states/atoms/deckActive'
import { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import useTimeAgo from '@/hooks/timeAgo'
import Image from 'next/image'

export const MyDeckModal = () => {
  const [deckActive, setDeckActive] = useRecoilState(deckActiveAtom)
  const setDeckDelete = useSetRecoilState(deleteDeckAtom)

  const [flashcardsClicked, setFlashcardsClicked] = useState<boolean>(false)

  const timeAgo = useTimeAgo(deckActive?.lastModification || 0)

  function handleDeleteClick() {
    if (deckActive?.deckId) {
      setDeckDelete({ deckId: deckActive?.deckId, modalActive: true })
      setDeckActive(null)
    }
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

          {!flashcardsClicked ? (
            <div className="flex flex-col gap-3">
              <div className="flex w-[286px] justify-center rounded border border-light-gray250 p-2">
                <div className="flex flex-col gap-3 font-medium">
                  <div className="flex gap-5">
                    <p>Modificação:</p>
                    <p>{timeAgo}</p>
                  </div>

                  <div>
                    <p>Quantidade de flashcards</p>

                    <div className="flex gap-3">
                      <p className="text-light-gray500">Novos:</p>
                      <p>{deckActive.new}</p>
                    </div>

                    <div className="flex gap-3">
                      <p className="text-light-gray500">Estudando:</p>
                      <p>{deckActive.learning}</p>
                    </div>

                    <div className="flex gap-3">
                      <p className="text-light-gray500">Revisar:</p>
                      <p>{deckActive.reviewing}</p>
                    </div>

                    <div className="flex gap-3">
                      <p className="text-light-gray500">Total:</p>
                      <p>{deckActive.flashcards}</p>
                    </div>
                  </div>

                  <p className="font-normal italic">{deckActive.description}</p>
                </div>
              </div>

              {deckActive.type === 'Custom Deck' ? (
                <ButtonDefault
                  text="Editar deck"
                  type="link"
                  link={`/editar-deck?id=${deckActive.deckId}`}
                  style="outDark"
                  tailwind="w-full"
                  paddingy="py-3"
                  radius="rounded-lg"
                />
              ) : (
                <ButtonDefault
                  text="Deletar deck"
                  type="button"
                  style="outDark"
                  tailwind="w-full"
                  paddingy="py-3"
                  radius="rounded-lg"
                  onClick={handleDeleteClick}
                />
              )}

              <ButtonDefault
                text="Flashcards"
                type="button"
                style="outDark"
                tailwind="w-full"
                paddingy="py-3"
                radius="rounded-lg"
                onClick={() => setFlashcardsClicked(true)}
              />

              <ButtonDefault
                text="Estudar"
                type="link"
                link={`/estudo?deck=passar-o-id-depois`}
                style="dark"
                radius="rounded-lg"
                tailwind="w-full h-[50px]"
              />
            </div>
          ) : (
            <div className="flex w-[286px] flex-col gap-3">
              {deckActive.type === 'Custom Deck' && (
                <ButtonDefault
                  text="Adicionar flashcards"
                  type="link"
                  link={`/adicionar-flashcard?deckId=${deckActive.deckId}`}
                  style="dark"
                  radius="rounded-lg"
                  tailwind="w-full h-[50px]"
                />
              )}

              <ButtonDefault
                text="Listar flashcards"
                type="link"
                link={`/flashcards?deckId=${deckActive.deckId}&pag=1`}
                style="dark"
                radius="rounded-lg"
                tailwind="w-full h-[50px]"
              />

              <ButtonDefault
                text="Voltar"
                type="button"
                style="outDark"
                tailwind="w-full"
                paddingy="py-3"
                radius="rounded-lg"
                onClick={() => setFlashcardsClicked(false)}
              />
            </div>
          )}
        </div>
      )}
    </>
  )
}
