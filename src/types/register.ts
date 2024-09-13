export type FormRegisterValues = {
  name: string
  nickname: string
  email: string
  password: string
  passwordConfirmation: string
}

export type FormRegisterErrors = {
  name: string[]
  nickname: string[]
  email: string[]
  password: string[]
  passwordConfirmation: string[]
}

export type InputName = keyof FormRegisterValues
