import { User } from 'firebase/auth'

export type userCredentials = User & {
  accessToken: string
}
