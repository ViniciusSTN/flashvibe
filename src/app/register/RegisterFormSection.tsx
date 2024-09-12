'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { auth } from '@/lib/firebase'
import { inputs } from '@/mocks/registerForm'
import registerSchema from '@/schemas/register'
import { showPasswordAtom } from '@/states'
import {
  FormRegisterErrors,
  FormRegisterValues,
  InputName,
} from '@/types/register'
import {
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import Image from 'next/image'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'

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

  const [showPassword, setShowPassword] = useRecoilState(showPasswordAtom)
  const showPasswordValue = useRecoilValue(showPasswordAtom)

  function handleShowPasswordClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setShowPassword(!showPassword)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

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

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validation = registerSchema.safeParse(formValues)

    if (!validation.success) {
      setFormErrors({
        ...initialErrors,
        ...validation.error.formErrors.fieldErrors,
      })
    }
    // enviar dado de email para o backend enviar um código de confirmação no email do usuário
  }

  const handleGoogleRegister = async () => {
    try {
      const googleProvider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, googleProvider)
      console.log(result)

      if (result) {
        const additionalUserInfo = getAdditionalUserInfo(result)

        if (additionalUserInfo) {
          const isNewUser = additionalUserInfo.isNewUser
          if (isNewUser) {
            const { displayName, email } = result.user
            console.log(displayName?.split(' ')[0], email)
            // enviar dados para o backend criar um novo registro no BD
            // enviar dados para o backend logar o usuário
            // redirecionar para a home e mostrar um toast de sucesso
          } else {
            // enviar dados para o backend logar o usuário
          }
        }
      }
    } catch (error) {
      console.error('Erro ao fazer login com o Google:', error)
    }
  }

  return (
    <section className="flex grow items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-96 flex-col gap-3">
        <h1 className="text-center text-2xl font-bold text-principal-blue">
          Criar uma conta
        </h1>

        <form
          action=""
          className="flex w-full flex-col self-center"
          onSubmit={handleFormSubmit}
        >
          {inputs.map((data) => (
            <InputDefault
              key={data.placeholder}
              placeholder={data.placeholder}
              image={data.image}
              name={data.name}
              onChange={handleInputChange}
              value={formValues[data.name as InputName]}
              type={data.type}
              error={formErrors[data.name as InputName]}
              tailwind="mb-3"
            />
          ))}

          <button
            className="mb-6 flex items-center gap-1 self-end"
            type="submit"
            onClick={handleShowPasswordClick}
          >
            <span className="text-sm">
              {showPassword ? 'Esconder senha' : 'Ver senha'}
            </span>
            <Image
              src={
                showPasswordValue
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
              text="Cadastrar"
              type="button"
              style="dark"
              radius="rounded-2xl"
              paddingx="px-10"
              paddingy="py-2"
              shadow
            />
          </div>
        </form>

        <p className="my-5 flex items-center justify-center text-light-gray225 before:mr-4 before:inline-block before:h-px before:w-full before:max-w-24 before:bg-light-gray225 before:content-[''] after:ml-3 after:inline-block after:h-px after:w-full after:max-w-24 after:bg-light-gray225 after:content-['']">
          ou
        </p>

        <div className="flex items-center justify-center gap-8">
          <button onClick={handleGoogleRegister}>
            <Image
              className="transition-all hover:scale-105"
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/google-icon.svg?alt=media&token=c5a5060a-2bad-473a-b126-f63fe5a937cc"
              alt="fazer registro com google"
              height={40}
              width={40}
            />
          </button>

          <button>
            <Image
              className="transition-all hover:scale-105"
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/icons8-facebook.svg?alt=media&token=4f134bb3-a925-4526-9939-68b9265bbaee"
              alt="fazer registro com facebook"
              height={48}
              width={48}
            />
          </button>
        </div>
      </div>
    </section>
  )
}
