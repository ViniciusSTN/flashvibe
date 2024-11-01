import { flashcardData } from '@/mocks/TemporaryFlashcards'
import { GetAllFlashcardDataType } from '@/types/flashcard'

export const getAllFlashcardData: GetAllFlashcardDataType = async (
  flashcardId,
) => {
  console.log(flashcardId)

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })

  if (flashcardData && flashcardId === 10) {
    return {
      success: true,
      message: 'Flashcard econtrado',
      flashcard: {
        ...flashcardData,
        pronunciations:
          flashcardData.pronunciations?.map((audio) => ({
            search: '',
            votes: 0,
            audio,
          })) ?? [],
      },
    }
  } else {
    return {
      success: false,
      error: ['Falha ao obter os dados do flashcard'],
    }
  }
}
