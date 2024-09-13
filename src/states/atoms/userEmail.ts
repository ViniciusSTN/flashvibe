import { atom } from 'recoil'

export const userEmailAtom = atom({
  key: 'email',
  // default: '',
  default: 'email@gmail.com',
})
