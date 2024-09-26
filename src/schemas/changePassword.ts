import { object, string } from 'zod'

const changePasswordSchema = object({
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
  passwordConfirmation: string().min(6, {
    message: 'A confirmação de senha deve ter no mínimo 6 caracteres',
  }),
}).superRefine(({ passwordConfirmation, password }, ctx) => {
  if (passwordConfirmation !== password) {
    ctx.addIssue({
      code: 'custom',
      message: 'As senhas não coincidem',
      path: ['passwordConfirmation'],
    })
  }
})

export default changePasswordSchema
