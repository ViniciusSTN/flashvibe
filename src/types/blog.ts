import { Dispatch, SetStateAction } from 'react'
import { ErrorResponse, SuccessResponse } from './apiResponse'
import { FeedbackData } from './sendFeedbacks'

export type BlogDataType = {
  id: number
  author: string
  authorImage: string
  description: string
  image: string
  likes: number
  deslikes: number
  comments: number
  liked: boolean
  desliked: boolean
  date: string
}

export type SuccessResponseWithBlogData = SuccessResponse & {
  data: BlogDataType[]
}

export type GetAllBlogDataType = () => Promise<
  ErrorResponse | SuccessResponseWithBlogData
>

export type SuccessResponseWithActive = SuccessResponse & {
  active: boolean
}

export type SendBlogFeedbackType = (
  id: number,
) => Promise<ErrorResponse | SuccessResponseWithActive>

export type PostModalProps = {
  post: BlogDataType
  feedbacks: FeedbackData[]
  setFeedbacks: Dispatch<SetStateAction<FeedbackData[]>>
  setPostActive: Dispatch<SetStateAction<BlogDataType | null>>
}

export type PostModalType = (props: PostModalProps) => JSX.Element

export type UserComment = {
  userImage: string
  userName: string
  comment: string
}

export type SuccessReponseWithAllComments = SuccessResponse & {
  data: UserComment[]
}

export type GetAllCommentsDataType = (
  id: number,
) => Promise<ErrorResponse | SuccessReponseWithAllComments>

export type SuccessResponseWithUserData = SuccessResponse & {
  data: {
    userImage: string
    userName: string
  }
}

export type SendNewPostCommentType = (
  id: number,
  comment: string,
) => Promise<ErrorResponse | SuccessResponseWithUserData>
