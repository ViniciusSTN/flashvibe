import { z } from 'zod'

const MAX_FILE_SIZE = 5000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const fileSchema = z
  .any()
  .nullable() // Permite que o campo seja nulo
  .refine(
    (file) => !file || file.size <= MAX_FILE_SIZE, // Permite null ou valida o tamanho do arquivo
    {
      message: `A imagem deve ser menor que 5MB`,
    },
  )
  .refine(
    (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file?.type), // Permite null ou valida o tipo do arquivo
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
    .optional() // Torna o telefone opcional
    .refine((value) => !value || value.length === 13, {
      message: 'Celular inválido',
    })
    .refine((value) => !value || /^\d+$/.test(value), {
      message: 'Celular inválido',
    }),
  photo: fileSchema.optional(), // Campo de foto também é opcional
})

export default userDataSchema
