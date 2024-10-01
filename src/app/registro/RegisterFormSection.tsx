'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { SocialMediaSignIn } from '@/components/SocialMediaSignIn'
import { sendConfirmationCodeToEmail } from '@/data/sendCodeToEmail'
import { inputs } from '@/mocks/registerForm'
import registerSchema from '@/schemas/register'
import { userEmailAtom, userNameAtom, userNicknameAtom } from '@/states'
import {
  FormRegisterErrors,
  FormRegisterValues,
  InputName,
} from '@/types/register'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'

const initialValues: FormRegisterValues = {
  name: '',
  nickname: '',
  email: '',
  password: '',
  passwordConfirmation: '',
}

const initialErrors: FormRegisterErrors = {
  name: [],
  nickname: [],
  email: [],
  password: [],
  passwordConfirmation: [],
}

export const RegisterFormSection = () => {
  const [formValues, setFormValues] =
    useState<FormRegisterValues>(initialValues)
  const [formErrors, setFormErrors] =
    useState<FormRegisterErrors>(initialErrors)
  const [loader, setLoader] = useState(false)

  const router = useRouter()

  const setEmail = useSetRecoilState(userEmailAtom)
  const setName = useSetRecoilState(userNameAtom)
  const setNickname = useSetRecoilState(userNicknameAtom)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    // limpar erros
    if (formErrors[name as InputName].length > 0)
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ...(formErrors[name as InputName] = []),
      }))

    if (name === 'name' || name === 'nickname') {
      const formattedValue = value
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: formattedValue,
      }))
    } else if (name === 'email')
      setFormValues((prevValues) => ({
        ...prevValues,
        email: value.toLowerCase(),
      }))
    else if (name === 'password' || name === 'passwordConfirmation')
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }))
  }

  async function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoader(true)

    const validation = registerSchema.safeParse(formValues)

    if (!validation.success) {
      setFormErrors({
        ...initialErrors,
        ...validation.error.formErrors.fieldErrors,
      })
    } else {
      // enviar dado de email para o backend enviar um código de confirmação no email do usuário
      const response = await sendConfirmationCodeToEmail(
        formValues.email,
        formValues.nickname,
      )

      if (response.success) {
        setEmail(formValues.email)
        setNickname(formValues.nickname)
        setName(formValues.name)
        router.push('/registro/confirmacao')
      } else {
        toast.error(response.error[0])
      }
    }

    setLoader(false)
  }

  return (
    <section className="flex grow items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-96 flex-col gap-3">
        <h1 className="text-center text-3xl font-bold text-principal-blue">
          Criar uma conta
        </h1>

        <form
          action=""
          className="flex w-full flex-col self-center"
          onSubmit={handleFormSubmit}
        >
          {inputs.map((data, index) => (
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

          <div className="mt-8 flex justify-center">
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

        <p className="my-5 flex items-center justify-center text-light-gray225 before:mr-4 before:inline-block before:h-px before:w-full before:max-w-24 before:bg-light-gray225 before:content-[''] after:ml-3 after:inline-block after:h-px after:w-full after:max-w-24 after:bg-light-gray225 after:content-['']">
          ou
        </p>

        <div className="flex items-center justify-center gap-8">
          <SocialMediaSignIn />
        </div>
      </div>
    </section>
  )
}
