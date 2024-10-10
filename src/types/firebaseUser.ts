import { User } from 'firebase/auth'

export type UserCredentials = User & {
  accessToken: string
}
