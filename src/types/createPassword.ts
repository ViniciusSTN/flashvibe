export type FormCreatePasswordValues = {
  password: string
  passwordConfirmation: string
}

export type FormCreatePasswordErrors = {
  password: string[]
  passwordConfirmation: string[]
}

export type InputName = keyof FormCreatePasswordValues
