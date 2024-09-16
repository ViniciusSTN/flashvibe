import { object, string } from 'zod'

export const loginWithEmailSchema = object({
  user: string().email({ message: 'Email inválido' }),
  password: string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    .regex(/[a-z]/, {
      message: 'A senha deve conter pelo menos uma letra minúscula',
    })
    .regex(/[A-Z]/, {
      message: 'A senha deve conter pelo menos uma letra maiúscula',
    })
    .regex(/\d/, { message: 'A senha deve conter pelo menos um número' })
    .regex(/[#?!@$%^&*()-_+={}[\]|\\:;"'<>,./~`]/, {
      message: 'A senha deve conter ao menos um caractere especial',
    }),
})

export const loginWithPhoneNumber = object({
  user: string()
    .length(11, { message: 'Número inválido. Ex: 11993898901' })
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, {
      message: 'Formato de número inválido',
    }),
  password: string()
    .min(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
    .regex(/[a-z]/, {
      message: 'A senha deve conter pelo menos uma letra minúscula',
    })
    .regex(/[A-Z]/, {
      message: 'A senha deve conter pelo menos uma letra maiúscula',
    })
    .regex(/\d/, { message: 'A senha deve conter pelo menos um número' })
    .regex(/[#?!@$%^&*()-_+={}[\]|\\:;"'<>,./~`]/, {
      message: 'A senha deve conter ao menos um caractere especial',
    }),
})
