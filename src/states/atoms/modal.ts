import { PublicationModalType } from '@/types/deck'
import { ImageModalType } from '@/types/imageModal'
import { atom } from 'recoil'

export const imageModalAtom = atom<ImageModalType>({
  key: 'imageModal',
  default: {
    link: '',
    active: false,
  },
})

export const publicationModalAtom = atom<PublicationModalType>({
  key: 'publicationModal',
  default: {
    deckId: 0,
    modalActive: false,
  },
})
