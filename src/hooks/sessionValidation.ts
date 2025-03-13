'use client'

import { useEffect, useState } from 'react'
import { useCookies } from '@/hooks/cookies'
import { verifySession } from '@/data/pagesProtection'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export const useSessionValidation = () => {
  const [pageLoading, setPageLoading] = useState(true)
  const sessionCookie = useCookies('session')
  const router = useRouter()

  useEffect(() => {
    const validateSession = async () => {
      setPageLoading(true)

      if (sessionCookie) {
        const response = await verifySession(sessionCookie)

        if (!response.success) {
          toast.warning('É preciso logar novamente')
          router.push('/login')
        }
      } else {
        toast.warning('É preciso logar novamente')
        router.push('/login')
      }

      setPageLoading(false)
    }

    validateSession()
  }, [router, sessionCookie])

  return { pageLoading }
}
