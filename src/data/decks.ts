import { decks, standardDecks } from '@/mocks/TemporaryDecks'
import { CustomDeckData, getUsersCustomDeckBaseDataType } from '@/types/deck'

export async function getAllUserDecks(page: number) {
  // fazer requisição para o backend

  console.log(page)

  // simulando uma requisição
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })

  if (decks) {
    return {
      success: true,
      decks,
      lastPage: 6,
    }
  } else {
    return {
      success: false,
      message: 'Falha',
    }
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

    if (customDeck && deckId === 1) {
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
