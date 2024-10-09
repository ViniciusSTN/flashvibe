import { TextDefault } from '@/components/TextDefault'

export const WhyFlashcardsSection = () => {
  return (
    <section className="bg-principal-blue px-6 py-16 md:px-10">
      <div className="mx-auto max-w-1440px">
        <div className="mb-16 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
          <TextDefault
            title="O que são flashcards?"
            coloredTitle
            button="Começar agora"
            link="/meus-decks"
          >
            <p className="mb-5">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <p>
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages. scrambled it to make a type specimen book.
            </p>
          </TextDefault>

          <div className="flex-shrink-0 lg:w-1/2">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/flashcards%201.png?alt=media&token=89bac055-aeae-437b-b31e-afa4db593b9c"
              alt="pessoa segurando flashcards"
              className="h-auto max-h-520px w-full object-contain"
              loading="lazy"
            />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-8 lg:flex-row-reverse lg:items-center">
          <TextDefault
            title="Por que usar flashcards?"
            coloredTitle
            button="Começar agora"
            link="/meus-decks"
          >
            <p className="mb-5">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
            <p>
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged. It was popularised
              in the 1960s with the release of Letraset sheets containing Lorem
              Ipsum passages. scrambled it to make a type specimen book.
            </p>
          </TextDefault>

          <div className="shrink-0 lg:w-1/2">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/30576696_7720439.svg?alt=media&token=7cf67a19-8ef0-4f7d-97f1-f13397fab09f"
              alt="pessoas pensando"
              className="w-full object-contain lg:max-h-520px"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
