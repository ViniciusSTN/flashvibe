// const url = process.env.NEXT_PUBLIC_API_SEND_CONFIRMATION_CODE + '/user/confirm-reset-password/' //

import { SendEmailToResetPasswordType } from '@/types/loginAndRegister'
import axios from 'axios'

export const sendEmailToResetPassword: SendEmailToResetPasswordType = async (
  email,
) => {
  const url =
    process.env.NEXT_PUBLIC_API_LOGIN_AND_REGISTER + '/user/reset-password/'

  try {
    const response = await axios.post(url, {
      email,
    })
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        'Axios error sending email to user to reset password:',
        error.response?.data,
      )
      return {
        success: false,
        error: error.response?.data?.message || [
          'An unexpected error occurred',
        ],
      }
    } else {
      console.error('Error sending email to user to reset password:', error)
      return { success: false, error: ['An unexpected error occurred'] }
    }
  }
}
