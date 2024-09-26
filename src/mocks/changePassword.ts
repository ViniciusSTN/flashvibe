import { InputFormType } from '@/types/inputForm'

export const inputs: InputFormType[] = [
  {
    type: 'password',
    placeholder: 'Nova senha',
    image:
      'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/lock.svg?alt=media&token=774229e2-415e-407e-969c-f3ff69c9f20f',
    name: 'password',
  },
  {
    type: 'password',
    placeholder: 'Confirmar nova senha',
    image:
      'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/lock.svg?alt=media&token=774229e2-415e-407e-969c-f3ff69c9f20f',
    name: 'passwordConfirmation',
  },
]
