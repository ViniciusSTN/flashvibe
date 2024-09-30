import { InputFormType } from '@/types/inputForm'

export const inputs: InputFormType[] = [
  {
    type: 'text',
    name: 'email',
    label: 'Endereço de e-mail',
    disable: true,
  },
  {
    type: 'text',
    name: 'name',
    label: 'Nome',
    disable: false,
  },
  {
    type: 'text',
    name: 'nickname',
    label: 'Apelido',
    disable: false,
  },
]

export const phoneInput: InputFormType = {
  type: 'text',
  placeholder: 'Celular',
  name: 'phone',
}
