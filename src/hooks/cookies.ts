import { useState, useEffect } from 'react'

export const useCookies = (cookieName: string) => {
  const getCookieValue = (name: string): string | null => {
    if (typeof document === 'undefined') {
      return null
    }

    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)
    if (parts.length === 2) {
      const part = parts.pop()
      return part ? part.split(';').shift() || null : null
    }
    return null
  }

  const [cookieValue, setCookieValue] = useState<string | null>(
    getCookieValue(cookieName),
  )

  useEffect(() => {
    setCookieValue(getCookieValue(cookieName))
  }, [cookieName])

  return cookieValue
}
