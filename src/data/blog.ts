import {
  GetAllBlogDataType,
  GetAllCommentsDataType,
  SendBlogFeedbackType,
  SendNewPostCommentType,
} from '@/types/blog'

export const getAllBlogData: GetAllBlogDataType = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Discussões retornadas com sucesso',
        data: [
          {
            id: 1,
            author: 'Vinícius',
            authorImage:
              'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/users%2F1731285705627-304930_6.jpg?alt=media&token=9ee7f664-d338-46e3-b9fd-eae66319f96c',
            description:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, Lorem ipsum dolor sit amet.., comes from a line in section 1.10.32.',
            image:
              'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/blog%2FBeautiful_1920%C3%971080-HD-Wallpapers-for-Desktop.jpg?alt=media&token=53428233-e025-4091-8fd8-26056c05c83e',
            likes: 120,
            deslikes: 5,
            comments: 25,
            liked: false,
            desliked: false,
            date: '28 de fevereiro às 18:31',
          },
          {
            id: 2,
            author: 'João Silva',
            authorImage:
              'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/users%2F1731285705627-304930_6.jpg?alt=media&token=9ee7f664-d338-46e3-b9fd-eae66319f96c',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image:
              'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/blog%2FBeautiful_1920%C3%971080-HD-Wallpapers-for-Desktop.jpg?alt=media&token=53428233-e025-4091-8fd8-26056c05c83e',
            likes: 98,
            deslikes: 2,
            comments: 40,
            liked: false,
            desliked: false,
            date: '28 de fevereiro às 18:31',
          },
          {
            id: 3,
            author: 'Vinícius',
            authorImage:
              'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/users%2F1731285705627-304930_6.jpg?alt=media&token=9ee7f664-d338-46e3-b9fd-eae66319f96c',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image:
              'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/blog%2FBeautiful_1920%C3%971080-HD-Wallpapers-for-Desktop.jpg?alt=media&token=53428233-e025-4091-8fd8-26056c05c83e',
            likes: 120,
            deslikes: 5,
            comments: 25,
            liked: false,
            desliked: false,
            date: '28 de fevereiro às 18:31',
          },
          {
            id: 4,
            author: 'João Silva',
            authorImage:
              'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/users%2F1731285705627-304930_6.jpg?alt=media&token=9ee7f664-d338-46e3-b9fd-eae66319f96c',
            description:
              'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            image:
              'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/blog%2FBeautiful_1920%C3%971080-HD-Wallpapers-for-Desktop.jpg?alt=media&token=53428233-e025-4091-8fd8-26056c05c83e',
            likes: 98,
            deslikes: 2,
            comments: 40,
            liked: false,
            desliked: false,
            date: '28 de fevereiro às 18:31',
          },
        ],
      })
    }, 500)
  })
}

// APENAS PARA SIMULAR O TOGGLE DE ACTIVE FEITO PELO BACK END
const likeStates = new Map<number, boolean>()
const deslikeStates = new Map<number, boolean>()

export const sendBlogLike: SendBlogFeedbackType = async (id) => {
  console.log('Enviou o like', id)

  const newState = !likeStates.get(id)
  likeStates.set(id, newState)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Like enviado',
        active: newState,
      })
    }, 500)
  })
}

export const sendBlogDeslike: SendBlogFeedbackType = async (id) => {
  console.log('Enviou o deslike', id)

  const newState = !deslikeStates.get(id)
  deslikeStates.set(id, newState)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Deslike enviado',
        active: newState,
      })
    }, 500)
  })
}

export const getAllCommentsData: GetAllCommentsDataType = async (id) => {
  console.log(id)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Comentário retornados com sucesso',
        data: [
          {
            userName: 'João Silva',
            userImage:
              'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/users%2F1731285705627-304930_6.jpg?alt=media&token=9ee7f664-d338-46e3-b9fd-eae66319f96c',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
          {
            userName: 'João Silva',
            userImage:
              'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/users%2F1731285705627-304930_6.jpg?alt=media&token=9ee7f664-d338-46e3-b9fd-eae66319f96c',
            comment: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
          },
          {
            userName: 'João Silva',
            userImage:
              'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/users%2F1731285705627-304930_6.jpg?alt=media&token=9ee7f664-d338-46e3-b9fd-eae66319f96c',
            comment:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC',
          },
          {
            userName: 'João Silva',
            userImage:
              'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/users%2F1731285705627-304930_6.jpg?alt=media&token=9ee7f664-d338-46e3-b9fd-eae66319f96c',
            comment:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin',
          },
          {
            userName: 'João Silva',
            userImage:
              'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/users%2F1731285705627-304930_6.jpg?alt=media&token=9ee7f664-d338-46e3-b9fd-eae66319f96c',
            comment:
              'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words',
          },
        ],
      })
    }, 500)
  })
}

export const sendNewPostComment: SendNewPostCommentType = async (
  id,
  comment,
) => {
  console.log(id, comment)

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message: 'Comentário enviado com sucesso',
        data: {
          userName: 'Vinicius Santana',
          userImage:
            'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/users%2F1731285705627-304930_6.jpg?alt=media&token=9ee7f664-d338-46e3-b9fd-eae66319f96c',
        },
      })
    }, 1000)
  })
}
