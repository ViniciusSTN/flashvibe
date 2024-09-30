import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { sendEmailToResetPassword } from '@/data/resetPassword'
import { emailInput } from '@/mocks/resetPassword'
import { emailSchema } from '@/schemas/resetPassword'
import Link from 'next/link'
import { useState } from 'react'

export const SendToEmailSection = () => {
  const [loader, setLoader] = useState<boolean>(false)
  const [email, setEmail] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])
  const [success, setSuccess] = useState<boolean>(false)

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoader(true)

    const validation = emailSchema.safeParse({ email })

    if (!validation.success) {
      const errors = validation.error.formErrors.fieldErrors.email
      if (errors) setErrors(errors)
    } else {
      const response = await sendEmailToResetPassword(email)
      console.log(response)

      if (response) {
        console.log('deu certo saporra')
        setSuccess(true)
      }
      // enviar email para o backend para que possa ser enviado um link de troca de senha para o email do usuário
      // salvar email no recoil
      // caso der certo, redirecionar para a página /redefinir-senha/email/codigo
    }

    setLoader(false)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setEmail(value.toLowerCase())
    setErrors([])
  }

  return (
    <section className="mx-6 flex flex-col items-center">
      <h1 className="mb-8 text-center text-2xl font-bold text-principal-blue">
        Redefinir senha
      </h1>
      <p className="mb-8 text-center font-medium">
        Informe o e-mail usado na criação de sua conta
      </p>
      <form
        action=""
        className="mb-14 flex flex-wrap justify-center gap-6"
        onSubmit={handleFormSubmit}
      >
        <InputDefault
          name={emailInput.name}
          placeholder={emailInput.placeholder ?? ''}
          type={emailInput.type}
          image={emailInput.image}
          value={email}
          onChange={handleInputChange}
          error={errors}
          tailwind="grow"
        />
        <ButtonDefault
          text={loader ? 'Enviando' : 'Confirmar'}
          type="button"
          paddingx="px-4"
          radius="rounded-md"
          submit
          disabled={loader || success}
          tailwind="h-10"
        />
      </form>
      <Link href="/redefinir-senha/sms" className="text-principal-blue">
        Informar celular
      </Link>
    </section>
  )
}
