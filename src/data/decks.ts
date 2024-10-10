import { decks } from '@/mocks/TemporaryDecks'

export async function getAllUserDecks() {
  // fazer requisição para o backend

  // simulando uma requisição
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log('retornou')
      resolve()
    }, 1000)
  })

  if (decks) {
    return {
      success: true,
      decks,
    }
  } else {
    return {
      success: false,
      message: 'Falha',
    }
  }
}
