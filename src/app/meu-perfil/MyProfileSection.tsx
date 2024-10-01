'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { usePhoneMask } from '@/hooks/inputMasks'
import { inputs, phoneInput } from '@/mocks/myProfileForm'
import userDataSchema from '@/schemas/changeUserData'
import { AllUserData, AllUserDataErrors, InputName } from '@/types/myProfile'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-toastify'

const defaultData: AllUserData = {
  email: 'email@gmail.com',
  name: 'Vinicius',
  nickname: 'Vini',
  phone: '',
  password: '',
  photo: null,
}

const defaultErrors: AllUserDataErrors = {
  email: [],
  name: [],
  nickname: [],
  phone: [],
  password: [],
  photo: [],
}

export const MyProfileSection = () => {
  const [userData, setUserData] = useState<AllUserData>(defaultData)
  const [userDataErrors, setUserDataErrors] =
    useState<AllUserDataErrors>(defaultErrors)

  const mask = usePhoneMask()

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target
    setUserData((prevData) => ({ ...prevData, [name]: value }))

    if (userDataErrors[name as InputName].length > 0)
      setUserDataErrors((prevErrors) => ({
        ...prevErrors,
        ...(userDataErrors[name as InputName] = []),
      }))

    if (name === 'name' || name === 'nickname') {
      const formattedValue = value
        .toLowerCase()
        .split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')

      setUserData((prevValues) => ({
        ...prevValues,
        [name]: formattedValue,
      }))
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null
    setUserData((prevData) => ({ ...prevData, photo: file }))
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validation = userDataSchema.safeParse(userData)

    if (!validation.success) {
      setUserDataErrors({
        ...defaultErrors,
        ...validation.error.formErrors.fieldErrors,
      })

      console.log(validation.error.formErrors)

      const imageErrors = validation.error.formErrors.fieldErrors.photo
      if (imageErrors) {
        toast.error(imageErrors[0])
      }
    } else {
      // verificar se colocou numero de celular e enviar codigo para ele
      // alterar no banco de dados
      console.log('deu certo')
    }
  }

  return (
    <main className="min-h-screen-header">
      <section className="mb-16 mt-12 flex flex-col items-center px-6">
        <h1 className="mb-10 max-w-842px text-center text-2xl font-semibold">
          Meu perfil
        </h1>

        <form
          action=""
          className="flex max-w-842px flex-wrap justify-center gap-32"
          onSubmit={handleFormSubmit}
        >
          <div className="flex max-w-420px flex-col gap-8">
            <div>
              <h2 className="mb-2 text-xl font-semibold">
                Informações de usuário
              </h2>
              <p className="text-light-gray500">
                Aqui você pode alterar suas informações
              </p>
            </div>

            {inputs.map((input, index) => (
              <InputDefault
                name={input.name}
                type={input.type}
                key={index}
                label={input.label}
                value={userData[input.name as InputName]}
                error={userDataErrors[input.name as InputName]}
                onChange={(event) => handleInputChange(event)}
                disable={input.disable}
              />
            ))}

            <div>
              <div>
                <label htmlFor={phoneInput.name} className="font-medium">
                  Celular
                </label>
              </div>
              <InputDefault
                name={phoneInput.name}
                placeholder={phoneInput.placeholder ?? ''}
                type={phoneInput.type}
                image={phoneInput.image}
                value={userData.phone}
                onChange={handleInputChange}
                ref={mask}
                error={userDataErrors.phone}
                tailwind="grow"
              />
            </div>

            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <label htmlFor="password" className="font-medium">
                  Senha
                </label>
                <InputDefault
                  name="password"
                  type="password"
                  value="**********"
                  disable
                />
              </div>

              <ButtonDefault
                style="outDark"
                text="Alterar senha"
                type="button"
                radius="rounded-md"
                paddingx="px-4"
                tailwind="h-10"
              />
            </div>
          </div>

          <div className="max-w-272px">
            <h2 className="mb-6 text-center text-xl font-semibold">
              Foto de pefil
            </h2>
            <div className="relative mb-16 h-272px w-272px">
              <div className="h-full w-full rounded-full border border-light-gray225">
                <Image
                  alt="Selecione uma imagem"
                  src={
                    userData.photo
                      ? URL.createObjectURL(userData.photo)
                      : 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/user-photo.webp?alt=media&token=1072d589-22e2-4c44-83a0-218b9f87ab06'
                  }
                  width={272}
                  height={272}
                  className="h-full w-full rounded-full object-cover object-center"
                />
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 rounded-full opacity-0"
              />
            </div>
            <ButtonDefault
              type="button"
              text="Salvar alterações"
              submit
              paddingy="py-2"
              tailwind="w-full"
              radius="rounded-lg"
            />
          </div>
        </form>
      </section>
    </main>
  )
}
