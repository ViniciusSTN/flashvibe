'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { ShowPassword } from '@/components/ShowPassword'
import { createNewUser } from '@/data/userData'
import { passwordInputs } from '@/mocks/password'
import passwordSchema from '@/schemas/password'
import { userEmailAtom, userNameAtom, userNicknameAtom } from '@/states'
import {
  FormCreatePasswordErrors,
  FormCreatePasswordValues,
  InputName,
} from '@/types/createPassword'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState } from 'recoil'

const initialValues: FormCreatePasswordValues = {
  password: '',
  passwordConfirmation: '',
}

const initialErrors: FormCreatePasswordErrors = {
  password: [],
  passwordConfirmation: [],
}

export const CreatePasswordSection = () => {
  const [formValues, setFormValues] =
    useState<FormCreatePasswordValues>(initialValues)
  const [formErrors, setFormErrors] =
    useState<FormCreatePasswordErrors>(initialErrors)
  const [loader, setLoader] = useState<boolean>(false)

  const router = useRouter()

  const [email, setEmail] = useRecoilState(userEmailAtom)
  const [name, setName] = useRecoilState(userNameAtom)
  const [nickname, setNickname] = useRecoilState(userNicknameAtom)

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
    } else {
      const response = await createNewUser(email, name, nickname) // backend criar novo usuário

      // registar usuário no firebase aqui

      if (response.success) {
        toast.success('Cadastro realizado com sucesso!')
        router.push('/login')
        setName('')
        setNickname('')
        setEmail('')
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
