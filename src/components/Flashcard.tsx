import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { flashcardModalAtom, flashcardWasTurnedAtom } from '@/states'
import { FlashcardSlider } from '@/components/FlashcardSlider'
import { toast } from 'react-toastify'
import { FlashcardComponentType } from '@/types/flashcard'
import Image from 'next/image'

export const Flashcard: FlashcardComponentType = ({ children }) => {
  const [flashcardActive, setFlashcardActive] =
    useRecoilState(flashcardModalAtom)
  const [flashcardWasTurned, setFlashcardWasTurned] = useRecoilState(
    flashcardWasTurnedAtom,
  )

  const [words, setWords] = useState<JSX.Element[]>([])
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number>(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (flashcardActive) {
      const regex = new RegExp(`\\b(${flashcardActive.keyword})\\b`, 'gi')

      const words = flashcardActive.mainPhrase
        .split(regex)
        .map((part, index) =>
          part.toLowerCase() === flashcardActive.keyword.toLowerCase() ? (
            <span key={index} className="text-keyword">
              {part}
            </span>
          ) : (
            <span key={index}>{part}</span>
          ),
        )

      setWords(words)
    }
  }, [flashcardActive])

  const handlePlayAudio = () => {
    if (
      flashcardActive?.pronunciations &&
      flashcardActive.pronunciations.length > 0
    ) {
      const currentPronunciation =
        flashcardActive.pronunciations[currentAudioIndex]
      if (currentPronunciation) {
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current.currentTime = 0
        }

        const audio = new Audio(currentPronunciation.audioUrl)
        audio.volume = 0.4
        audio.play()
        audioRef.current = audio

        setCurrentAudioIndex((prevIndex) => {
          if (!flashcardActive?.pronunciations) return prevIndex
          return prevIndex < flashcardActive.pronunciations.length - 1
            ? prevIndex + 1
            : 0
        })
      }
    } else {
      toast.warning('Nenhum áudio disponível')
    }
  }

  const handleFlip = () => {
    setFlashcardActive((prevState) => {
      if (!prevState) return prevState
      return {
        ...prevState,
        turned: !prevState.turned,
      }
    })

    if (!flashcardWasTurned) setFlashcardWasTurned(true)
  }

  return (
    flashcardActive && (
      <div className="[perspective:4000px]">
        <div
          className={`relative h-[506px] w-72 transition-transform duration-500 [transform-style:preserve-3d] vsm:w-[500px] lg:w-[732px] ${
            flashcardActive.turned ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* Frente do Flashcard */}
          <div
            className={`h-full w-full border border-light-gray225 p-2 [backface-visibility:hidden] vsm:p-5 ${flashcardActive.turned ? 'hidden' : ''}`}
          >
            <div className="flex flex-col gap-6">
              <h4 className="text-center text-xl font-medium text-light-gray500">
                Frente
              </h4>

              <div
                className={`${flashcardActive.images?.length === 0 ? 'mt-20 flex flex-col gap-5' : 'flex flex-col gap-10'}`}
              >
                <button className="mx-auto" onClick={handlePlayAudio}>
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/play-circle-svgrepo-com.svg?alt=media&token=58563bae-4f79-454c-a5f3-5446c1ff7b7d"
                    alt="iniciar áudio da pronúncia"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />
                </button>

                {words.length > 0 && (
                  <p className="text-center lg:text-lg">{words}</p>
                )}
              </div>
            </div>

            {flashcardActive.images && flashcardActive.images.length > 3 && (
              <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center justify-center gap-5 lg:bottom-8">
                <div className="relative">
                  <FlashcardSlider
                    sliders={flashcardActive.images.map(
                      (image) => image.fileUrl,
                    )}
                  />
                </div>
              </div>
            )}

            {flashcardActive.images && flashcardActive.images.length <= 3 && (
              <div className="mt-20 flex w-full max-w-full flex-wrap justify-center gap-5">
                {flashcardActive.images.map((image, index) => (
                  <div
                    key={index}
                    className="max-h-[200px] max-w-[200px] flex-1 object-center"
                  >
                    <img
                      src={
                        typeof image.fileUrl === 'string'
                          ? image.fileUrl
                          : URL.createObjectURL(image.fileUrl)
                      }
                      alt="imagem de exemplo"
                      className="h-full w-full object-contain"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Verso do Flashcard */}
          <div
            className={`h-full w-full border border-light-gray225 p-5 [backface-visibility:hidden] [transform:rotateY(180deg)] ${!flashcardActive.turned ? 'hidden' : ''}`}
          >
            <div className="mb-6 flex flex-col gap-6">
              <h4 className="text-center text-xl font-medium text-light-gray500">
                Verso
              </h4>

              <button className="mx-auto" onClick={handlePlayAudio}>
                <Image
                  src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/play-circle-svgrepo-com.svg?alt=media&token=58563bae-4f79-454c-a5f3-5446c1ff7b7d"
                  alt="iniciar áudio da pronúncia"
                  width={40}
                  height={40}
                  className="h-10 w-10"
                />
              </button>

              {words.length > 0 && (
                <p className="text-center lg:text-lg">{words}</p>
              )}
            </div>

            {flashcardActive.translations &&
              flashcardActive.translations?.length > 0 && (
                <div className="mb-4 flex max-h-24 flex-wrap justify-center gap-2 overflow-y-scroll border-y border-light-gray200 py-3 vsm:max-h-28">
                  {flashcardActive.translations.map((translation, index) => (
                    <span
                      key={index}
                      className="rounded-md border border-clean-blue700 bg-clean-blue200 px-2 py-1 font-medium text-principal-blue vsm:text-lg"
                    >
                      {translation.textTranslation}
                    </span>
                  ))}
                </div>
              )}

            {flashcardActive.examples &&
              flashcardActive.examples.length > 0 && (
                <div
                  className={`flex flex-col gap-4 overflow-y-scroll border-y border-light-gray200 leading-5 ${flashcardActive.translations && flashcardActive.translations.length > 0 ? 'max-h-24 vsm:max-h-32' : 'max-h-48 vsm:max-h-64'}`}
                >
                  {flashcardActive.examples.map((example, index) => (
                    <p key={index} className="text-center">
                      {example.textExample}
                    </p>
                  ))}
                </div>
              )}
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleFlip}
            className="absolute left-1/2 mt-3 flex -translate-x-1/2 items-center justify-center rounded-full border border-principal-blue p-2"
          >
            <Image
              src={
                flashcardActive && flashcardActive.turned
                  ? 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/back.svg?alt=media&token=a34c73dc-8f69-435f-89ca-4ef639db38ef'
                  : 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/front.svg?alt=media&token=4ebb1dae-4263-4cff-a5c3-150203582431'
              }
              alt="virar flashcard"
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </button>

          <div className="mt-3">{children}</div>
        </div>
      </div>
    )
  )
}
