import { DeckCardProps } from '@/types/deck'
import { atom } from 'recoil'

export const deckActiveAtom = atom<DeckCardProps | null>({
  key: 'deckActive',
  default: null,
})
