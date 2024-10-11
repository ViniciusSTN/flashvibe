import { ButtonDefault } from '@/components/ButtonDefault'
import { DeckCard } from '@/components/DeckCard'
import { deckActiveAtom } from '@/states/atoms/deckActive'
import { useRecoilState } from 'recoil'

export const MyDeckModal = () => {
  const [deckActive, setDeckActive] = useRecoilState(deckActiveAtom)

  const timeAgo = (timestamp: number) => {
    const now = Date.now()
    const elapsed = now - timestamp

    const seconds = Math.floor(elapsed / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    const months = Math.floor(days / 30)
    const years = Math.floor(days / 365)

    if (years > 0) return `${years} ano(s)`
    if (months > 0) return `${months} mês(es)`
    if (weeks > 0) return `${weeks} semana(s)`
    if (days > 0) return `${days} dia(s)`
    if (hours > 0) return `${hours} hora(s)`
    if (minutes > 0) return `${minutes} minuto(s)`
    return `${seconds} segundo(s)`
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
          className={`fixed inset-0 left-1/2 top-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 gap-5 bg-white transition-opacity ${
            !deckActive
              ? 'pointer-events-none opacity-0'
              : 'pointer-events-auto opacity-100'
          }`}
        >
          <div className="pointer-events-none">
            <DeckCard {...deckActive} />
          </div>

          <div>
            <div>
              <div className="flex gap-5">
                <p>Última modificação:</p>
                <p>{timeAgo(deckActive.lastModification)}</p>
              </div>

              <p>Quantidade de flashcards</p>

              <div className="flex gap-5">
                <p>Novos:</p>
                <p>{deckActive.new}</p>
              </div>

              <div className="flex gap-5">
                <p>Estudando:</p>
                <p>{deckActive.learning}</p>
              </div>

              <div className="flex gap-5">
                <p>Revisar:</p>
                <p>{deckActive.reviewing}</p>
              </div>

              <div className="flex gap-5">
                <p>Total:</p>
                <p>{deckActive.flashcards}</p>
              </div>

              <p>{deckActive.description}</p>
            </div>

            <ButtonDefault
              text="Editar deck"
              type="link"
              link={`/editar-deck?deck=passar-o-id-depois`}
              style="outDark"
              tailwind="w-full"
              paddingy="py-3"
              radius="rounded-lg"
            />

            <ButtonDefault
              text="Flashcards"
              type="button"
              style="outDark"
              tailwind="w-full"
              paddingy="py-3"
              radius="rounded-lg"
            />

            <ButtonDefault
              text="Estudar"
              type="link"
              link={`/estudo?deck=passar-o-id-depois`}
              style="dark"
              tailwind="w-full"
              paddingy="py-3"
              radius="rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  )
}
