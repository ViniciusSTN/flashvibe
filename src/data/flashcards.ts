import { deckFlashcardsData, flashcardsData } from '@/mocks/TemporaryFlashcards'
import {
  CorrectSentenceType,
  CreateFlashcardType,
  DeleteFlashcardType,
  GetAllFlashcardDataType,
  GetCardsToStudyType,
  GetDeckFlashcardsType,
  GetExamplesSentencesType,
  GetPronunciationsType,
  GetTranslationsType,
  UpdateFlashcard,
} from '@/types/flashcard'
import axios from 'axios'

export const getAllFlashcardData: GetAllFlashcardDataType = async (
  flashcardId,
  deckId,
  jwtToken,
) => {
  const url =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS +
    `/get-one-flashcard/${flashcardId}/${deckId}/`

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: jwtToken,
      },
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error getting flashcard:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error getting flashcard:', error)
      return { success: false, error: ['An unexpected error occurred'] }
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

export const correctSentence: CorrectSentenceType = async (sentence) => {
  const url =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS + `/get-correct-phrase/`

  try {
    const response = await axios.post(url, {
      phrase: sentence,
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error sending front phrase:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error sending front phrase:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const getTranslations: GetTranslationsType = async (word) => {
  const url =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS + `/get-translated-word/`

  try {
    const response = await axios.post(url, {
      word,
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error sending word to translate:',
        error.response?.data,
      )
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error sending word to translate:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const getExamplesSentences: GetExamplesSentencesType = async (word) => {
  const url =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS + `/get-example-sentences/`

  try {
    const response = await axios.post(url, {
      word,
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error sending word to get examples:',
        error.response?.data,
      )
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error sending word to get examples:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const getPronunciations: GetPronunciationsType = async (word) => {
  const url =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS + `/get-pronunciations/`

  try {
    const response = await axios.post(url, {
      word,
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error sending word to get pronunciations:',
        error.response?.data,
      )
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error sending word to get pronunciations:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const createFlashcard: CreateFlashcardType = async (
  jwtToken,
  deckId,
  keyword,
  mainPhrase,
  examples,
  translations,
  pronunciations,
  images,
) => {
  const url =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS +
    `/create-flashcard/${deckId}/`

  try {
    const response = await axios.post(
      url,
      {
        keyword,
        mainPhrase,
        examples,
        translations,
        pronunciations,
        images,
      },
      {
        headers: {
          Authorization: jwtToken,
        },
      },
    )

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error creating flashcard:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error creating flashcard:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const updateFlashcard: UpdateFlashcard = async (
  flashcardId,
  deckId,
  jwtToken,
  flashcard,
) => {
  const url =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS +
    `/update-flashcard/${flashcardId}/${deckId}/`

  console.log('Flashcard para update: ', flashcard)

  try {
    const response = await axios.put(
      url,
      {
        ...flashcard,
      },
      {
        headers: {
          Authorization: jwtToken,
        },
      },
    )

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error updating flashcard:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error updating flashcard:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const deleteFlashcard: DeleteFlashcardType = async (
  flashcardId,
  deckId,
  jwtToken,
) => {
  const url =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS +
    `/delete-flashcard/${flashcardId}/${deckId}/`

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: jwtToken,
      },
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error deleting flashcard:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error deleting flashcard:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}
