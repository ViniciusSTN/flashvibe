import { atom } from 'recoil'

export const answerModalActiveAtom = atom<boolean>({
  key: 'answerModalActive',
  default: false,
})
