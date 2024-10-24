import { auth } from '@/lib/firebase'
import {
  CreateNewUserWithPasswordType,
  CreateNewUserIntoDatabaseType,
  CreateUserSessionType,
} from '@/types/loginAndRegister'
import axios from 'axios'
import { createUserWithEmailAndPassword } from 'firebase/auth'

export const createNewUserWithPassword: CreateNewUserWithPasswordType = async (
  password,
  jwtToken,
) => {
  try {
    const response = await createNewUserIntoDatabase(jwtToken)

    if (response.success) {
      const { email } = response

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      const firebaseUser = userCredential.user

      return {
        success: true,
        message: 'Cadastro realizado com sucesso',
        user: firebaseUser,
      }
    } else {
      return {
        success: false,
        error: ['Não foi possível concluir o cadastro'],
      }
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error to create new user:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.message || [
          ['An unexpected error occurred'],
        ],
      }
    } else {
      console.error('Error to create new user:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const createNewUserIntoDatabase: CreateNewUserIntoDatabaseType = async (
  jwtToken,
) => {
  const url = process.env.NEXT_PUBLIC_API_LOGIN_AND_REGISTER + '/create/'

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    )
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error to create new user into database:',
        error.response?.data,
      )
      return {
        success: false,
        error: error.response?.data?.message || [
          'An unexpected error occurred',
        ],
      }
    } else {
      console.error('Error to create new user into database:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const createUserSession: CreateUserSessionType = async (
  token,
  email,
) => {
  const url = process.env.NEXT_PUBLIC_API_LOGIN_AND_REGISTER + '/login/'

  try {
    const response = await axios.post(url, {
      id_token: token,
      email,
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error to login user:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.message || [
          'An unexpected error occurred',
        ],
      }
    } else {
      console.error('Error to login user:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}
