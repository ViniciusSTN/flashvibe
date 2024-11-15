import { MyDeckFiltersType, StandardDeckFiltersType } from '@/types/filters'
import { FlashcardFiltersType } from '@/types/flashcard'
import { atom } from 'recoil'

// const localStorageEffect =
//   <T>(key: string): AtomEffect<T> =>
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

export const myDeckFiltersAtom = atom<MyDeckFiltersType>({
  key: 'MyDeckFilters',
  default: {
    isActive: false,
    type: 'all',
    searchBy: 'lastModifications',
    flashcards: {
      min: 0,
      max: 0,
    },
    situation: {
      favorites: false,
      learning: false,
      finished: false,
    },
  },
  // effects: [localStorageEffect('my_deck_filters')],
})

export const standardDeckFiltersAtom = atom<StandardDeckFiltersType>({
  key: 'StandardDeckFilters',
  default: {
    isActive: false,
    searchBy: 'newer',
    feedback: {
      min: 0,
      max: 200,
    },
    difficulty: {
      beginner: true,
      intermediate: true,
      advanced: true,
    },
  },
  // effects: [localStorageEffect('standard_deck_filters')],
})

export const flashcardFiltersAtom = atom<FlashcardFiltersType>({
  key: 'flashcardListFilters',
  default: {
    isActive: false,
    searchBy: 'lastModifications',
    situation: {
      new: true,
      learning: true,
      reviewing: true,
    },
  },
  // effects: [localStorageEffect('flashcard_list_filters')],
})
