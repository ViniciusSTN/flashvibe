import { ButtonDefault } from '@/components/ButtonDefault'
import Link from 'next/link'

export const HelpHeaderSection = () => {
  return (
    <section>
      <h1 className="mb-10 text-center text-2xl font-semibold">
        Central de ajuda
      </h1>

      <div className="mb-16 flex flex-col items-start justify-between gap-8 md:flex-row">
        <p className="max-w-718px font-medium">
          Não encontrou a resposta que esperava? Acesse as{' '}
          <Link href="/perguntas-frequentes" className="text-principal-blue">
            perguntas frequêntes (FAQS)
          </Link>{' '}
          ou envie uma mensagem para nosso{' '}
          <Link href="/fale-conosco" className="text-principal-blue">
            suporte.
          </Link>
        </p>

        <ButtonDefault
          text="Perguntas frequêntes"
          type="link"
          link="/perguntas-frequentes"
          paddingy="py-2"
          paddingx="px-4"
          radius="rounded-md"
          tailwind="w-[232px] text-nowrap"
        />
      </div>
    </section>
  )
}
