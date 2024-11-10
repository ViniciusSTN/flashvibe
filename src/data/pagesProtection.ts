import { VerifySessionType } from '@/types/apiResponse'
import axios from 'axios'

export const verifySession: VerifySessionType = async (session) => {
  const url =
    process.env.NEXT_PUBLIC_API_LOGIN_AND_REGISTER + '/validate-session/'

  try {
    const response = await axios.post(
      url,
      { session },
      {
        withCredentials: true,
      },
    )
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error verify token:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.message || [
          'An unexpected error occurred',
        ],
      }
    } else {
      console.error('Error to verify token:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}
