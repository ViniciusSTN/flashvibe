import { ButtonDefault } from '@/components/ButtonDefault'

export const WelcomeBackSection = () => {
  return (
    <section className="vsm:rounded-l-2xl relative flex grow flex-col items-center justify-center bg-principal-blue px-7 py-60 text-white lg:max-w-530px">
      <h2 className="mb-4 text-2xl font-bold">Bem vindo de volta!</h2>
      <p className="mb-8 max-w-64 text-center text-base font-medium">
        Faça login para continuar conectado com a gente
      </p>
      <ButtonDefault
        text="Logar"
        type="link"
        link="/login"
        style="light"
        paddingx="px-9"
        paddingy="py-2"
      />
    </section>
  )
}
