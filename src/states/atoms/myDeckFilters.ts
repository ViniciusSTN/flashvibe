import { MyDeckFiltersType } from '@/types/myDeckFilters'
import { atom, AtomEffect } from 'recoil'

const localStorageEffect: AtomEffect<MyDeckFiltersType> = ({
  setSelf,
  onSet,
}) => {
  const key = 'my_deck_filters'

  if (typeof window === 'undefined') {
    return
  }

  try {
    const savedValue = localStorage.getItem(key)
    if (savedValue !== null) {
      setSelf(JSON.parse(savedValue))
    }
  } catch (error) {
    console.error(`Erro ao recuperar ${key} do localStorage:`, error)
  }

  onSet((newValue, _, isReset) => {
    try {
      if (isReset) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, JSON.stringify(newValue))
      }
    } catch (error) {
      console.error(`Erro ao salvar ${key} no localStorage:`, error)
    }
  })
}

export const myDeckFiltersAtom = atom<MyDeckFiltersType>({
  key: 'MyDeckFilters',
  default: {
    isActive: false,
    type: 'all',
    searchBy: 'lastModifications',
    flashcards: {
      min: 0,
      max: 1000,
    },
    situation: {
      favorites: true,
      learning: true,
      finished: true,
    },
  },
  effects: [localStorageEffect],
})
