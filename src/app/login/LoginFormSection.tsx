'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { ShowPassword } from '@/components/ShowPassword'
import { SocialMediaSignIn } from '@/components/SocialMediaSignIn'
import { createUserSession } from '@/data/userData'
import { auth } from '@/lib/firebase'
import { inputs } from '@/mocks/loginForm'
import { loginWithEmailSchema, loginWithPhoneNumber } from '@/schemas/login'
import { UserCredentials } from '@/types/firebaseUser'
import { FormLoginErrors, FormLoginValues, InputName } from '@/types/login'
import { AuthError, signInWithEmailAndPassword } from 'firebase/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

const initialValues: FormLoginValues = {
  user: '',
  password: '',
}

const initialErrors: FormLoginErrors = {
  user: [],
  password: [],
}

export const LoginFormSection = () => {
  const [formValues, setFormValues] = useState<FormLoginValues>(initialValues)
  const [formErrors, setFormErrors] = useState<FormLoginErrors>(initialErrors)

  const router = useRouter()

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const isOnlyNumbers = /^\d+$/.test(formValues.user)

    if (isOnlyNumbers) {
      const validation = loginWithPhoneNumber.safeParse(formValues)
      if (!validation.success) {
        setFormErrors({
          ...initialErrors,
          ...validation.error.formErrors.fieldErrors,
        })
      } else {
        loginWithNumber(formValues.user, formValues.password)
      }
    } else {
      const validation = loginWithEmailSchema.safeParse(formValues)
      if (!validation.success) {
        setFormErrors({
          ...initialErrors,
          ...validation.error.formErrors.fieldErrors,
        })
      } else {
        loginWithEmail(formValues.user, formValues.password)
      }
    }
  }

  async function loginWithNumber(phone: string, password: string) {
    console.log(phone, password)
    // enviar número de celular para o backend devolver para o front o email associado a aquele celular
    // logar o usuário usando o email e senha dele
  }

  async function loginWithEmail(sentEmail: string, sentPassword: string) {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        sentEmail,
        sentPassword,
      )
      const { accessToken } = credential.user as UserCredentials

      const response = await createUserSession(accessToken, formValues.user)

      if (response.success) {
        toast.success('Bem vindo de volta!')
        router.push('/')
      } else {
        toast.error('Não foi possível realizar o login')
      }
    } catch (error) {
      console.error('Erro ao logar usuário', error)
      if ((error as AuthError).code === 'auth/invalid-credential') {
        toast.error('Credenciais inválidas')
      } else if ((error as AuthError).code === 'auth/too-many-requests') {
        toast.warning('Muitas tentativas. Aguarde e tente novamente')
      } else {
        console.error(error)
      }
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    // limpar erros
    if (formErrors[name as InputName].length > 0)
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ...(formErrors[name as InputName] = []),
      }))

    if (name === 'user')
      setFormValues((prevValues) => ({
        ...prevValues,
        user: value.toLowerCase(),
      }))
    else if (name === 'password')
      setFormValues((prevValues) => ({
        ...prevValues,
        password: value,
      }))
  }

  return (
    <section className="flex grow items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-96 flex-col gap-3">
        <h1 className="text-center text-3xl font-bold text-principal-blue">
          Acessar o FlashVibe
        </h1>

        <form
          action=""
          className="flex w-full flex-col self-center"
          onSubmit={handleFormSubmit}
        >
          {inputs.map((data) => (
            <InputDefault
              key={data.placeholder}
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

          <div className="mb-10 flex items-center justify-between">
            <Link
              href={'/redefinir-senha/email'}
              className="text-sm text-principal-blue"
            >
              Esqueci minha senha
            </Link>

            <ShowPassword />
          </div>

          <div className="flex justify-center">
            <ButtonDefault
              text="Logar"
              type="button"
              style="dark"
              radius="rounded-2xl"
              paddingx="px-10"
              paddingy="py-2"
              shadow
              submit
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
