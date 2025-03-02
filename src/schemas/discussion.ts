import z from 'zod'

export const discussionSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'O título deve ter ao menos 2 caracteres' })
    .max(200, { message: 'O título deve ter no máximo 200 caracteres' }),
  description: z
    .string()
    .min(10, { message: 'A descrição deve ter ao menos 10 caracteres' })
    .max(1000, { message: 'A descrição deve ter no máximo 1000 caracteres' }),
  images: z
    .array(z.any())
    .max(5, { message: 'Você pode adicionar no máximo 5 imagens' }),
})

export const discussionAnswer = z.object({
  answer: z
    .string()
    .min(10, { message: 'A resposta deve ter ao menos 10 caracteres' })
    .max(1000, { message: 'A resposta deve ter ao máximo 1000 caracteres' }),
})
