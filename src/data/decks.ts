import {
  AssignDeckToUserType,
  CreateCustomDeckType,
  CreateStandardDeckType,
  CustomDeckData,
  DeckCardProps,
  GetAllStandardDecksType,
  GetAllUserDecksType,
  GetQuantityFlashcardsType,
  GetQuantityReviewsType,
  getUsersCustomDeckBaseDataType,
  ReturnedDeck,
  ReturnedStandardDeck,
} from '@/types/deck'
import axios from 'axios'

export const getAllUserDecks: GetAllUserDecksType = async (
  page,
  type,
  orderBy,
  min,
  max,
  situation,
  jwtToken,
) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS +
    `/get-all-decks/${page}/?`

  const urlWithType = baseUrl + (type !== 'all' ? `type=${type}` : '')

  const urlWithOrderBy = urlWithType + `orderBy=${orderBy}&`

  const urlWithFlashcards =
    urlWithOrderBy +
    (min !== 0 || max !== 0 ? `minFlashcards=${min}&maxFlashcards=${max}&` : '')

  const situationsParams = situation.map((s) => `${s}=true`).join('&')

  const finalUrl =
    urlWithFlashcards +
    (situationsParams.length > 0 ? `${situationsParams}` : '')

  // console.log(finalUrl)

  try {
    const response = await axios.get(finalUrl, {
      headers: {
        Authorization: jwtToken,
      },
    })
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        console.error('Decks not found:', error.response.data)
        return {
          success: false,
          error: ['Decks not found'],
        }
      }
      console.error('Axios error get user decks:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error get user decks:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export function mapReturnedDeckToDeckCardProps(
  deck: ReturnedDeck,
): DeckCardProps {
  return {
    deckId: deck.id,
    type: deck.type === 'Standard' ? 'Standard Deck' : 'Custom Deck',
    favorite: deck.favorite,
    colorPredefinition: deck.colorPredefinition,
    title: deck.title,
    image: deck.image ?? '',
    situation:
      deck.situation === 'learning'
        ? 'Learning'
        : deck.situation === 'finished'
          ? 'Finished'
          : 'New',
    lastModification: deck.lastModification,
    flashcards: deck.flashcards,
    new: deck.new,
    learning: deck.learning,
    reviewing: deck.reviewing,
    description: deck.description ?? '',
    public: deck.public,
    difficult: deck.difficult ?? null,
    stars: deck.stars,
    reviews: deck.reviews,
  }
}

export const getUsersCustomDeckBaseData: getUsersCustomDeckBaseDataType =
  async (deckId) => {
    // Simulação de atraso
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })

    const situation = 'Learning'
    const isPublic = true
    const favorite = true

    const customDeck: CustomDeckData = {
      name: 'English Words',
      description: 'Most used words in everyday life',
      photo:
        'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/7720441.jpg?alt=media&token=18f8641a-2eb4-4c3d-83ed-6bb005b4e358',
      colorPredefinition: 7,
      new: 5,
      learning: 17,
      reviewing: 3,
    }

    if (customDeck && deckId === 10) {
      return {
        success: true,
        deck: customDeck,
        situation,
        isPublic,
        favorite,
        error: customDeck ? null : ['Falha'],
      }
    } else {
      return {
        success: false,
        error: ['Falha'],
      }
    }
  }

export const createCustomDeck: CreateCustomDeckType = async (
  deck,
  jwtToken,
) => {
  const url = process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS + `/create/`

  try {
    const response = await axios.post(
      url,
      {
        deckName: deck.name,
        description: deck.description,
        img: deck.photo,
        color: deck.colorPredefinition,
        new: deck.new,
        learning: deck.learning,
        review: deck.reviewing,
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
      console.error(
        'Axios error posting custom user deck:',
        error.response?.data,
      )
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error posting custom user deck:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

// está com a rota errada
export const createStandardDeck: CreateStandardDeckType = async (
  deck,
  jwtToken,
) => {
  const url = process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS + `/create/`

  try {
    const response = await axios.post(
      url,
      {
        deckName: deck.title,
        description: deck.description,
        img: deck.image,
        color: deck.colorPredefinition,
        new: deck.new,
        learning: deck.learning,
        review: deck.reviewing,
        typedeck: 'Standard',
        difficult: deck.difficult,
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
      console.error(
        'Axios error posting standard user deck:',
        error.response?.data,
      )
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error posting standard user deck:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const getAllStandardDecks: GetAllStandardDecksType = async (
  page,
  orderBy,
  min,
  max,
  difficulty,
  jwtToken,
) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS +
    `/get-standard-decks/${page}/?`

  const urlWithOrderBy = baseUrl + `orderBy=${orderBy}&`

  const urlWithReviews =
    urlWithOrderBy +
    (min !== 0 || max !== 0 ? `minReviews=${min}&maxReviews=${max}&` : '')

  const difficultyParams = difficulty.map((d) => `difficulty=${d}`).join('&')

  const finalUrl =
    urlWithReviews + (difficultyParams.length > 0 ? `${difficultyParams}` : '')

  // console.log(finalUrl)

  try {
    const response = await axios.get(finalUrl, {
      headers: {
        Authorization: jwtToken,
      },
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error getting standard decks:', error.response?.data)
      if (error.response?.status === 404) {
        return { success: false, error: ['Decks not found'] }
      }
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error getting standard decks:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export function mapReturnedStandardDeckToDeckCardProps(
  deck: ReturnedStandardDeck,
): DeckCardProps {
  return {
    deckId: deck.id,
    type: deck.type === 'Standard' ? 'Standard Deck' : 'Custom Deck',
    favorite: false,
    colorPredefinition: deck.colorPredefinition,
    title: deck.title,
    image: deck.image ?? '',
    situation: 'New',
    lastModification: deck.lastModification,
    flashcards: deck.flashcards,
    new: 0,
    learning: 0,
    reviewing: 0,
    description: deck.description ?? '',
    public: true,
    difficult: deck.difficult,
    stars: deck.stars,
    reviews: deck.reviews,
  }
}

export const assignDeckToUser: AssignDeckToUserType = async (
  deckId,
  jwtToken,
) => {
  const url =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS +
    `/add-deck-to-user/${deckId}/`

  // console.log(url)

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
      console.error('Axios error assigning deck to user:', error.response?.data)
      if (error.response?.status === 409) {
        return { success: false, error: ['Already belongs to the user'] }
      }
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error assigning deck to user:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const getQuantityReviews: GetQuantityReviewsType = async (jwtToken) => {
  const url = process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS + `/get-reviews/`

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: jwtToken,
      },
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error getting quantity reviews:',
        error.response?.data,
      )
      if (error.response?.status === 404) {
        return { success: false, error: ['Has all decks'] }
      }
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error getting quantity reviews:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const getQuantityFlashcards: GetQuantityFlashcardsType = async (
  jwtToken,
) => {
  const url =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS + `/get-flashcard-values/`

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: jwtToken,
      },
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error getting quantity flashcards:',
        error.response?.data,
      )
      if (error.response?.status === 404) {
        return { success: false, error: ['Has all decks'] }
      }
      return {
        success: false,
        error: error.response?.data?.error || ['An unexpected error occurred'],
      }
    } else {
      console.error('Error getting quantity flashcards:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}
