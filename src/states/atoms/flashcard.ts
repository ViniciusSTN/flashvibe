import {
  flashcardOverlayType,
  NewFlashcardErrorsType,
  NewFlashcardType,
} from '@/types/flashcard'
import { atom } from 'recoil'

export const newFlashcardDataAtom = atom<NewFlashcardType>({
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

export const newFlashcardErrorsAtom = atom<NewFlashcardErrorsType>({
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
