import { atom } from 'recoil'

export const searchAtom = atom<string>({
  key: 'search',
  default: '',
})
