'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { createFlashcardSchema, frontSchema } from '@/schemas/flashcard'
import { imageValidations } from '@/schemas/images'
import {
  flashcardOverlayAtom,
  newFlashcardDataAtom,
  newFlashcardErrorsAtom,
} from '@/states'
import {
  EditFlashcardDataType,
  FlashcardErrorsType,
  SendExampleType,
  SendFlashcardImageType,
  SendFlashcardType,
  SendImageType,
  SendTranslationType,
  SentenceCorretionType,
} from '@/types/flashcard'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { FlashcardTranslationsModal } from './FlashcardTranslationsModal'
import { SearchFlashcardTranslationsModal } from './SearchFlashcardTranslationsModal'
import { EditFlashcardExamplesModal } from './EditFlashcardExamplesModal'
import { SearchFlashcardExamplesModal } from './SearchFlashcardExamplesModal'
import { EditFlashcardPronunciationsModal } from './EditFlashcardPronunciationsModal'
import { toast } from 'react-toastify'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  correctSentence,
  createFlashcard,
  updateFlashcard,
} from '@/data/flashcards'
import { FrontCorretionsModal } from './FrontCorretionsModal'
import { SpinLoader } from './SpinLoader'
import { sendManyUserPhotosInFirebase } from '@/data/images'
import { useCookies } from '@/hooks/cookies'
import { DeleteFlashcardModal } from './DeleteFlashcardModal'
import Image from 'next/image'

const initialErrors: FlashcardErrorsType = {
  mainPhrase: [],
  examples: [],
  images: [],
  keyword: [],
  pronunciations: [],
  translations: [],
}

export const EditFlashcardData: EditFlashcardDataType = ({ deckId }) => {
  const [flashcardData, setFlashcardData] = useRecoilState(newFlashcardDataAtom)
  const [errors, setErrors] = useRecoilState(newFlashcardErrorsAtom)
  const [overlay, setOverlay] = useRecoilState(flashcardOverlayAtom)

  const [keywordOptions, setKeywordOptions] = useState<string[]>([])
  const [editing, setEditing] = useState<boolean>()
  const [loading, setLoading] = useState<boolean>(false)
  const [sending, setSending] = useState<boolean>(false)
  const [frontCorretions, setFrontCorretions] = useState<
    SentenceCorretionType[]
  >([])

  const audioRef = useRef<HTMLAudioElement | null>(null)

  const path = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const jwtToken = useCookies('Authorization')

  const flashcardId = searchParams.get('flashcardId')

  useEffect(() => {
    setEditing(path === '/editar-flashcard')
  }, [path])

  useEffect(() => {
    if (flashcardData.mainPhrase) {
      const keywords = Array.from(
        new Set(
          flashcardData.mainPhrase.toLowerCase().split(' ').filter(Boolean),
        ),
      )
      setKeywordOptions(keywords)
    }
  }, [flashcardData.mainPhrase])

  function handleFrontChange(event: React.ChangeEvent<HTMLInputElement>) {
    clearError('mainPhrase')

    setFlashcardData({
      mainPhrase: event.target.value,
      keyword: '',
      translations: [],
      examples: [],
      images: [],
      pronunciations: [],
    })
  }

  function handleFrontFinished() {
    const validation = frontSchema.safeParse({
      mainPhrase: flashcardData.mainPhrase,
    })

    if (validation.success) {
      // API de correção gramatical
      sendFrontToCorretion()
    } else {
      const frontError = validation.error.formErrors.fieldErrors?.mainPhrase
      if (frontError) {
        setErrors((prevState) => ({
          ...prevState,
          front: frontError,
        }))
      }
    }
  }

  const sendFrontToCorretion = async () => {
    setLoading(true)

    const response = await correctSentence(flashcardData.mainPhrase)

    if (
      response.success &&
      response.corrections &&
      response.corrections.length > 0
    ) {
      setOverlay('front')
      setFrontCorretions(response.corrections)
    }

    setLoading(false)
  }

  function clearError(field: keyof FlashcardErrorsType) {
    if (errors[field].length > 0) {
      setErrors((prevState) => ({
        ...prevState,
        [field]: [],
      }))
    }
  }

  function handleDelete(
    event: React.MouseEvent<HTMLButtonElement>,
    type: 'translations' | 'examples' | 'pronunciations' | 'images',
    index: number,
  ) {
    event.preventDefault()

    setFlashcardData((prevState) => {
      const currentArray = prevState[type]

      if (Array.isArray(currentArray)) {
        return {
          ...prevState,
          [type]: currentArray.filter((_, i) => i !== index),
        }
      }

      return prevState
    })
  }

  function handlePlayAudio(audioUrl: string) {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    const audio = new Audio(audioUrl)
    audio.volume = 0.5
    audio.play().catch((error) => {
      console.error('Erro ao tentar reproduzir o áudio:', error)
      toast.error('Erro ao reproduzir áudio')
    })
    audioRef.current = audio
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
        setFlashcardData((prevState) => ({
          ...prevState,
          images: [
            ...(prevState.images || []),
            ...filesArray.map((file) => ({
              id: 0,
              fileUrl: file,
            })),
          ],
        }))
      }
    }
  }

  const handleKeywordChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newKeyword = event.target.value

    if (errors.keyword.length > 0) {
      setErrors((prevState) => ({
        ...prevState,
        keyword: [],
      }))
    }

    setFlashcardData((prevState) => ({
      ...prevState,
      keyword: newKeyword,
      translations: [],
      examples: [],
      images: [],
      pronunciations: [],
    }))
  }

  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    const validation = createFlashcardSchema.safeParse(flashcardData)

    if (!validation.success) {
      setErrors({
        ...initialErrors,
        ...validation.error.formErrors.fieldErrors,
      })

      const { examples } = validation.error?.formErrors.fieldErrors || {}

      if (examples?.length) {
        toast.warning(examples[0])
      }
    } else {
      // Criar flashcard

      if (flashcardData.images && flashcardData.images.length > 5) {
        toast.warning('Deve ter no máximo 5 imagens')
        return
      }

      if (
        flashcardData.pronunciations &&
        flashcardData.pronunciations.length > 5
      ) {
        toast.warning('Deve ter no máximo 5 pronúncias')
        return
      }

      if (
        flashcardData.translations &&
        flashcardData.translations.length > 20
      ) {
        toast.warning('Deve ter no máximo 20 traduções')
        return
      }

      sendDataToApi()
    }
  }

  const sendDataToApi = async () => {
    setSending(true)

    if (path !== '/adicionar-flashcard' && path !== '/editar-flashcard') return

    const imagesFiles: File[] =
      flashcardData.images
        ?.filter((image) => image.fileUrl instanceof File)
        .map((image) => image.fileUrl as File) || []

    const imagesWithUrl: SendFlashcardImageType[] = (flashcardData.images
      ?.filter((image) => typeof image.fileUrl === 'string')
      .map((image) => ({
        fileUrl: image.fileUrl,
        id: image.id,
      })) || []) as SendFlashcardImageType[]

    const sendExamples: SendExampleType[] = flashcardData.examples.map(
      (example) => ({
        textExample: example.textExample,
      }),
    )

    const pronunciationsToUpdate = flashcardData.pronunciations.map(
      (pronunciation) => ({
        ...pronunciation,
        keyword: flashcardData.keyword,
      }),
    )

    const sendTranslations: SendTranslationType[] =
      flashcardData.translations?.map((translation) => ({
        textTranslation: translation.textTranslation,
      })) ?? []

    if (imagesFiles.length !== 0) {
      const imagesResponse = await sendManyUserPhotosInFirebase(
        imagesFiles,
        'examples',
      )

      if (imagesResponse.success) {
        const sendImagesToCreate: SendImageType[] = [
          ...imagesResponse.links.map((link) => ({
            imageUrl: link,
            description: 'Imagem de exemplo de uso',
          })),
        ]

        const sendImagesToUpdate: SendFlashcardImageType[] = [
          ...imagesResponse.links.map((link) => ({
            id: 0,
            fileUrl: link,
          })),
          ...imagesWithUrl,
        ]

        if (path === '/adicionar-flashcard' && Number(deckId) && jwtToken) {
          // adicionar flashcard com imagens do firebase
          const response = await createFlashcard(
            jwtToken,
            Number(deckId),
            flashcardData.keyword,
            flashcardData.mainPhrase,
            sendExamples,
            sendTranslations,
            flashcardData.pronunciations,
            sendImagesToCreate,
          )

          if (response.success) {
            toast.success('Flashcard criado com sucesso')
            router.push(`/flashcards?deckId=${deckId}`)
          } else {
            toast.error('Erro ao criar flashcard')
          }
        } else if (
          path === '/editar-flashcard' &&
          Number(deckId) &&
          jwtToken &&
          flashcardId
        ) {
          // atualizar flashcard com imagens do firebase
          const sendFlashcard: SendFlashcardType = {
            ...flashcardData,
            pronunciations: pronunciationsToUpdate,
            images: sendImagesToUpdate,
          }

          const response = await updateFlashcard(
            Number(flashcardId),
            Number(deckId),
            jwtToken,
            sendFlashcard,
          )

          if (response.success) {
            toast.success('Flashcard atualizado com sucesso')
            router.push(`/flashcards?deckId=${deckId}`)
          } else {
            toast.error('Erro ao atualizar flashcard')
          }
        }
      } else {
        toast.error('Erro ao salvar imagens, tente novamente')
      }
    } else {
      // adicionar flashcard sem imagens
      if (path === '/adicionar-flashcard' && Number(deckId) && jwtToken) {
        const response = await createFlashcard(
          jwtToken,
          Number(deckId),
          flashcardData.keyword,
          flashcardData.mainPhrase,
          sendExamples,
          sendTranslations,
          flashcardData.pronunciations,
          [],
        )

        if (response.success) {
          toast.success('Flashcard criado com sucesso')
          router.push(`/flashcards?deckId=${deckId}`)
        } else {
          toast.error('Erro ao criar flashcard')
        }
      } else if (
        path === '/editar-flashcard' &&
        Number(deckId) &&
        jwtToken &&
        flashcardId
      ) {
        // editar flashcard sem novas imagens
        const sendFlashcard: SendFlashcardType = {
          ...flashcardData,
          images: imagesWithUrl,
          pronunciations: pronunciationsToUpdate,
        }

        const response = await updateFlashcard(
          Number(flashcardId),
          Number(deckId),
          jwtToken,
          sendFlashcard,
        )

        if (response.success) {
          toast.success('Flashcard atualizado com sucesso')
          router.push(`/flashcards?deckId=${deckId}`)
        } else {
          toast.error('Erro ao atualizar flashcard')
        }
      }
    }

    setSending(false)
  }

  return (
    <div
      className={`mx-auto my-24 min-h-screen-header max-w-1440px px-6 md:px-20 ${loading && 'pointer-events-none'}`}
    >
      {(loading || sending) && (
        <div className="fixed inset-0 flex items-center justify-center">
          <SpinLoader />
        </div>
      )}

      <button
        className={`fixed inset-0 z-50 bg-black transition-opacity ${
          !overlay
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-50'
        }`}
        onClick={() => setOverlay(null)}
      ></button>

      {overlay === 'translations' && <FlashcardTranslationsModal />}
      {overlay === 'searchTranslations' && <SearchFlashcardTranslationsModal />}
      {overlay === 'examples' && <EditFlashcardExamplesModal />}
      {overlay === 'searchExamples' && <SearchFlashcardExamplesModal />}
      {overlay === 'pronunciations' && <EditFlashcardPronunciationsModal />}
      {overlay === 'delete' && (
        <DeleteFlashcardModal
          flashcardId={flashcardId ?? ''}
          jwtToken={jwtToken ?? ''}
          deckId={deckId}
        />
      )}
      {overlay === 'front' && (
        <FrontCorretionsModal
          corrections={frontCorretions}
          front={flashcardData.mainPhrase}
        />
      )}

      <form
        action=""
        className="flex flex-col items-center"
        onSubmit={handleFormSubmit}
      >
        <h1 className="mb-16 text-center text-3xl font-semibold">
          {editing ? 'Editar flashcard' : 'Adicionar flashcard'}
        </h1>

        <div className="mb-16 flex flex-wrap justify-center gap-36">
          <fieldset className="flex max-w-420px flex-col gap-8">
            <div>
              <legend className="mb-3 text-xl font-semibold">
                Informações principais
              </legend>
              <p className="font-medium text-light-gray500">
                Apenas as traduções serão possíveis serem alteradas após criar o
                flashcard
              </p>
            </div>

            <InputDefault
              name="front"
              type="text"
              label="Frente *"
              placeholder="Ex: I eat an apple every day"
              error={errors.mainPhrase}
              onChange={handleFrontChange}
              onBlur={handleFrontFinished}
              value={flashcardData.mainPhrase}
              disable={editing}
            />

            <div>
              <label>
                <h3 className="mb-1 font-medium">Palavra-chave *</h3>
                <select
                  name=""
                  id=""
                  className={`inputDefault px-4 ${errors.keyword.length > 0 && 'inputDefaultError'} ${(flashcardData.mainPhrase.length === 0 || errors.mainPhrase.length > 0) && 'cursor-not-allowed'} ${editing && 'inputDefaultDisabled'}`}
                  disabled={
                    flashcardData.mainPhrase.length === 0 ||
                    errors.mainPhrase.length > 0 ||
                    editing
                  }
                  value={flashcardData.keyword}
                  onChange={(event) => handleKeywordChange(event)}
                >
                  <option value="">Selecionar</option>
                  {keywordOptions.map((option, index) => {
                    return (
                      <option value={option} key={index}>
                        {option}
                      </option>
                    )
                  })}
                </select>
                {errors.keyword?.length > 0 && (
                  <small className="text-red-600 block">
                    {errors.keyword[0]}
                  </small>
                )}
              </label>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-medium">Traduções</h3>
              {flashcardData.translations &&
              flashcardData.translations.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {flashcardData.translations.map((translation, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between gap-2 rounded border border-light-gray225 px-2 py-[2px]"
                    >
                      {translation.textTranslation}
                      <button
                        onClick={(event) =>
                          handleDelete(event, 'translations', index)
                        }
                        className="shrink-0"
                      >
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/close-svgrepo-com.svg?alt=media&token=f5a52b8f-6f12-4716-a4ab-91201310fc4d"
                          alt={`excluir tradução ${index + 1}`}
                          width={16}
                          height={16}
                          className="h-4 w-4"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-medium italic text-light-gray500">
                  Nenhuma tradução adicionada
                </p>
              )}
              <ButtonDefault
                text="Adicionar traduções"
                radius="rounded-md"
                style="outDark"
                type="button"
                paddingy="py-2"
                tailwind="w-[238px]"
                disabled={
                  flashcardData.keyword.length === 0 ||
                  errors.mainPhrase.length > 0
                }
                onClick={() => setOverlay('translations')}
              />
            </div>
          </fieldset>

          <fieldset className="flex max-w-420px flex-col gap-8">
            <div>
              <legend className="mb-3 text-xl font-semibold">Exemplos</legend>
              <p className="font-medium text-light-gray500">
                Todos os exemplos poderão ser alterados após criar o flashcard
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-medium">
                Exemplos de uso da palavra-chave *
              </h3>
              {flashcardData.examples && flashcardData.examples.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {flashcardData.examples.map((example, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between gap-2 rounded border border-light-gray225 px-2 py-[2px]"
                    >
                      {example.textExample}
                      <button
                        onClick={(event) =>
                          handleDelete(event, 'examples', index)
                        }
                        className="shrink-0"
                      >
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/close-svgrepo-com.svg?alt=media&token=f5a52b8f-6f12-4716-a4ab-91201310fc4d"
                          alt={`excluir exemplo de uso ${index + 1}`}
                          width={16}
                          height={16}
                          className="h-4 w-4"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-medium italic text-light-gray500">
                  Nenhum exemplo adicionado
                </p>
              )}
              <ButtonDefault
                text="Adicionar exemplos"
                radius="rounded-md"
                style="outDark"
                type="button"
                paddingy="py-2"
                tailwind="w-[238px]"
                disabled={
                  flashcardData.keyword.length === 0 ||
                  errors.mainPhrase.length > 0
                }
                onClick={() => setOverlay('examples')}
              />
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-medium">Pronúncias</h3>
              {flashcardData.pronunciations &&
              flashcardData.pronunciations.length > 0 ? (
                <ul className="flex flex-col gap-2">
                  {flashcardData.pronunciations.map((pronunciation, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between gap-2 rounded border border-light-gray225 px-2 py-[2px]"
                    >
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            handlePlayAudio(pronunciation.audioUrl)
                          }
                        >
                          <Image
                            src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/play-circle-svgrepo-com.svg?alt=media&token=58563bae-4f79-454c-a5f3-5446c1ff7b7d"
                            alt="iniciar áudio da pronúncia"
                            width={40}
                            height={40}
                            className="h-10 w-10"
                          />
                        </button>

                        <span className="capitalize">
                          {flashcardData.keyword}
                        </span>
                      </div>

                      <button
                        onClick={(event) =>
                          handleDelete(event, 'pronunciations', index)
                        }
                        className="shrink-0"
                      >
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/close-svgrepo-com.svg?alt=media&token=f5a52b8f-6f12-4716-a4ab-91201310fc4d"
                          alt={`excluir pronúncia ${index + 1}`}
                          width={16}
                          height={16}
                          className="h-4 w-4"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-medium italic text-light-gray500">
                  Nenhuma pronúncia adicionada
                </p>
              )}
              <ButtonDefault
                text="Adicionar pronúncias"
                radius="rounded-md"
                style="outDark"
                type="button"
                paddingy="py-2"
                tailwind="w-[238px]"
                disabled={
                  flashcardData.keyword.length === 0 ||
                  errors.mainPhrase.length > 0
                }
                onClick={() => setOverlay('pronunciations')}
              />
            </div>

            <div className="flex flex-col gap-3">
              <h3 className="font-medium">Imagens</h3>
              {flashcardData.images && flashcardData.images.length > 0 ? (
                <ul className="grid max-w-[332px] grid-cols-3 gap-4">
                  {flashcardData.images.map((image, index) => (
                    <li
                      key={index}
                      className="relative flex items-center justify-center"
                    >
                      <Image
                        src={
                          image.fileUrl instanceof File
                            ? URL.createObjectURL(image.fileUrl)
                            : image.fileUrl
                        }
                        alt="imagem de exemplo"
                        width={100}
                        height={100}
                        className="h-[100px] w-[100px] object-cover object-center"
                      />

                      <button
                        onClick={(event) =>
                          handleDelete(event, 'images', index)
                        }
                        className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center"
                      >
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/close-svgrepo-com.svg?alt=media&token=f5a52b8f-6f12-4716-a4ab-91201310fc4d"
                          alt={`excluir imagem ${index + 1}`}
                          width={24}
                          height={24}
                          className="h-6 w-6 opacity-55"
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="font-medium italic text-light-gray500">
                  Nenhuma imagem adicionada
                </p>
              )}

              <div
                className={`relative ${
                  flashcardData.keyword.length === 0 ||
                  errors.mainPhrase.length > 0
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
              >
                <ButtonDefault
                  text="Adicionar imagens"
                  radius="rounded-md"
                  style="outDark"
                  type="button"
                  paddingy="py-2"
                  tailwind="w-[238px]"
                  disabled={
                    flashcardData.keyword.length === 0 ||
                    errors.mainPhrase.length > 0
                  }
                />

                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handleFileChange}
                  multiple
                  className={`absolute left-0 top-0 h-full w-[238px] opacity-0 ${
                    flashcardData.keyword.length === 0 ||
                    errors.mainPhrase.length > 0
                      ? 'pointer-events-none'
                      : 'cursor-pointer'
                  }`}
                  disabled={
                    flashcardData.keyword.length === 0 ||
                    errors.mainPhrase.length > 0
                  }
                />
              </div>
            </div>
          </fieldset>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          <ButtonDefault
            text="Cancelar"
            type="link"
            link="/meus-decks"
            style="outDark"
            radius="rounded-md"
            tailwind="w-[175px] h-[42px]"
          />

          <ButtonDefault
            text="Deletar flashcard"
            type="button"
            style="outDark"
            radius="rounded-md"
            tailwind="w-[175px] h-[42px]"
            onClick={() => setOverlay('delete')}
          />

          <ButtonDefault
            text={`${editing ? 'Editar flashcard' : 'Criar flashcard'}`}
            type="button"
            radius="rounded-md"
            tailwind="w-[175px] h-[42px]"
            submit
          />
        </div>
      </form>
    </div>
  )
}
