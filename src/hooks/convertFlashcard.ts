import { useCallback } from 'react'
import { FlashcardDataType, FlashcardModalType } from '@/types/flashcard'

const useConvertFlashcard = () => {
  const convertToFlashcardModal = useCallback(
    (flashcard: FlashcardDataType): FlashcardModalType => {
      return {
        ...flashcard,
        turned: false,
        pronunciations:
          flashcard.pronunciations?.map((p) => ({
            search: p,
            votes: 0,
            audio: '',
          })) || [],
      }
    },
    [],
  )

  return convertToFlashcardModal
}

export default useConvertFlashcard
