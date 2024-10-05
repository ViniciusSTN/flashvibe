import { ButtonDefault } from '@/components/ButtonDefault'

export const ApresentationSection = () => {
  return (
    <section className="mx-auto mt-16 max-w-1440px px-6 md:px-10">
      <div className="mb-16 flex flex-col items-center gap-6 xl:flex-row xl:justify-between 1.5xl:gap-24">
        <div className="max-w-920px xl:max-w-420px">
          <div className="mb-12 flex flex-col gap-2">
            <p className="font-semibold uppercase text-light-gray500">
              pratique inglês de forma rápida e prática
            </p>
            <h1 className="text-3xl font-semibold">
              Crie flashcards personalizados ou utilize modelos pré-definidos
            </h1>
            <p className="font-medium text-light-gray500">
              Transforme seu jeito de aprender inglês com flashcards. Eles são a
              maneira perfeita de memorizar palavras novas, praticar a pronúncia
              e expandir seu vocabulário de forma divertida. Descubra como!
            </p>
          </div>

          <div className="flex justify-center xl:justify-start">
            <ButtonDefault
              text="Comece agora"
              type="link"
              style="dark"
              link="/meus-decks"
              radius="rounded-lg"
              paddingx="px-16"
              paddingy="py-4"
            />
          </div>
        </div>

        <div className="max-w-920px object-cover">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/Stock_Photography_person_studying_using_flash_cards_1.jpg?alt=media&token=0c55cd62-0f5b-48c2-85bd-40a81640729e"
            alt="pessoas estudando"
            className="rounded-2xl"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  )
}
