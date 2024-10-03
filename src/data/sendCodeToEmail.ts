import {
  ResendConfirmationCodeToEmailType,
  SendConfirmationCodeToEmailType,
  ValidateJwtTokenType,
  VerifyConfirmationCodeType,
} from '@/types/loginAndRegister'
import axios from 'axios'

export const sendConfirmationCodeToEmail: SendConfirmationCodeToEmailType =
  async (email, name) => {
    const url =
      process.env.NEXT_PUBLIC_API_LOGIN_AND_REGISTER + '/send-user-data/'

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

export const resendConfirmationCodeToEmail: ResendConfirmationCodeToEmailType =
  async (email) => {
    const url =
      process.env.NEXT_PUBLIC_API_LOGIN_AND_REGISTER + '/resend-email/'

    try {
      const response = await axios.post(url, {
        email,
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

export const validateJwtToken: ValidateJwtTokenType = async (jwtToken) => {
  const url =
    process.env.NEXT_PUBLIC_API_LOGIN_AND_REGISTER + '/validate-token/'

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
      console.error('Axios error to validate jwt token:', error.response?.data)
      return {
        success: false,
        error: error.response?.data?.message || 'An unexpected error occurred',
      }
    } else {
      console.error('Error validating jws token', error)
      return { success: false, error: 'An unexpected error occurred' }
    }
  }
}

export const verifyConfirmationCode: VerifyConfirmationCodeType = async (
  email,
  code,
  jwtToken,
) => {
  const url =
    process.env.NEXT_PUBLIC_API_LOGIN_AND_REGISTER +
    '/verify-confirmation-code/'

  try {
    const response = await axios.post(
      url,
      { email, code },
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      },
    )
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
