import { DeleteDeckType } from '@/types/deck'
import { atom } from 'recoil'

export const deleteDeckAtom = atom<DeleteDeckType>({
  key: 'deleteDeck',
  default: {
    modalActive: false,
    deckId: null,
  },
})
