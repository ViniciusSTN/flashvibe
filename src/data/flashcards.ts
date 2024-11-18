import {
  CorrectSentenceType,
  CreateFlashcardType,
  DeleteFlashcardType,
  FlashcardDataType,
  FlashcardModalType,
  GetAllFlashcardDataType,
  GetCardsToStudyType,
  GetDeckFlashcardsType,
  GetExamplesSentencesType,
  GetPronunciationsType,
  GetTranslationsType,
  SendFlashcardFeedbackType,
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
  orderBy,
  situations,
  jwtToken,
) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS +
    `/get-all-flashcard/${page}/${deckId}/?`

  const params = new URLSearchParams()

  const validOrderByValues = [
    'newer',
    'older',
    'lastModifications',
    'lastStudied',
    'mostReviewed',
    'lessReviewed',
  ]

  if (validOrderByValues.includes(orderBy)) {
    params.append('orderBy', orderBy)
  }

  const validSituations = ['new', 'learning', 'reviewing']

  situations.forEach((situation) => {
    if (validSituations.includes(situation)) {
      params.append(
        situation.charAt(0).toUpperCase() + situation.slice(1),
        'true',
      )
    }
  })

  const url = `${baseUrl}${params.toString()}`

  console.log(url)

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: jwtToken,
      },
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error getting flashcard data:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error getting flashcard data:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const getCardsToStudy: GetCardsToStudyType = async (
  deckId,
  jwtToken,
) => {
  console.log(deckId)

  const url =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS +
    `/get-flashcards-for-study/${deckId}/`

  try {
    const response = await axios.get(url, {
      headers: { Authorization: jwtToken },
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error getting flashcards to study:',
        error.response?.data,
      )
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error getting flashcards to study:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const convertFlashcardDataTypeToFlashcardModalType = (
  data: FlashcardDataType,
): FlashcardModalType => {
  return {
    keyword: data.keyword,
    mainPhrase: data.mainPhrase,
    examples: data.examples.map((example) => ({
      id: 0,
      textExample: example,
    })),
    translations: data.translations.map((translation) => ({
      id: 0,
      textTranslation: translation,
    })),
    pronunciations: data.pronunciations.map((pronunciation) => ({
      id: 0,
      keyword: pronunciation.keyword,
      audioUrl: pronunciation.audioUrl,
      voiceName: '',
      sex: '',
      country: '',
    })),
    images: data.images.map((image) => ({
      id: 0,
      fileUrl: image,
    })),
    turned: false,
    flashcardId: data.id,
  }
}

export const sendFlashcardFeedback: SendFlashcardFeedbackType = async (
  flashcardId,
  deckId,
  feedback,
  jwtToken,
) => {
  const url =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS +
    `study_flashcard/${flashcardId}/${deckId}/${feedback}/`

  console.log(flashcardId, deckId, feedback, jwtToken, url)

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: jwtToken,
        },
      },
    )

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error sending feedback:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error sending feedback:', error)
      return { success: false, error: ['An unexpected error occurred'] }
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
