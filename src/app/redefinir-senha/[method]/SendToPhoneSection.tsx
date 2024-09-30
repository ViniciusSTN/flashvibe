import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { phoneInput } from '@/mocks/resetPassword'
import { phoneSchema } from '@/schemas/resetPassword'
import { usePhoneMask } from '@/hooks/inputMasks'
import Link from 'next/link'
import { useState } from 'react'

export const SendToPhoneSection = () => {
  const [loader, setLoader] = useState<boolean>(false)
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const mask = usePhoneMask()

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoader(true)

    const phoneNumber = phone.replace(/\D/g, '')

    const validation = phoneSchema.safeParse({ phoneNumber })

    if (!validation.success) {
      const errors = validation.error.formErrors.fieldErrors.phoneNumber
      if (errors) setErrors(errors)
    } else {
      // salvar número do celualr no recoil
      // enviar email para bakcend para validar se o número contem um email no banco de dados
      // caso existir, redirecionar o usuário para a página /redefinir-senha/sms/codigo
      // backend envia um código no celular do usuário
      // caso não existir, mostar um erro para o usuário
      // usuário digita o código, front envia o dado para o backend validar se o código é valido
      // caso o código for válido, redirecionar o usuário para /redefinir-senha
    }

    setLoader(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setPhone(value)

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
          placeholder={phoneInput.placeholder ?? ''}
          type={phoneInput.type}
          image={phoneInput.image}
          value={phone}
          onChange={handleInputChange}
          ref={mask}
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
        Informar e-mail
      </Link>
    </section>
  )
}
