import { auth } from '@/lib/firebase'
import {
  SuccessWithSessionTokenResponse,
  UserLogOutType,
} from '@/types/apiResponse'
import {
  CreateNewUserWithPasswordType,
  CreateNewUserIntoDatabaseType,
  CreateUserSessionType,
  CreateNewUserViaSocialMedia,
} from '@/types/loginAndRegister'
import { GetAllUserDataType, UpdateUserDataType } from '@/types/myProfile'
import axios from 'axios'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Cookies from 'universal-cookie'

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

    const { cookie, Authorization } =
      response.data as SuccessWithSessionTokenResponse

    const cookies = new Cookies()

    cookies.set('Authorization', Authorization)
    cookies.set('session', cookie)

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

export const createNewUserViaSocialMedia: CreateNewUserViaSocialMedia = async (
  username,
  nickname,
  email,
) => {
  const url =
    process.env.NEXT_PUBLIC_API_LOGIN_AND_REGISTER + '/create-user-social/'

  try {
    const response = await axios.post(url, {
      username,
      nickname,
      email,
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error to create user using social media:',
        error.response?.data,
      )
      return {
        success: false,
        error: error.response?.data?.message || [
          'An unexpected error occurred',
        ],
      }
    } else {
      console.error('Error to register user using social media:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const getAllUserData: GetAllUserDataType = async (token) => {
  const url = process.env.NEXT_PUBLIC_API_LOGIN_AND_REGISTER + '/user/'

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    })

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error to get user data:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.message || [
          'An unexpected error occurred',
        ],
      }
    } else {
      console.error('Error to get user data:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const updateUserData: UpdateUserDataType = async (data, token) => {
  const url = process.env.NEXT_PUBLIC_API_LOGIN_AND_REGISTER + '/user/update/'

  try {
    const response = await axios.put(
      url,
      {
        ...data,
      },
      {
        headers: {
          Authorization: token,
        },
      },
    )

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error to update user data:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.message || [
          'An unexpected error occurred',
        ],
      }
    } else {
      console.error('Error to update user data:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}

export const userLogOut: UserLogOutType = async (session, jwtToken) => {
  const url = process.env.NEXT_PUBLIC_API_LOGIN_AND_REGISTER + '/logout/'

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: jwtToken,
          session,
        },
      },
    )

    if (typeof window !== 'undefined') {
      document.cookie =
        'Authorization=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;'
      document.cookie =
        'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT;'
    }

    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error when logging out user:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.message || [
          'An unexpected error occurred',
        ],
      }
    } else {
      console.error('Error when logging out user:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}
