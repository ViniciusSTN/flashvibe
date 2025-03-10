import { Dispatch, SetStateAction } from 'react'

export type SendFeedBackType<T = Record<string, unknown>> = (
  id: number,
) => Promise<{ success: boolean; active?: boolean } & T>

export type FeedbackOptions = {
  liked: boolean
  desliked: boolean
}

export type FeedbackNumbers = {
  like: number
  deslike: number
}

export type FeedbackData = {
  id: number
  active: FeedbackOptions
  numbers: FeedbackNumbers
}

export type FeedbackButtonsProps<T = Record<string, never>> = {
  postId: number
  feedbacks: FeedbackData[]
  setFeedbacks: Dispatch<SetStateAction<FeedbackData[]>>
  callbacks: {
    like: SendFeedBackType<T>
    deslike: SendFeedBackType<T>
  }
}

export type FeedbackButtonType<T = Record<string, never>> = (
  props: FeedbackButtonsProps<T>,
) => JSX.Element
