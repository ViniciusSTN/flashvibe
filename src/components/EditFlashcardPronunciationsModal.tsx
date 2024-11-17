import { ButtonDefault } from '@/components/ButtonDefault'
import { getPronunciations } from '@/data/flashcards'
import { flashcardOverlayAtom, newFlashcardDataAtom } from '@/states'
import { FlashcardPronunciationType } from '@/types/flashcard'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState, useSetRecoilState } from 'recoil'
import Image from 'next/image'

export const EditFlashcardPronunciationsModal = () => {
  const [newFlashcardData, setNewFlashcardData] =
    useRecoilState(newFlashcardDataAtom)
  const setOverlay = useSetRecoilState(flashcardOverlayAtom)
  const [pronunciations, setPronunciations] = useState<
    FlashcardPronunciationType[]
  >([])
  const [checked, setChecked] = useState<FlashcardPronunciationType[]>([])

  const audioRef = useRef<HTMLAudioElement | null>(null)

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (checked.length === 0) {
      toast.warning('Nenhuma opção selecionada')
    } else {
      const existingAudios =
        newFlashcardData.pronunciations?.map((p) => p.voiceName) || []
      const newPronunciations = checked.filter(
        (pronunciation) => !existingAudios.includes(pronunciation.voiceName),
      )
      console.log(checked)
      setNewFlashcardData((prevState) => ({
        ...prevState,
        pronunciations: [
          ...(prevState.pronunciations || []),
          ...newPronunciations,
        ],
      }))

      setOverlay(null)
    }
  }

  function handlePlayAudio(audioUrl: string) {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }

    const audio = new Audio(audioUrl)
    audio.volume = 0.4
    audio.play()
    audioRef.current = audio
  }

  useEffect(() => {
    // buscar opções de tradução na API
    const fetchPronunciations = async () => {
      const response = await getPronunciations(newFlashcardData.keyword)

      if (response.success && response.audioInfo.length > 0) {
        setPronunciations(response.audioInfo.map((audio) => audio))
      } else {
        toast.warning('Não foram encontradas traduções')
      }
    }

    fetchPronunciations()
  }, [newFlashcardData.keyword])

  function handleSelectPronunciation(
    pronunciation: FlashcardPronunciationType,
  ) {
    if (!checked.some((item) => item.audioUrl === pronunciation.audioUrl)) {
      handlePlayAudio(pronunciation.audioUrl)
      setChecked((prevState) => [...prevState, pronunciation])
    } else {
      setChecked((prevState) =>
        prevState.filter((item) => item.audioUrl !== pronunciation.audioUrl),
      )
    }
  }

  return (
    <div className="fixed left-1/2 top-1/2 z-50 w-[80%] -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-8 shadow-very-clean vsm:w-auto">
      <h3 className="mb-6 text-center text-xl font-medium">
        Adicionar pronúncias
      </h3>

      <p className="mb-6 text-center text-light-gray500">
        Pronúncias encontrados para
        <span className="font-medium"> {newFlashcardData.keyword}</span>
      </p>

      <p className="mb-1 text-center text-light-gray500">
        Selecione as pronúncias que deseja adicionar
      </p>

      <form action="" onSubmit={handleFormSubmit}>
        <div className="mb-8 max-h-60 max-w-464px overflow-y-scroll rounded-lg border border-light-gray225">
          <ul>
            {pronunciations.map((pronunciation, index) => (
              <li key={index}>
                <div
                  onClick={() => handleSelectPronunciation(pronunciation)}
                  className={`flex w-full gap-2 border-b border-light-gray225 p-3 ${
                    checked.includes(pronunciation)
                      ? 'bg-clean-blue700'
                      : 'bg-clean-blue200'
                  }`}
                >
                  <input type="checkbox" className="hidden" />

                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/play-circle-svgrepo-com.svg?alt=media&token=58563bae-4f79-454c-a5f3-5446c1ff7b7d"
                    alt="iniciar áudio da pronúncia"
                    width={40}
                    height={40}
                    className="h-10 w-10"
                  />

                  <div className="flex items-center">
                    <p className="text-sm">
                      <span className="border-r-2 border-light-gray250 pr-1">
                        {pronunciation.voiceName} (
                        {pronunciation.sex.toUpperCase()})
                      </span>

                      <span className="pl-1">{pronunciation.country}</span>
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap justify-center gap-6 vsm:flex-nowrap">
          <ButtonDefault
            text="Cancelar"
            type="button"
            paddingy="py-2"
            radius="rounded-md"
            style="outDark"
            tailwind="w-[178px] h-[42px]"
            onClick={() => setOverlay(null)}
          />
          <ButtonDefault
            text="Confirmar"
            type="button"
            paddingy="py-2"
            radius="rounded-md"
            tailwind="w-[178px] h-[42px]"
            submit
          />
        </div>
      </form>
    </div>
  )
}
