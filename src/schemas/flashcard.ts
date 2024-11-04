import { z } from 'zod'

const MAX_FILE_SIZE = 1000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

export const frontSchema = z.object({
  front: z
    .string()
    .min(1, { message: 'A frente é obrigatória' })
    .max(150, { message: 'A frente deve ter menos que 150 caracateres' }),
})

export const translationSchema = z.object({
  translation: z
    .string()
    .min(1, { message: 'Deve conter ao menos 1 caractere' })
    .max(50, { message: 'A tradução deve ter menos que 50 caracateres' }),
})

export const exampleSchema = z.object({
  example: z
    .string()
    .min(1, { message: 'Deve conter ao menos 1 caractere' })
    .max(100, { message: 'O exemplo deve ter menos que 100 caracateres' }),
})

export const imageValidations = z.array(
  z
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
    ),
)

export const createFlashcardSchema = z.object({
  front: z
    .string()
    .min(1, { message: 'A frente é obrigatória' })
    .max(150, { message: 'A frente deve ter menos que 150 caracateres' }),
  keyword: z.string().min(1, { message: 'A palavra-chave é obrigatória' }),
  examples: z
    .array(
      z
        .string()
        .min(1, { message: 'Deve conter ao menos 1 caractere' })
        .max(100, { message: 'O exemplo deve ter menos que 100 caracateres' }),
    )
    .min(1, {
      message: 'É necessário pelo menos um exemplo de uso da palavra-chave',
    }),
})
