import { object, string } from 'zod'

export const emailSchema = object({
  email: string().email({ message: 'Email inválido' }),
})

export const phoneSchema = object({
  phoneNumber: string()
    .length(13, { message: 'Celular inválido' })
    .regex(/^\d+$/, { message: 'Celular inválido' }),
})
