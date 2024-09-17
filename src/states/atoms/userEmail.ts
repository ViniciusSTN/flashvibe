import { atom, AtomEffect } from 'recoil'

const localStorageEffect: (key: string) => AtomEffect<string> =
  (key) =>
  ({ setSelf, onSet }) => {
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

export const userEmailAtom = atom({
  key: 'email',
  default: 'email@gmail.com',
  // default: ''
  effects: [localStorageEffect('current_user_email')],
})
