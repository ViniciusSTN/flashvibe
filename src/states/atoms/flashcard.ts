import {
  flashcardOverlayType,
  FlashcardErrorsType,
  FlashcardType,
  FlashcardModalType,
  FlashcardsToStudyType,
  FeedbackType,
} from '@/types/flashcard'
import { atom } from 'recoil'

// const localStorageEffect: (
//   key: string,
// ) => AtomEffect<FlashcardsToStudyType | null> =
//   (key) =>
//   ({ setSelf, onSet }) => {
//     if (typeof window === 'undefined') {
//       return
//     }

//     try {
//       const savedValue = localStorage.getItem(key)
//       if (savedValue !== null) {
//         setSelf(JSON.parse(savedValue))
//       }
//     } catch (error) {
//       console.error(`Erro ao recuperar ${key} do localStorage:`, error)
//       setSelf(null)
//     }

//     onSet((newValue, _, isReset) => {
//       try {
//         if (isReset) {
//           localStorage.removeItem(key)
//         } else {
//           localStorage.setItem(key, JSON.stringify(newValue))
//         }
//       } catch (error) {
//         console.error(`Erro ao salvar ${key} no localStorage:`, error)
//       }
//     })
//   }

export const newFlashcardDataAtom = atom<FlashcardType>({
  key: 'newFlashcardData',
  default: {
    keyword: '',
    mainPhrase: '',
    examples: [],
    translations: [],
    pronunciations: [],
    images: [],
  },
})

export const newFlashcardErrorsAtom = atom<FlashcardErrorsType>({
  key: 'newFlashcardErrors',
  default: {
    mainPhrase: [],
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

export const flashcardsToStudyAtom = atom<FlashcardsToStudyType>({
  key: 'flashcardsToStudy',
  default: null,
  // effects: [localStorageEffect('flashcards_to_study')],
})

export const flashcardFeedbackAtom = atom<FeedbackType>({
  key: 'flashcardFeedback',
  default: {
    flashcardId: 0,
    active: false,
    stars: 0,
  },
})

export const flashcardWasTurnedAtom = atom<boolean>({
  key: 'flashcardWasTurned',
  default: false,
})
