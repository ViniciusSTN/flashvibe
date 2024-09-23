import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { phoneInput } from '@/mocks/resetPassword'
import { phoneSchema } from '@/schemas/resetPassword'
import Link from 'next/link'
import { useState } from 'react'

export const SendToPhoneSection = () => {
  const [loader, setLoader] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>('')
  const [errors, setErrors] = useState<string[]>([])

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoader(true)

    const validation = phoneSchema.safeParse({ phone })

    if (!validation.success) {
      const { phone } = validation.error.formErrors.fieldErrors
      if (phone) setErrors(phone)
    } else {
      // enviar email para o backend para que possa ser enviado um link de troca de senha para o email do usuário
      // salvar email no recoil
      // caso der certo, redirecionar para a página /redefinir-senha/email/codigo
    }

    setLoader(false)
  }

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target
    setPhone(value.toLowerCase())
    setErrors([])
  }

  return (
    <section className="mx-6 flex flex-col items-center">
      <h1 className="mb-8 text-center text-2xl font-bold text-principal-blue">
        Redefinir senha
      </h1>
      <p className="mb-8 text-center font-medium">
        Informe o número de celular usado na criação de sua conta
      </p>
      <form
        action=""
        className="mb-14 flex flex-wrap justify-center gap-6"
        onSubmit={handleFormSubmit}
      >
        <InputDefault
          name={phoneInput.name}
          placeholder={phoneInput.placeholder}
          type={phoneInput.type}
          image={phoneInput.image}
          value={phone}
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
          disabled={loader}
          tailwind="h-10"
        />
      </form>
      <Link href="/redefinir-senha/email" className="text-principal-blue">
        Informar email
      </Link>
    </section>
  )
}
