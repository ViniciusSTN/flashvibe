import { z } from 'zod'

export const postCommentSchema = z.object({
  newComment: z
    .string()
    .max(500, { message: 'O comentário deve ter no máximo 500 caracteres' }),
})
