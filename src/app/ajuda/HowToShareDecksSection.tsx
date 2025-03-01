import Link from 'next/link'

export const HowToShareDecksSection = () => {
  return (
    <section className="mb-24">
      <h2 className="mb-10 text-center text-xl font-semibold">
        Como compartilhar meu <span className="text-principal-blue">deck?</span>
      </h2>

      <div className="flex flex-col-reverse justify-center gap-10 lg:flex-row lg:justify-between">
        <div className="flex flex-1 items-center justify-center border border-light-gray225">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/234FSAk3523jhjf.png?alt=media&token=cb8c0af1-2d82-40f8-9811-a7f71032e1cb"
            alt="Exemplo de como publicar um deck"
          />
        </div>

        <div className="flex flex-1 flex-col gap-5 lg:max-w-464px">
          <p>
            Para compartilhar um deck com a comunidade e torná-lo público para
            todos os usuário do FlashVibe, basta acessar a página{' '}
            <Link
              href="/meus-decks?pag=1"
              className="font-semibold text-principal-blue"
            >
              Meus Decks
            </Link>{' '}
            e clicar no deck que deseja compartilhar. Depois aperte no botão{' '}
            <span className="font-semibold text-principal-blue">Publicar</span>{' '}
            que aparece abaixo do deck. Em seguida confirme se deseja ou não
            permitir edições no deck. Pronto, seu deck agora está publicado.
          </p>

          <p>
            <strong className="font-semibold">
              Importante: Não é possível desfazer essa ação.
            </strong>
          </p>

          <p>
            As edições feitas em decks públicos não afetam os decks originais.
            Ou seja, modificações feitas por outros usuários gerarão uma cópia
            do deste deck, não afetando o deck do autor.
          </p>
        </div>
      </div>
    </section>
  )
}
