'use client'

import { InputDefault } from '@/components/InputDefault'
import { useEffect, useState } from 'react'
import {
  FormChangePasswordErrors,
  FormChangePasswordValues,
  InputName,
} from '@/types/changePassword'
import { ButtonDefault } from '@/components/ButtonDefault'
import { ShowPassword } from '@/components/ShowPassword'
import { redirect, useSearchParams } from 'next/navigation'
import passwordSchema from '@/schemas/password'
import { newPasswordInputs } from '@/mocks/password'

const initialValues: FormChangePasswordValues = {
  password: '',
  passwordConfirmation: '',
}

const initialErrors: FormChangePasswordErrors = {
  password: [],
  passwordConfirmation: [],
}

export const ResetPasswordSection = () => {
  const searchParams = useSearchParams()
  const uid = searchParams.get('uid')
  const token = searchParams.get('token')

  const [formValues, setFormValues] =
    useState<FormChangePasswordValues>(initialValues)
  const [formErrors, setFormErrors] =
    useState<FormChangePasswordErrors>(initialErrors)

  const [loader, setLoader] = useState<boolean>(false)

  useEffect(() => {
    if (!uid || !token) {
      redirect('/')
    }
  }, [uid, token])

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

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault()

    setLoader(true)

    const validation = passwordSchema.safeParse(formValues)

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
        {newPasswordInputs.map((input, index) => (
          <InputDefault
            key={index}
            name={input.name}
            type={input.type}
            placeholder={input.placeholder ?? ''}
            value={formValues[input.name as InputName]}
            error={formErrors[input.name as InputName]}
            image={input.image}
            onChange={handleInputChange}
            tailwind="mb-3"
          />
        ))}

        <ShowPassword />

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
