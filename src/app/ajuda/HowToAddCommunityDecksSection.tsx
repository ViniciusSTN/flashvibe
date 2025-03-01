import Link from 'next/link'

export const HowToAddCommunityDecksSection = () => {
  return (
    <section className="mb-24">
      <h2 className="mb-10 text-center text-xl font-semibold">
        Como adicionar um{' '}
        <span className="text-principal-blue">deck da comunidade?</span>
      </h2>

      <div className="flex flex-col-reverse justify-center gap-10 lg:flex-row lg:justify-between">
        <div className="flex flex-1 items-center justify-center border border-light-gray225">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/KLAHGgh445JHjKL.png?alt=media&token=d6e51a52-1260-4e5d-a410-be9f44fc5820"
            alt="Exemplo de como publicar um deck"
          />
        </div>

        <div className="flex flex-1 flex-col gap-5 lg:max-w-464px">
          <p>
            Para adicionar um deck da comunidade basta acessar a página{' '}
            <Link
              href="/decks-da-comunidade?pag=1"
              className="font-semibold text-principal-blue"
            >
              Decks da Comunidade
            </Link>
            , selecionar o deck que deseja adicionar, clicar em{' '}
            <span className="font-semibold text-principal-blue">
              Adicionar deck
            </span>{' '}
            e confirmar. Agora você poderá acessar o deck em{' '}
            <Link
              href="/meus-decks?pag=1"
              className="font-semibold text-principal-blue"
            >
              Meus Decks
            </Link>
            .
          </p>

          <p>
            <span className="font-semibold">Importante:</span> Decks públicos
            podem ou não permitir edições. Decks que permitem edições
            possibilitam que usuários façam qualquer tipo de edição no deck e
            nos flashcards sem alterar o deck original do autor.
          </p>
        </div>
      </div>
    </section>
  )
}
