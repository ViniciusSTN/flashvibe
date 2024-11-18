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
              Os Flashcards são instrumentos educativos muito utilizados para
              estudo e memorização de informações. Cada cartão apresenta uma
              questão, termo ou ideia de um lado e a resposta ou explicação do
              outro. Esta estratégia é eficiente para revisar conteúdos de
              maneira ágil e interativa, contribuindo para a retenção duradoura
              através de repetições regulares e aprendizado ativo.
            </p>
            <p>
              Os flashcards, amplamente utilizados no contexto escolar e
              acadêmico, também são aplicados em aplicativos digitais que
              aprimoram o aprendizado através de recursos extras, tais como
              imagens, áudios e interação. Seja para aprender uma nova língua,
              relembrar matérias ou se preparar para exames, eles continuam
              sendo uma abordagem flexível e eficaz para várias áreas de estudo.
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
              A utilização de flashcards é um método eficiente para aprimorar a
              capacidade de memorização e o aprendizado ativo. Eles auxiliam na
              decomposição de informações complexas em segmentos mais simples e
              compreensíveis, possibilitando que você se dedique a um conceito
              de cada vez. A repetição estruturada, fundamentada na exposição
              contínua ao conteúdo, potencializa a fixação de informações e
              simplifica a absorção de novos conhecimentos.
            </p>
            <p>
              Outra razão para a sua utilização é a flexibilidade que
              proporcionam. Os Flashcards têm a capacidade de se ajustar a
              diversos estilos de aprendizado e metas, desde a preparação para
              testes até o domínio de uma nova língua. Com a disseminação das
              versões digitais, o estudo pode ser realizado em qualquer local e
              incorporar recursos multimídia, tornando o processo de
              aprendizagem mais interativo.
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
