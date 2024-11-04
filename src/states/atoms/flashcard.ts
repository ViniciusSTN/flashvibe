import {
  flashcardOverlayType,
  FlashcardErrorsType,
  FlashcardType,
  FlashcardModalType,
} from '@/types/flashcard'
import { atom } from 'recoil'

export const newFlashcardDataAtom = atom<FlashcardType>({
  key: 'newFlashcardData',
  default: {
    front: '',
    keyword: '',
    examples: [],
    images: [],
    pronunciations: [],
    translations: [],
  },
})

export const newFlashcardErrorsAtom = atom<FlashcardErrorsType>({
  key: 'newFlashcardErrors',
  default: {
    front: [],
    keyword: [],
    examples: [],
    images: [],
    pronunciations: [],
    translations: [],
  },
})

export const flashcardOverlayAtom = atom<flashcardOverlayType>({
  key: 'flashcardOverlay',
  default: null,
})

export const flashcardModalAtom = atom<FlashcardModalType>({
  key: 'flashcardModal',
  default: null,
})
