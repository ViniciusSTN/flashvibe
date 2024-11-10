import { ErrorResponse, SuccessResponse } from './apiResponse'

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
  photo: File | null | string
}

export type AllUserDataErrors = UserDataErros & {
  photo: string[]
}

export type ReturnedUserData = {
  email: string
  name: string
  nickname: string
  phone: string
  photo: string
}

export type SuccessWithAllUserData = SuccessResponse & {
  data: ReturnedUserData
}

export type GetAllUserDataType = (
  token: string,
) => Promise<ErrorResponse | SuccessWithAllUserData>

export type UpdateUserDataType = (
  data: AllUserData,
  token: string,
) => Promise<ErrorResponse | SuccessResponse>
