import { OrderByStateType } from '@/types/orderBy'

export const discussionOrderBy: OrderByStateType[] = [
  {
    text: 'Recentes',
    value: 'newer',
  },
  {
    text: 'Curtidas',
    value: 'likes',
  },
  {
    text: 'Respostas',
    value: 'answers',
  },
]

export const discussionAnswersOrderBy: OrderByStateType[] = [
  {
    text: 'Recentes',
    value: 'newer',
  },
  {
    text: 'Curtidas',
    value: 'likes',
  },
]
