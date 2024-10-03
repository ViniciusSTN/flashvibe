'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { ShowPassword } from '@/components/ShowPassword'
import { validateJwtToken } from '@/data/sendCodeToEmail'
import { createNewUserWithPassword } from '@/data/userData'
import { passwordInputs } from '@/mocks/password'
import passwordSchema from '@/schemas/password'
import {
  FormCreatePasswordErrors,
  FormCreatePasswordValues,
  InputName,
} from '@/types/createPassword'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const initialValues: FormCreatePasswordValues = {
  password: '',
  passwordConfirmation: '',
}

const initialErrors: FormCreatePasswordErrors = {
  password: [],
  passwordConfirmation: [],
}

export const CreatePasswordSection = () => {
  const searchParams = useSearchParams()
  const param = searchParams.get('code')

  const [formValues, setFormValues] =
    useState<FormCreatePasswordValues>(initialValues)
  const [formErrors, setFormErrors] =
    useState<FormCreatePasswordErrors>(initialErrors)
  const [loader, setLoader] = useState<boolean>(false)

  const router = useRouter()

  useEffect(() => {
    if (!param) {
      redirect('/')
    }
  }, [param])

  useEffect(() => {
    const validation = async () => {
      if (param) {
        const response = await validateJwtToken(param)

        console.log(response)

        if (!response.success) router.push('/registro')
      }
    }

    validation()
  }, [param, router])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    // limpar erros
    if (formErrors[name as InputName].length > 0)
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ...(formErrors[name as InputName] = []),
      }))

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }))
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoader(true)

    const validation = passwordSchema.safeParse(formValues)

    if (!validation.success) {
      setFormErrors({
        ...initialErrors,
        ...validation.error.formErrors.fieldErrors,
      })
    } else if (param) {
      const response = await createNewUserWithPassword(
        formValues.password,
        param,
      )

      if (response.success) {
        if (response.user) {
          toast.success('Cadastro realizado com sucesso!')

          console.log(response.user)

          router.push('/login')
        }
      } else {
        toast.error(response.error[0])
        response.error.forEach((err) => {
          console.error(err)
        })
      }
    }

    setLoader(false)
  }

  return (
    <section className="flex grow items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-96 flex-col gap-3">
        <h1 className="text-center text-3xl font-bold text-principal-blue">
          Definir senha
        </h1>

        <form
          action=""
          className="flex w-full flex-col self-center"
          onSubmit={handleFormSubmit}
        >
          {passwordInputs.map((data, index) => (
            <InputDefault
              key={index}
              placeholder={data.placeholder ?? ''}
              image={data.image}
              name={data.name}
              onChange={handleInputChange}
              value={formValues[data.name as InputName]}
              type={data.type}
              error={formErrors[data.name as InputName]}
              tailwind="mb-3"
            />
          ))}

          <ShowPassword />

          <div className="flex justify-center">
            <ButtonDefault
              text={loader ? 'Enviando...' : 'Cadastrar'}
              type="button"
              style="dark"
              radius="rounded-2xl"
              paddingx="px-10"
              paddingy="py-2"
              shadow
              submit
              disabled={loader}
            />
          </div>
        </form>
      </div>
    </section>
  )
}
