import {
  sendConfirmationCodeToEmailType,
  verifyConfirmationCodeType,
} from '@/types/sendCodeToEmail'
import axios from 'axios'

export const sendConfirmationCodeToEmail: sendConfirmationCodeToEmailType =
  async (email, name) => {
    const url =
      process.env.NEXT_PUBLIC_API_SEND_CONFIRMATION_CODE + '/send-email/'

    try {
      const response = await axios.post(url, {
        email,
        name,
      })
      return response.data
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          'Axios error sending code to email:',
          error.response?.data,
        )
        return {
          success: false,
          error:
            error.response?.data?.message || 'An unexpected error occurred',
        }
      } else {
        console.error('Error sending code to email:', error)
        return { success: false, error: 'An unexpected error occurred' }
      }
    }
  }

export const verifyConfirmationCode: verifyConfirmationCodeType = async (
  email,
  code,
) => {
  const url =
    process.env.NEXT_PUBLIC_API_SEND_CONFIRMATION_CODE +
    '/verify-confirmation-code/'

  try {
    const response = await axios.post(url, {
      email,
      code,
    })
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error sending code to email:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.message || 'An unexpected error occurred',
      }
    } else {
      console.error('Error sending code to email:', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }
}
