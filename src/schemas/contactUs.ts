import z from 'zod'

export const contactUsSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Nome deve ter ao menos 2 caracteres' })
    .max(50, { message: 'Nome deve ter no máximo 50 caracteres' }),
  email: z.string().email({ message: 'Email inválido' }),
  subject: z
    .string()
    .min(20, { message: 'Assunto deve ter ao menos 20 caracteres' })
    .max(250, { message: 'Assunto deve ter no máximo 250 caracteres' }),
  description: z
    .string()
    .min(100, { message: 'Descrição deve ter ao menos 100 caracteres' })
    .max(1500, { message: 'Descrição deve ter no máximo 1500 caracteres' }),
  images: z
    .array(z.any())
    .max(5, { message: 'Você pode adicionar no máximo 5 imagens' }),
})
