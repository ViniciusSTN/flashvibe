import { object, string } from 'zod'

export const registerSchema = object({
  name: string()
    .min(2, { message: 'Nome deve ter ao menos 2 caracteres' })
    .max(50, { message: 'Nome deve ter no máximo 50 caracteres' }),
  nickname: string()
    .min(2, { message: 'Apelido deve ter ao menos 2 caracteres' })
    .max(50, { message: 'Apelido deve ter no máximo 50 caracteres' }),
  email: string().email({ message: 'Email inválido' }),
})

export default registerSchema
