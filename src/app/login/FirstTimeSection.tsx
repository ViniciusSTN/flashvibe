import { ButtonDefault } from '@/components/ButtonDefault'

export const FirstTimeSection = () => {
  return (
    <section className="relative flex grow flex-col items-center justify-center bg-principal-blue px-7 py-60 text-white vsm:rounded-l-2xl lg:max-w-530px">
      <h2 className="mb-4 text-2xl font-bold">Primeira vez aqui?</h2>
      <p className="mb-8 max-w-64 text-center text-base font-medium">
        Cadastre-se e eleve seu nível de aprendizado
      </p>
      <ButtonDefault
        text="Cadastrar"
        type="link"
        link="/registro"
        style="light"
        paddingx="px-9"
        paddingy="py-2"
      />
    </section>
  )
}
