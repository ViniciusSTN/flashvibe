import { useMask } from '@react-input/mask'

export const usePhoneMask = () => {
  return useMask({
    mask: '+55 (__) _____-____',
    replacement: { _: /\d/ },
  })
}
