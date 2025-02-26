import { ImageModalType } from '@/types/imageModal'
import { atom } from 'recoil'

export const imageModalAtom = atom<ImageModalType>({
  key: 'imageModal',
  default: {
    link: '',
    active: false,
  },
})
