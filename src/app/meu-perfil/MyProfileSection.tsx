'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { SpinLoader } from '@/components/SpinLoader'
import { getAllUserData, updateUserData } from '@/data/userData'
import { useCookies } from '@/hooks/cookies'
import { formatPhone, usePhoneMask } from '@/hooks/inputMasks'
import { inputs, phoneInput } from '@/mocks/myProfileForm'
import { AllUserData, AllUserDataErrors, InputName } from '@/types/myProfile'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { sendUserPhotoInFirebase } from '@/data/images'
import userDataSchema from '@/schemas/changeUserData'
import Image from 'next/image'
import { useSessionValidation } from '@/hooks/sessionValidation'

const defaultData: AllUserData = {
  email: '',
  name: '',
  nickname: '',
  phone: '',
  password: '',
  photo: '',
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
  const [cleanPhone, setCleanPhone] = useState<string>('')
  const [loadig, setLoadig] = useState<boolean>(true)
  const [sending, setSending] = useState<boolean>(false)

  const mask = usePhoneMask()

  const jwtToken = useCookies('Authorization')

  const { pageLoading } = useSessionValidation()

  const router = useRouter()

  useEffect(() => {
    if (pageLoading) return

    if (!jwtToken) {
      toast.warning('É preciso logar novamente')
      router.push('/login')
      return
    }

    const fetchData = async () => {
      const data = await getAllUserData(jwtToken)

      if (data.success) {
        const phone = data.data.phone.replace(/\D/g, '')
        const formattedPhone = formatPhone(phone)

        setUserData({
          email: data.data.email,
          name: data.data.name,
          nickname: data.data.nickname,
          phone: formattedPhone,
          password: '',
          photo: data.data.photo,
        })
      }

      setLoadig(false)
    }

    fetchData()
  }, [jwtToken, mask, pageLoading, router])

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
    } else if (name === 'phone') {
      const phone = value.replace(/\D/g, '')
      setCleanPhone(phone)
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] || null
    setUserData((prevData) => ({ ...prevData, photo: file }))
  }

  function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setSending(true)

    const sendData = { ...userData, phone: cleanPhone }

    const validation = userDataSchema.safeParse(sendData)

    if (!validation.success) {
      setUserDataErrors({
        ...defaultErrors,
        ...validation.error.formErrors.fieldErrors,
      })

      const imageErrors = validation.error.formErrors.fieldErrors.photo
      if (imageErrors) {
        toast.error(imageErrors[0])
      }

      setSending(false)
    } else {
      // verificar se colocou numero de celular e enviar codigo para ele

      sendUserData()
    }
  }

  const sendUserData = async () => {
    if (userData.photo instanceof File) {
      const image = userData.photo

      const response = await sendUserPhotoInFirebase(image, 'users')

      if (response.success) {
        const sendData = {
          ...userData,
          photo: response.link,
          phone: cleanPhone,
        }

        if (jwtToken) {
          const response = await updateUserData(sendData, jwtToken)

          if (response.success) {
            toast.success('Dados atualizados')
            router.push('/')
          } else {
            toast.error('Erro ao atualizar dados')
          }
        }
      } else {
        toast.warning('Erro ao salvar dados')
      }
    } else {
      if (jwtToken) {
        const sendData = {
          ...userData,
          phone: cleanPhone,
        }

        const response = await updateUserData(sendData, jwtToken)

        if (response.success) {
          toast.success('Dados atualizados')
          router.push('/')
        } else {
          toast.error('Erro ao atualizar dados')
        }
      }
    }

    setSending(false)
  }

  if (pageLoading)
    return (
      <main className="relative flex min-h-screen-header items-center justify-center">
        <SpinLoader />
      </main>
    )

  return (
    <main className="min-h-screen-header">
      {loadig ? (
        <div className="relative flex h-screen-header w-full items-center justify-center">
          <SpinLoader />
        </div>
      ) : (
        <section
          className={`mb-16 mt-12 flex flex-col items-center px-6 ${sending && 'pointer-events-none'}`}
        >
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
                  value={userData[input.name as InputName] || ''}
                  error={userDataErrors[input.name as InputName]}
                  onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    disable
                  />
                </div>

                <ButtonDefault
                  style="outDark"
                  text="Alterar senha"
                  type="link"
                  link="/redefinir-senha/email"
                  radius="rounded-md"
                  paddingx="px-4"
                  tailwind="h-10"
                  disabled={sending}
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
                      userData.photo instanceof File
                        ? URL.createObjectURL(userData.photo)
                        : userData.photo ||
                          'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/user-photo.webp?alt=media&token=1072d589-22e2-4c44-83a0-218b9f87ab06'
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
              <div className="mb-16">
                <ButtonDefault
                  type="button"
                  text="Salvar alterações"
                  submit
                  paddingy="py-2"
                  tailwind="w-full"
                  radius="rounded-lg"
                  disabled={sending}
                />
              </div>

              <div className="flex gap-5">
                <ButtonDefault
                  type="button"
                  text="Deletar conta"
                  paddingy="py-2"
                  tailwind="w-full"
                  radius="rounded-lg"
                  disabled={sending}
                />

                <ButtonDefault
                  type="link"
                  link="/meu-perfil/deslogar"
                  text="Sair"
                  paddingy="py-2"
                  tailwind="w-full"
                  radius="rounded-lg"
                  disabled={sending}
                />
              </div>
            </div>
          </form>
        </section>
      )}
    </main>
  )
}
