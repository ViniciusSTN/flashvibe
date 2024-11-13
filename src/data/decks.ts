import { standardDecks } from '@/mocks/TemporaryDecks'
import {
  CustomDeckData,
  DeckCardProps,
  GetAllUserDecksType,
  getUsersCustomDeckBaseDataType,
  ReturnedDeck,
} from '@/types/deck'
import axios from 'axios'

export const getAllUserDecks: GetAllUserDecksType = async (
  page,
  orderBy,
  min,
  max,
  situation,
  jwtToken,
) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_API_DECKS_AND_FLASHCARDS +
    `/get-all-decks/${page}/?`

  const urlWithoutSituations =
    baseUrl +
    `orderBy=${orderBy}&` +
    `minFlashcards=${min}&` +
    `maxFlashcards=${max}&`

  const situationsParams = situation.map((s) => `${s}=true`).join('&')

  const finalUrl =
    urlWithoutSituations +
    (situationsParams.length > 0 ? `${situationsParams}` : '')

  // console.log('url: ', finalUrl)

  try {
    const response = await axios.get(finalUrl, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
    console.log(response)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
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

  // if (standardDecks) {
  //   return {
  //     success: true,
  //     message: 'deck retornado com sucesso',
  //     decks: [
  //       {
  //         id: 1,
  //         type: 'learning',
  //         colorPredefinition: 2,
  //         title: 'Deck de Matemática',
  //         image: null,
  //         lastModification: Date.now(),
  //         createdData: Date.now() - 100000,
  //         description: 'Deck focado em matemática básica.',
  //         public: true,
  //         difficult: 'medium',
  //         stars: 4,
  //         reviews: 150,
  //         favorite: false,
  //         flashcards: 20,
  //         situation: 'learning',
  //         new: 5,
  //         learning: 10,
  //         reviewing: 5,
  //       },
  //     ],
  //     flashcardMin: 0,
  //     flashcardMax: 1000,
  //     hasNext: true,
  //     hasPrevious: false,
  //     pageNumber: page,
  //     totalPages: 6,
  //   }
  // } else {
  //   return {
  //     success: false,
  //     error: ['Falha'],
  //   }
  // }
}

export function mapReturnedDeckToDeckCardProps(
  deck: ReturnedDeck,
): DeckCardProps {
  return {
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

export async function getAllStandardDecks(page: number) {
  // fazer requisição para o backend

  console.log(page)

  // simulando uma requisição
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })

  if (standardDecks) {
    return {
      success: true,
      decks: standardDecks,
      lastPage: 6,
    }
  } else {
    return {
      success: false,
      message: 'Falha',
    }
  }
}

export const getUsersCustomDeckBaseData: getUsersCustomDeckBaseDataType =
  async (deckId) => {
    console.log(deckId)

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
