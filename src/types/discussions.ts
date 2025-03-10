import { ErrorResponse, SuccessResponse } from './apiResponse'

export type DiscussionCardType = {
  id: number
  title: string
  description: string
  likes: number
  answers: number
  views: number
}

export type SuccessDiscussionsType = SuccessResponse & {
  totalDiscussions: number
  totalPages: number
  discussions: DiscussionCardType[]
}

export type DiscussionsOrderBy = 'newer' | 'likes' | 'answers'

export type GetAllDiscussionsType = (
  page: number,
  orderBy: DiscussionsOrderBy,
  search: string,
) => Promise<SuccessDiscussionsType | ErrorResponse>

export type DiscussionHeaderProps = {
  totalPosts: number
}

export type DiscussionHeaderType = (props: DiscussionHeaderProps) => JSX.Element

export type NewDiscussionData = {
  title: string
  description: string
  images: File[]
}

export type NewDiscussionErrors = {
  title: string[]
  description: string[]
  images: string[]
}

export type AnswerType = {
  id: number
  userName: string
  answer: string
  userImage: string
  likes: number
}

export type DiscussionType = {
  title: string
  description: string
  likes: number
  userName: string
  userImage: string
  images: string[]
  answers: AnswerType[]
}

export type SuccessResponseWithFullDiscussionData = SuccessResponse & {
  data: DiscussionType
}

export type GetDiscussionDataType = (
  id: number,
  orderBy: string,
) => Promise<ErrorResponse | SuccessResponseWithFullDiscussionData>

export type TopicAreaProps = {
  title: string
  description: string
  images: string[]
  userName: string
  userImage: string
  likes: number
}

export type TopicAreaType = (props: TopicAreaProps) => JSX.Element

export type AnswersAreaProps = {
  answers: AnswerType[]
  title: string
}

export type AnswersAreaType = (props: AnswersAreaProps) => JSX.Element

export type AnswerProps = {
  title: string
}

export type AnswerModalType = (props: AnswerProps) => JSX.Element
