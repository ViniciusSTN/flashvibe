import { z } from 'zod'

export const frontSchema = z.object({
  front: z
    .string()
    .min(1, { message: 'Campo obrigatório' })
    .max(50, { message: 'A frente deve ter menos que 50 caracateres' }),
})
