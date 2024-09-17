import { ErrorResponse, SuccessResponse } from './apiResponse'

export type sendConfirmationCodeToEmailType = (
  email: string,
  name: string,
) => Promise<ErrorResponse | SuccessResponse>

export type verifyConfirmationCodeType = (
  email: string,
  code: string,
) => Promise<ErrorResponse | SuccessResponse>
