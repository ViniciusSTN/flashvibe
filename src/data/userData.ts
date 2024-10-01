import { CreateNewUserType } from '@/types/loginAndRegister'
import axios from 'axios'

export const createNewUser: CreateNewUserType = async (
  email,
  username,
  nickname,
) => {
  const url = process.env.NEXT_PUBLIC_API_LOGIN_AND_REGISTER + '/create/'

  try {
    const response = await axios.post(url, {
      email,
      username,
      nickname,
    })
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error to create new user:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.message || 'An unexpected error occurred',
      }
    } else {
      console.error('Error to create new user:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }
}
