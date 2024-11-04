import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import { flashcardModalAtom } from '@/states'
import { FlashcardSlider } from '@/components/FlashcardSlider'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { ButtonDefault } from '@/components/ButtonDefault'

export const FlashcardModal = () => {
  const [flashcardActive, setFlashcardActive] =
    useRecoilState(flashcardModalAtom)

  const [words, setWords] = useState<JSX.Element[]>([])
  const [currentAudioIndex, setCurrentAudioIndex] = useState<number>(0)

  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (flashcardActive) {
      const words = flashcardActive.front
        .split(new RegExp(`(${flashcardActive.keyword})`, 'gi'))
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

  const handleFlip = () => {
    setFlashcardActive((prevState) => {
      if (!prevState) return prevState
      return {
        ...prevState,
        turned: !prevState.turned,
      }
    })
  }

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

        const audio = new Audio(currentPronunciation.audio)
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

  return (
    <>
      <button
        className={`fixed inset-0 z-50 bg-black transition-opacity ${
          !flashcardActive
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-50'
        }`}
        onClick={() => setFlashcardActive(null)}
      ></button>

      {flashcardActive && (
        <div
          className={`fixed left-1/2 top-1/2 z-50 flex max-h-screen-header -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-y-scroll bg-white px-4 pb-[28px] pt-5 transition-opacity vsm:px-5 sm:px-10 sm:pt-10 md:px-14 md:pt-14 lg:pb-10 ${
            !flashcardActive ? 'opacity-0' : 'opacity-100'
          }`}
        >
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

                {flashcardActive.images &&
                  flashcardActive.images.length > 0 && (
                    <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center justify-center gap-5 lg:bottom-8">
                      {flashcardActive.images.length > 3 ? (
                        <div className="relative">
                          <FlashcardSlider sliders={flashcardActive.images} />
                        </div>
                      ) : (
                        flashcardActive.images.map((image, index) =>
                          typeof image === 'string' ? (
                            <div key={index}>
                              <img
                                src={image}
                                alt="imagem de exemplo"
                                className="max-w-[200px] object-cover object-center"
                              />
                            </div>
                          ) : null,
                        )
                      )}
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
                      {flashcardActive.translations.map(
                        (translation, index) => (
                          <span
                            key={index}
                            className="rounded-md border border-clean-blue700 bg-clean-blue200 px-2 py-1 font-medium text-principal-blue vsm:text-lg"
                          >
                            {translation}
                          </span>
                        ),
                      )}
                    </div>
                  )}

                {flashcardActive.examples &&
                  flashcardActive.examples.length > 0 && (
                    <div
                      className={`flex flex-col gap-4 overflow-y-scroll border-y border-light-gray200 leading-5 ${flashcardActive.translations && flashcardActive.translations.length > 0 ? 'max-h-24 vsm:max-h-32' : 'max-h-48 vsm:max-h-64'}`}
                    >
                      {flashcardActive.examples.map((example, index) => (
                        <p key={index} className="text-center">
                          {example}
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

              <div className="mt-3">
                <ButtonDefault
                  text="Editar"
                  type="link"
                  link={`/editar-flashcard?id=${flashcardActive.flashcardId}`}
                  paddingx="px-5"
                  paddingy="py-2"
                  radius="rounded-md"
                />
              </div>
            </div>
          </div>

          <button
            className="absolute right-1 top-1 bg-white"
            onClick={() => setFlashcardActive(null)}
          >
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/close.svg?alt=media&token=9e1418a2-c0eb-480d-a9bc-a48215795904"
              alt="fechar"
              width={32}
              height={32}
              className="h-8 w-8"
            />
          </button>
        </div>
      )}
    </>
  )
}
