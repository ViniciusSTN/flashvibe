import { OrderByStateType } from '@/types/orderBy'
import { atom } from 'recoil'

export const orderByAtom = atom<OrderByStateType>({
  key: 'orderBy',
  default: {
    text: 'Recentes',
    value: 'newer',
  },
})
