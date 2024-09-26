'use client'

import { InputDefault } from '@/components/InputDefault'
import { useState } from 'react'
import { inputs } from '@/mocks/changePassword'
import {
  FormChangePasswordErrors,
  FormChangePasswordValues,
  InputName,
} from '@/types/changePassword'
import { ButtonDefault } from '@/components/ButtonDefault'
import Image from 'next/image'
import { showPasswordAtom } from '@/states'
import { useRecoilState } from 'recoil'
import changePasswordSchema from '@/schemas/changePassword'

const initialValues: FormChangePasswordValues = {
  password: '',
  passwordConfirmation: '',
}

const initialErrors: FormChangePasswordErrors = {
  password: [],
  passwordConfirmation: [],
}

export const ResetPasswordSection = () => {
  const [formValues, setFormValues] =
    useState<FormChangePasswordValues>(initialValues)
  const [formErrors, setFormErrors] =
    useState<FormChangePasswordErrors>(initialErrors)

  const [loader, setLoader] = useState<boolean>(false)

  const [showPassword, setShowPassword] = useRecoilState(showPasswordAtom)

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }))

    if (formErrors[name as InputName].length > 0) {
      setFormErrors((prevState) => ({
        ...prevState,
        ...(formErrors[name as InputName] = []),
      }))
    }
  }

  function handleShowPasswordClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setShowPassword(!showPassword)
  }

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault()

    setLoader(true)

    const validation = changePasswordSchema.safeParse(formValues)

    if (!validation.success) {
      setFormErrors({
        ...initialErrors,
        ...validation.error.formErrors.fieldErrors,
      })
    } else {
      // lógica para trocar de senha
    }

    setLoader(false)
  }

  return (
    <section className="flex max-w-96 grow flex-col items-center justify-center px-6 py-24 lg:py-44">
      <h1 className="mb-8 text-3xl font-bold text-principal-blue">
        Redefinir senha
      </h1>

      <form
        action=""
        onSubmit={handleFormSubmit}
        className="flex w-full flex-col self-center"
      >
        {inputs.map((input, index) => (
          <InputDefault
            key={index}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder}
            value={formValues[input.name as InputName]}
            error={formErrors[input.name as InputName]}
            image={input.image}
            onChange={handleInputChange}
            tailwind="mb-3"
          />
        ))}

        <button
          className="mb-10 flex items-center gap-1 self-end"
          type="button"
          onClick={handleShowPasswordClick}
        >
          <span className="text-sm">
            {showPassword ? 'Esconder senha' : 'Ver senha'}
          </span>
          <Image
            src={
              showPassword
                ? `https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/eye.svg?alt=media&token=813e59ce-db08-487c-9291-492980df70d0`
                : 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/hide.svg?alt=media&token=db2bde40-7faa-4529-a569-77795e99fe7f'
            }
            alt="mostrar senha"
            height={16}
            width={16}
          />
        </button>

        <div className="flex justify-center">
          <ButtonDefault
            text={loader ? 'Enviando' : 'Confirmar'}
            type="button"
            paddingx="px-4"
            radius="rounded-md"
            submit
            disabled={loader}
            tailwind="h-10"
          />
        </div>
      </form>
    </section>
  )
}
