import { atom, AtomEffect } from 'recoil'

const localStorageEffect: (key: string) => AtomEffect<string> =
  (key) =>
  ({ setSelf, onSet }) => {
    if (typeof window !== 'undefined') {
      const savedValue = localStorage.getItem(key)
      if (savedValue != null) {
        setSelf(JSON.parse(savedValue))
      }

      onSet((newValue, _, isReset) => {
        if (isReset) {
          localStorage.removeItem(key)
        } else {
          localStorage.setItem(key, JSON.stringify(newValue))
        }
      })
    }
  }

export const userPhoneAtom = atom({
  key: 'phone',
  default: '+55 (11) 99254-6362',
  // default: ''
  effects: [localStorageEffect('current_user_phone')],
})
