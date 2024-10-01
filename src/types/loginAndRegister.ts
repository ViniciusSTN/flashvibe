import { ErrorResponse, SuccessResponse } from './apiResponse'

export type sendConfirmationCodeToEmailType = (
  email: string,
  name: string,
) => Promise<ErrorResponse | SuccessResponse>

export type verifyConfirmationCodeType = (
  email: string,
  code: string,
) => Promise<ErrorResponse | SuccessResponse>

export type sendEmailToResetPasswordType = (
  email: string,
) => Promise<ErrorResponse | SuccessResponse>

export type CreateNewUserType = (
  email: string,
  userName: string,
  nickname: string,
) => Promise<ErrorResponse | SuccessResponse>
