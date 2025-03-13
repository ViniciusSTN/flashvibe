'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { TextAreaDefault } from '@/components/TextAreaDefault'
import { sendManyUserPhotosInFirebase } from '@/data/images'
import { imageValidations } from '@/schemas/images'
import { NewDiscussionData, NewDiscussionErrors } from '@/types/discussions'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { discussionSchema } from '@/schemas/discussion'
import { useSessionValidation } from '@/hooks/sessionValidation'
import { useRouter } from 'next/navigation'
import { useCookies } from '@/hooks/cookies'
import { SpinLoader } from '@/components/SpinLoader'
import Image from 'next/image'

const initialData: NewDiscussionData = {
  title: '',
  description: '',
  images: [],
}

const initialErrors: NewDiscussionErrors = {
  title: [],
  description: [],
  images: [],
}

export const NewDiscussionSection = () => {
  const [loader, setLoader] = useState<boolean>(false)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [formData, setFormData] = useState<NewDiscussionData>(initialData)
  const [formErrors, setFormErrors] =
    useState<NewDiscussionErrors>(initialErrors)

  const router = useRouter()

  const jwtToken = useCookies('Authorization')

  const { pageLoading } = useSessionValidation()

  useEffect(() => {
    if (pageLoading) return

    if (!jwtToken) {
      toast.warning('É preciso logar novamente')
      router.push('/login')
    }
  }, [pageLoading, jwtToken, router])

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const value = event.target.value
    const name = event.target.name as keyof NewDiscussionErrors

    if (formErrors[name].length > 0) {
      setFormErrors((prevState) => ({
        ...prevState,
        [name]: initialErrors[name],
      }))
    }

    if (name === 'title')
      setFormData((prevState) => ({ ...prevState, title: value }))
    else if (name === 'description')
      setFormData((prevState) => ({ ...prevState, description: value }))
  }

  const removeImage = (indexToRemove: number) => {
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[indexToRemove])
      return prev.filter((_, index) => index !== indexToRemove)
    })

    setFormData((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, index) => index !== indexToRemove),
    }))
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setLoader(true)

    const validation = discussionSchema.safeParse(formData)

    if (!validation.success) {
      setFormErrors({
        ...initialErrors,
        ...validation.error.formErrors.fieldErrors,
      })

      const imageErrors = validation.error.formErrors.fieldErrors.images
      if (imageErrors && imageErrors.length > 0) toast.warn(imageErrors[0])
    } else {
      if (formData.images.length > 0) {
        const imagesResponse = await sendManyUserPhotosInFirebase(
          formData.images,
          'discussion',
        )

        if (imagesResponse.success) {
          // enviar para o back end
          // redirecionar para a página da discussão
          console.log('Deu bom')
        }
      } else {
        // enviar para o back end
        // redirecionar para a página da discussão
        console.log('Deu bom')
      }
    }

    setLoader(false)
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files
    if (files) {
      const filesArray = Array.from(files)

      const validationResult = imageValidations.safeParse(filesArray)
      if (!validationResult.success) {
        const fieldErrors = validationResult.error.formErrors
          .fieldErrors as Record<string, string[]>

        const errorKeys = Object.keys(fieldErrors)

        const firstKey = errorKeys[0]
        if (firstKey) {
          const firstErrorMessage = fieldErrors[firstKey][0]
          if (firstErrorMessage) toast.warning(firstErrorMessage)
        }
      } else {
        const newImagePreviews = filesArray.map((file) =>
          URL.createObjectURL(file),
        )

        setImagePreviews((prev) => [...prev, ...newImagePreviews])

        setFormData((prevState) => ({
          ...prevState,
          images: [...prevState.images, ...filesArray],
        }))
      }
    }
  }

  if (pageLoading)
    return (
      <div className="relative flex min-h-screen-header items-center justify-center">
        <SpinLoader />
      </div>
    )

  return (
    <section className="mx-auto mb-24 mt-16 min-h-screen-header max-w-920px px-6 md:px-10">
      <h1 className="mb-10 text-center text-2xl font-semibold">
        Novo tópico de discussão
      </h1>

      <form
        action=""
        onSubmit={handleFormSubmit}
        className="flex flex-col gap-6"
      >
        <InputDefault
          name="title"
          type="text"
          label="Título"
          placeholder="Ex: qual é a melhor forma de criar um flashcard?"
          onChange={handleInputChange}
          value={formData.title}
          error={formErrors.title}
        />

        <TextAreaDefault
          name="description"
          label="Descrição"
          placeholder="Descreva com detalhes"
          onChange={handleInputChange}
          value={formData.description}
          error={formErrors.description}
        />

        <div>
          <input
            id="fileUpload"
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            multiple
            className="hidden"
          />

          <label
            htmlFor="fileUpload"
            className="flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-principal-blue hover:border-secondary-blue"
          >
            <ButtonDefault
              text="Anexar imagem"
              type="button"
              style="outDark"
              radius="rounded-md"
              paddingy="py-2"
              tailwind="w-full pointer-events-none border-none"
            />
          </label>
        </div>

        {formData.images.length > 0 && (
          <ul className="grid grid-cols-2 gap-4 vsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
            {imagePreviews.map((image, index) => (
              <li
                key={index}
                className="relative flex items-center justify-center"
              >
                <button type="button" onClick={() => removeImage(index)}>
                  <Image
                    src={image}
                    alt={`anexo ${index + 1}`}
                    className="h-[125px] w-[125px] object-cover object-center"
                    width={125}
                    height={125}
                  />

                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/close-svgrepo-com.svg?alt=media&token=f5a52b8f-6f12-4716-a4ab-91201310fc4d"
                    alt={`excluir imagem ${index + 1}`}
                    width={48}
                    height={48}
                    className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 opacity-55"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}

        <ButtonDefault
          submit
          type="button"
          text={loader ? 'Publicando...' : 'Publicar'}
          radius="rounded-md"
          paddingy="py-2"
          tailwind="w-52 ml-auto"
          disabled={loader}
        />
      </form>
    </section>
  )
}
