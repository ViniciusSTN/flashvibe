import { ErrorResponse, SuccessResponse } from './apiResponse'

export type FaqsType = {
  question: string
  response: string
}

export type FaqsProps = {
  faqs: FaqsType[]
}

export type FaqsComponentType = (props: FaqsProps) => JSX.Element

export type SuccessResponseWithQuestions = SuccessResponse & {
  data: FaqsType[]
}

export type GetAllFrequentlyAskedQuestionsType = () => Promise<
  ErrorResponse | SuccessResponseWithQuestions
>
