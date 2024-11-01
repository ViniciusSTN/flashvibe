import { ButtonDefault } from '@/components/ButtonDefault'
import { flashcardOverlayAtom, newFlashcardDataAtom } from '@/states'
import { PronunciationType } from '@/types/flashcard'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilState, useSetRecoilState } from 'recoil'

export const EditFlashcardPronunciationsModal = () => {
  const [newFlashcardData, setNewFlashcardData] =
    useRecoilState(newFlashcardDataAtom)
  const setOverlay = useSetRecoilState(flashcardOverlayAtom)
  const [pronunciations, setPronunciations] = useState<PronunciationType[]>([])
  const [checked, setChecked] = useState<PronunciationType[]>([])

  const audioRef = useRef<HTMLAudioElement | null>(null)

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault()
    if (checked.length === 0) {
      toast.warning('Nenhuma opção selecionada')
    } else {
      const existingAudios =
        newFlashcardData.pronunciations?.map((p) => p.audio) || []
      const newPronunciations = checked.filter(
        (pronunciation) => !existingAudios.includes(pronunciation.audio),
      )
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
    // buscar opções de pronuncias na API

    const pronunciations: PronunciationType[] = [
      {
        search: 'Pronunciado por sarita_kitty (Feminino de Reino Unido)',
        votes: 30,
        audio:
          'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/pronunciations%2Fpronunciation_en_make.mp3?alt=media&token=17af0c16-e019-46e9-a844-54be23699d9d',
      },
      {
        search: 'Pronunciado por sarita_kitty (Feminino de Reino Unido)',
        votes: 20,
        audio:
          'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/pronunciations%2Fpronunciation_en_make%20(3).mp3?alt=media&token=68c9be31-b9f9-4f82-b827-da8138200221',
      },
      {
        search: 'Pronunciado por GeauxTigers (Masculino de Estados Unidos)',
        votes: 10,
        audio:
          'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/pronunciations%2Fpronunciation_en_make%20(2).mp3?alt=media&token=97794182-2f37-4dbc-9893-ef6a0c0747a8',
      },
    ]

    setPronunciations(pronunciations)
  }, [])

  function handleSelectPronunciation(pronunciation: PronunciationType) {
    if (!checked.some((item) => item.audio === pronunciation.audio)) {
      handlePlayAudio(pronunciation.audio)
      setChecked((prevState) => [...prevState, pronunciation])
    } else {
      setChecked((prevState) =>
        prevState.filter((item) => item.audio !== pronunciation.audio),
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

                  <div>
                    <p className="text-sm">{pronunciation.search}</p>
                    <small>{pronunciation.votes} votos</small>
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
