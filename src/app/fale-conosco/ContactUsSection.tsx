'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { ImageList } from '@/components/ImageList'
import { InputDefault } from '@/components/InputDefault'
import { SelectImageButton } from '@/components/SelectImageButton'
import { TextAreaDefault } from '@/components/TextAreaDefault'
import { sendManyUserPhotosInFirebase } from '@/data/images'
import { contactUsSchema } from '@/schemas/contactUs'
import { imageValidations } from '@/schemas/images'
import { ContactUsData, ContactUsErrors, InputName } from '@/types/contactUs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

const initialData: ContactUsData = {
  name: '',
  description: '',
  email: '',
  subject: '',
  images: [],
}

const initialErrors: ContactUsErrors = {
  name: [],
  description: [],
  email: [],
  subject: [],
  images: [],
}

export const ContactUsSection = () => {
  const router = useRouter()

  const [formData, setFormData] = useState<ContactUsData>(initialData)
  const [formErrors, setFormErrors] = useState<ContactUsErrors>(initialErrors)
  const [images, setImages] = useState<string[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value, name } = event.target

    if (formErrors[name as InputName].length > 0)
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        ...(formErrors[name as InputName] = []),
      }))

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const validation = contactUsSchema.safeParse(formData)
    const imageErrors = validation.error?.formErrors.fieldErrors.images

    if (!validation.success) {
      setFormErrors({
        ...initialErrors,
        ...validation.error.formErrors.fieldErrors,
      })

      if (imageErrors && imageErrors.length > 0) toast.warn(imageErrors[0])
    } else {
      setFormErrors(initialErrors)

      if (formData.images.length > 0) {
        const firebaseReponse = await sendManyUserPhotosInFirebase(
          formData.images,
          'contacts',
        )

        if (firebaseReponse.success) {
          // enviar dados para o back end
          toast.success('Mensagem enviada com sucesso')
          router.push('/')
        } else {
          toast.error('Erro ao enviar imagens')
        }
      } else {
        // enviar dados para o back end
        toast.success('Mensagem enviada com sucesso')
        router.push('/')
      }
    }

    setLoading(false)
  }

  return (
    <section className="mx-auto mb-24 mt-16 min-h-screen-header max-w-656px px-6 md:px-10">
      <h1 className="mb-10 text-center text-2xl font-semibold">Fale Conosco</h1>

      <p className="mb-10">
        Nos envie um e-mail para que nossa equipe de suporte avalie e solucione
        seu problema
      </p>

      <form
        action=""
        className="flex flex-col gap-12"
        onSubmit={handleFormSubmit}
      >
        <div className="flex flex-col gap-6">
          <InputDefault
            name="name"
            type="text"
            label="Nome"
            placeholder="Ex: João"
            value={formData.name}
            error={formErrors.name}
            onChange={handleInputChange}
          />

          <InputDefault
            name="email"
            type="text"
            label="Email"
            placeholder="Ex: email@gmail.com"
            value={formData.email}
            error={formErrors.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-6">
          <TextAreaDefault
            name="subject"
            label="Assunto"
            placeholder="Ex: erro ao acessar meus decks"
            value={formData.subject}
            error={formErrors.subject}
            onChange={handleInputChange}
          />

          <TextAreaDefault
            name="description"
            label="Descrição"
            placeholder="Descreva com detalhes"
            value={formData.description}
            error={formErrors.description}
            onChange={handleInputChange}
          />

          <SelectImageButton
            id="Adicionar imagem de anexo"
            text="Anexar imagem"
            setFormData={setFormData}
            setImagePreviews={setImages}
            validations={imageValidations}
          />
        </div>

        {images.length > 0 && (
          <ImageList
            images={images}
            setImagePreviews={setImages}
            setFormData={setFormData}
          />
        )}

        <ButtonDefault
          text={loading ? 'Enviando...' : 'Enviar'}
          type="button"
          disabled={loading}
          paddingy="py-2"
          paddingx="px-5"
          radius="rounded-md"
          tailwind="w-[260px] ml-auto"
          submit
        />
      </form>
    </section>
  )
}
