import { discussions } from '@/mocks/discussions'
import { GetAllDiscussionsType } from '@/types/discussions'

export const getAllDiscussions: GetAllDiscussionsType = async (
  page,
  orderBy,
  search,
) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(page, orderBy, search)

      resolve({
        success: true,
        message: 'Discussões retornadas com sucesso',
        totalDiscussions: 200,
        totalPages: 3,
        discussions,
      })
    }, 500)
  })
}
