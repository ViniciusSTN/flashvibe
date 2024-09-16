export type FormLoginValues = {
  user: string
  password: string
}

export type FormLoginErrors = {
  user: string[]
  password: string[]
}

export type InputName = keyof FormLoginValues
