import { useRecoilState } from 'recoil'
import { flashcardModalAtom } from '@/states'
import { Flashcard } from '@/components/Flashcard'
import Image from 'next/image'
import { ButtonDefault } from '@/components/ButtonDefault'

export const FlashcardModal = () => {
  const [flashcardActive, setFlashcardActive] =
    useRecoilState(flashcardModalAtom)

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
          <Flashcard>
            <ButtonDefault
              text="Editar"
              type="link"
              link={`/editar-flashcard?id=${flashcardActive.flashcardId}`}
              paddingx="px-5"
              paddingy="py-2"
              radius="rounded-md"
            />
          </Flashcard>

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
