import { discussions } from '@/mocks/discussions'
import {
  GetAllDiscussionsType,
  GetDiscussionDataType,
} from '@/types/discussions'

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

export const getDiscussionData: GetDiscussionDataType = async (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(id)

      resolve({
        success: true,
        message: 'Disucssão retornada com sucesso',
        data: {
          title:
            'when an unknown printer took a galley of type and scrambled it to make a type specimen book',
          description:
            'simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
          likes: 50,
          userName: 'Joaozin123',
          userImage:
            'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/users%2F1731285705627-304930_6.jpg?alt=media&token=9ee7f664-d338-46e3-b9fd-eae66319f96c',
          images: [
            'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/discussion%2F36324708-ai-gerado-cenario-do-uma-tigre-caminhando-dentro-a-floresta-foto.jpg?alt=media&token=117f6d81-28cf-43bb-82f4-1170c31dbc6f',
            'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/discussion%2Fimage-svgrepo-com.svg?alt=media&token=e72d4faf-3329-4b8f-a7dd-9407fd80b6f1',
            'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/discussion%2FCaptura%20de%20tela%202025-02-18%20163949.png?alt=media&token=1b164d67-a28e-4121-9ae9-753c7125e0b0',
            'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/discussion%2Fimage-creator-T03_cat.webp?alt=media&token=ec9a46dd-69f3-4306-91d7-7d97e930c31e',
            'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/discussion%2Ftest-resize.webp?alt=media&token=1c218f72-455b-40f4-bb6a-7ad6fe0a52b8',
          ],
          answers: [
            {
              id: 1,
              userName: 'Usuário123',
              answer:
                'simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
              userImage:
                'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/users%2F1731285705627-304930_6.jpg?alt=media&token=9ee7f664-d338-46e3-b9fd-eae66319f96c',
              likes: 10,
            },
          ],
        },
      })
    }, 500)
  })
}
