import { atom } from 'recoil'

export const resendCounterAtom = atom({
  key: 'resendCounter',
  default: 60,
})
