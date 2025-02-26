import { GetAllFrequentlyAskedQuestionsType } from '@/types/faqs'

export const getAllFrequentlyAskedQuestions: GetAllFrequentlyAskedQuestionsType =
  () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Discussões retornadas com sucesso',
          data: [
            {
              question:
                'is simply dummy text of the printing and typesetting industry?',
              response:
                'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
            },
            {
              question:
                'is simply dummy text of the printing and typesetting industry?',
              response:
                'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
            },
            {
              question:
                'is simply dummy text of the printing and typesetting industry?',
              response:
                'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
            },
            {
              question:
                'is simply dummy text of the printing and typesetting industry?',
              response:
                'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book',
            },
          ],
        })
      }, 500)
    })
  }
