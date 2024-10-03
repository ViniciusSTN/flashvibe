import { User } from 'firebase/auth'

export type SuccessResponse = {
  success: true
  message: string
}

export type ErrorResponse = {
  success: false
  error: string[]
}

export type SuccessResponseWithJwtToken = SuccessResponse & {
  jwt_token: string
}

export type SuccessWithUserData = SuccessResponse & {
  data: {
    email: string
  }
}

export type SuccessWithUserCredentials = {
  success: true
  user: User
}
