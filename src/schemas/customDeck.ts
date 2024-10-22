import { z } from 'zod'

const MAX_FILE_SIZE = 1000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const fileSchema = z
  .any()
  .nullable()
  .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
    message: `A imagem deve ser menor que 1MB`,
  })
  .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type), {
    message: 'Somente .jpg, .jpeg, .png e .webp são formatos suportados',
  })

const customDeckSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nome deve ter ao menos 2 caracteres' })
    .max(20, { message: 'Nome deve ter no máximo 20 caracteres' }),
  description: z
    .string()
    .max(100, { message: 'Descrição deve ter no máximo 100 caracteres' })
    .optional(),
  photo: fileSchema.optional(),
  colorPredefinition: z.number().min(4),
  new: z.number().min(1, {
    message: 'A quantidade de novos flashcards deve ser ao menos 1',
  }),
  learning: z.number().min(1, {
    message: 'A quantidade de flashcards aprendendo deve ser ao menos 1',
  }),
  reviewing: z.number().min(1, {
    message: 'A quantidade de flashcards revisando deve ser ao menos 1',
  }),
})

export default customDeckSchema
