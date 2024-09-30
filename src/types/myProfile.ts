export type UserData = {
  email: string
  name: string
  nickname: string
  phone: string
  password: string
}
export type UserDataErros = {
  email: string[]
  name: string[]
  nickname: string[]
  phone: string[]
  password: string[]
}

export type InputName = keyof UserData

export type AllUserData = UserData & {
  photo: File | null
}

export type AllUserDataErrors = UserDataErros & {
  photo: string[]
}
