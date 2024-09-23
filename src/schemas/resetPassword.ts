import { object, string } from 'zod'

export const emailSchema = object({
  email: string().email({ message: 'Email inválido' }),
})

export const phoneSchema = object({
  phone: string()
    .length(11, { message: 'Celular inválido' })
    .regex(/^\d+$/, { message: 'Celular inválido' }),
})
