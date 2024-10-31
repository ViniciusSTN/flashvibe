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
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: `A imagem deve ser menor que 1MB`,
  })
  .refine(
    (file) => {
      const isValidType = ACCEPTED_IMAGE_TYPES.includes(file.type)
      const isValidExtension =
        file.name.endsWith('.jpg') ||
        file.name.endsWith('.jpeg') ||
        file.name.endsWith('.png') ||
        file.name.endsWith('.webp')
      return isValidType && isValidExtension
    },
    {
      message: 'Somente .jpg, .jpeg, .png e .webp são formatos suportados',
    },
  )

const userDataSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nome deve ter ao menos 2 caracteres' })
    .max(50, { message: 'Nome deve ter no máximo 50 caracteres' }),
  nickname: z
    .string()
    .min(2, { message: 'Apelido deve ter ao menos 2 caracteres' })
    .max(50, { message: 'Apelido deve ter no máximo 50 caracteres' }),
  phone: z
    .string()
    .optional()
    .refine((value) => !value || value.length === 13, {
      message: 'Celular inválido',
    })
    .refine((value) => !value || /^\d+$/.test(value), {
      message: 'Celular inválido',
    }),
  photo: fileSchema.optional(),
})

export default userDataSchema
