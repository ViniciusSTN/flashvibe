import {
  ErrorResponse,
  SuccessResponse,
  SuccessResponseWithJwtToken,
  SuccessWithSessionTokenResponse,
  SuccessWithUserCredentials,
  SuccessWithUserData,
} from './apiResponse'

export type SendConfirmationCodeToEmailType = (
  email: string,
  name: string,
  nickname: string,
) => Promise<ErrorResponse | SuccessResponseWithJwtToken>

export type ResendConfirmationCodeToEmailType = (
  email: string,
) => Promise<ErrorResponse | SuccessResponse>

export type VerifyConfirmationCodeType = (
  email: string,
  code: string,
  jwtToken: string,
) => Promise<ErrorResponse | SuccessResponseWithJwtToken>

export type SendEmailToResetPasswordType = (
  email: string,
) => Promise<ErrorResponse | SuccessResponse>

export type ValidateJwtTokenType = (
  jwtToken: string,
) => Promise<ErrorResponse | SuccessResponse>

export type CreateNewUserType = (
  email: string,
  userName: string,
  nickname: string,
) => Promise<ErrorResponse | SuccessResponse>

export type CreateNewUserWithPasswordType = (
  password: string,
  jwtToken: string,
) => Promise<ErrorResponse | SuccessWithUserCredentials>

export type CreateNewUserIntoDatabaseType = (
  jwtToken: string,
) => Promise<ErrorResponse | SuccessWithUserData>

export type CreateUserSessionType = (
  token: string,
  email: string,
) => Promise<ErrorResponse | SuccessWithSessionTokenResponse>
