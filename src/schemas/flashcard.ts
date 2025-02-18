import { z } from 'zod'

export const frontSchema = z.object({
  mainPhrase: z
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

export const createFlashcardSchema = z.object({
  mainPhrase: z
    .string()
    .min(1, { message: 'A frente é obrigatória' })
    .max(150, { message: 'A frente deve ter menos que 150 caracateres' }),
  keyword: z.string().min(1, { message: 'A palavra-chave é obrigatória' }),
  examples: z
    .array(
      z.object({
        id: z.number(),
        textExample: z
          .string()
          .min(1, { message: 'O exemplo deve ter ao menos 1 caractere' })
          .max(100, { message: 'O exemplo deve ter menos que 100 caracteres' }),
      }),
    )
    .min(1, {
      message: 'É necessário pelo menos um exemplo de uso da palavra-chave',
    })
    .max(20, {
      message: 'Deve ter no máximo 20 exemplos de uso da palavra-chave',
    }),
})
