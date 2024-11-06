import {
  deckFlashcardsData,
  flashcardData,
  flashcardsData,
} from '@/mocks/TemporaryFlashcards'
import {
  GetAllFlashcardDataType,
  GetCardsToStudyType,
  GetDeckFlashcardsType,
} from '@/types/flashcard'

export const getAllFlashcardData: GetAllFlashcardDataType = async (
  flashcardId,
) => {
  console.log(flashcardId)

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })

  if (flashcardData) {
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

export const getDeckFlashcards: GetDeckFlashcardsType = async (
  deckId,
  page,
) => {
  console.log(deckId, page)

  if (deckFlashcardsData && deckId === 10) {
    return {
      success: true,
      message: 'Flashcards encontrados',
      flashcards: [...deckFlashcardsData],
      lastPage: 6,
      deckName: 'My English Words',
    }
  } else {
    return {
      success: false,
      error: ['Falha ao obter dados de flashcards'],
    }
  }
}

export const getCardsToStudy: GetCardsToStudyType = async (deckId) => {
  console.log(deckId)

  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })

  if (flashcardsData) {
    return {
      success: true,
      message: 'Deck encontrado',
      flashcards: [...flashcardsData],
      deckName: 'My English Words',
    }
  } else {
    return {
      success: false,
      error: ['Falha ao obter dados de flashcards'],
    }
  }
}
