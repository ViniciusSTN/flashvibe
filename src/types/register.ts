export type FormRegisterValues = {
  name: string
  nickname: string
  email: string
}

export type FormRegisterErrors = {
  name: string[]
  nickname: string[]
  email: string[]
}

export type InputName = keyof FormRegisterValues
