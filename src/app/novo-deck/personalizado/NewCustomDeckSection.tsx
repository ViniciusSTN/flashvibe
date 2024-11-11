'use client'

import { EditCustomDeck } from '@/components/EditCustomDeck'
import { verifySession } from '@/data/pagesProtection'
import { useCookies } from '@/hooks/cookies'
import { CustomDeckData } from '@/types/deck'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

const initialData: CustomDeckData = {
  name: '',
  description: '',
  photo: null,
  colorPredefinition: 4,
  new: 3,
  learning: 15,
  reviewing: 2,
}

export const NewCustomDeckSection = () => {
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
    <section className="mx-auto my-24 min-h-screen-header max-w-1440px px-6 md:px-10">
      <EditCustomDeck
        initialData={initialData}
        situation="New"
        isPublic={false}
        favorite={false}
      />
    </section>
  )
}
