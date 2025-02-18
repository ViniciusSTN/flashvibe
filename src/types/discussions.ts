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
