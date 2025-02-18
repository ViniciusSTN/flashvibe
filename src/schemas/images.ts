import { z } from 'zod'

const MAX_FILE_SIZE = 1000000
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

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
