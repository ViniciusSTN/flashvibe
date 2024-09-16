import { InputFormType } from '@/types/inputForm'

export const inputs: InputFormType[] = [
  {
    type: 'text',
    placeholder: 'Email ou celular',
    image:
      'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/person.svg?alt=media&token=977c6f56-eac6-4ab5-b6d7-faa65be1fd73',
    name: 'user',
  },
  {
    type: 'password',
    placeholder: 'Senha',
    image:
      'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/lock.svg?alt=media&token=774229e2-415e-407e-969c-f3ff69c9f20f',
    name: 'password',
  },
]
