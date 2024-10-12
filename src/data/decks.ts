import { decks } from '@/mocks/TemporaryDecks'

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
