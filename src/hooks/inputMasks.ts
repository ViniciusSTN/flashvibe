import { useMask } from '@react-input/mask'

export const usePhoneMask = () => {
  return useMask({
    mask: '+55 (__) _____-____',
    replacement: { _: /\d/ },
  })
}

export const formatPhone = (rawPhone: string) => {
  const phone = rawPhone.replace(/\D/g, '')

  const countryCode = phone.slice(0, 2)
  const areaCode = phone.slice(2, 4)
  const mainNumber = phone.slice(4)

  if (phone.length <= 2) return `+${countryCode} (${areaCode}`
  if (phone.length <= 7)
    return `+${countryCode} (${areaCode}) ${mainNumber.slice(0, 5)}`
  return `+${countryCode} (${areaCode}) ${mainNumber.slice(0, 5)}-${mainNumber.slice(5, 9)}`
}
