export type FormChangePasswordValues = {
  password: string
  passwordConfirmation: string
}

export type FormChangePasswordErrors = {
  password: string[]
  passwordConfirmation: string[]
}

export type InputName = keyof FormChangePasswordValues
