import { AuthProvider } from 'firebase/auth'

export type CreateNewUserType = (provider: AuthProvider) => Promise<void>
