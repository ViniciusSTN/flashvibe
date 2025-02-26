import Link from 'next/link'

export const WhoAreWeSection = () => {
  return (
    <section className="mx-auto mb-24 mt-16 flex min-h-screen-header max-w-[1080px] flex-col-reverse px-6 md:px-10 lg:block">
      <div className="flex justify-center lg:float-left lg:mb-6 lg:mr-10">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/225c33b4a92940ff87565a548e2ed809.jpg?alt=media&token=015592b1-7d40-4f86-94dc-c037bc3863a8"
          alt="Duas pessoas sorrindo e estudando"
          className="w-full max-w-[500px] rounded-lg lg:max-w-[400px]"
        />
      </div>

      <div className="text-lg">
        <h1 className="mb-5 text-center text-2xl font-semibold lg:text-start">
          Quem somos?
        </h1>

        <p className="mb-8">
          Inicialmente, o <strong>FlashVibe</strong> foi idealizado como um
          projeto de conclusão de curso. Percebemos que existe defasagem no
          aprendizado de inglês no Brasil. Um dos maiores obstáculos que os
          alunos enfrentam é a <strong>dificuldade</strong> em assimilar e
          utilizar novos <strong>vocabulários</strong>. Nesse contexto, o{' '}
          <strong>FlashVibe</strong> foi criado como uma ferramenta para apoiar
          os estudantes no <strong>aprendizado</strong> e na prática eficiente
          de palavras em inglês utilizando <strong>métodos</strong> inovadores e
          eficazes.
        </p>

        <p className="mb-8">
          A missão do <strong>FlashVibe</strong> é <strong>facilitar</strong> o
          aprendizado de vocabulários em inglês. Nossa visão é ampliar e{' '}
          <strong>democratizar</strong> o acesso ao conhecimento do idioma,
          tornando-o <strong>acessível</strong> para todos. Guiados por valores
          como comprometimento, integridade, inovação, aprendizado contínuo e
          ensino <strong>acessível</strong>, utilizamos a{' '}
          <strong>tecnologia</strong> como aliada para transformar o aprendizado
          de inglês em uma experiência <strong>eficiente</strong>.
        </p>

        <p className="mb-8">
          Para mais informações, acesse nosso{' '}
          <Link href="/blog" className="font-bold text-principal-blue">
            blog
          </Link>{' '}
          ou fale diretamente com nossa equipe de{' '}
          <Link href="/fale-conosco" className="font-bold text-principal-blue">
            suporte
          </Link>
          . Caso tenha alguma dúvida utilize os canais de{' '}
          <Link
            href="/perguntas-frequentes"
            className="font-bold text-principal-blue"
          >
            perguntas frequêntes
          </Link>{' '}
          ou a{' '}
          <Link
            href="/central-de-ajuda"
            className="font-bold text-principal-blue"
          >
            central de ajuda
          </Link>
          .
        </p>
      </div>
    </section>
  )
}
