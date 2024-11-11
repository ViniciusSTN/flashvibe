'use client'

import { EditFlashcardData } from '@/components/EditFlashcardData'
import { verifySession } from '@/data/pagesProtection'
import { useCookies } from '@/hooks/cookies'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const AddFlashcardSection = () => {
  const router = useRouter()

  const sessionCookie = useCookies('session')
  const jwtToken = useCookies('Authorization')

  useEffect(() => {
    if (!sessionCookie && !jwtToken) {
      router.push('/login')
    }
  }, [sessionCookie, jwtToken, router])

  useEffect(() => {
    const validateSection = async () => {
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
    }

    validateSection()
  }, [router, sessionCookie])

  return (
    <section>
      <EditFlashcardData />
    </section>
  )
}
