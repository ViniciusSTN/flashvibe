'use client'

import { EditFlashcardData } from '@/components/EditFlashcardData'
import { SpinLoader } from '@/components/SpinLoader'
import { getAllFlashcardData } from '@/data/flashcards'
import { verifySession } from '@/data/pagesProtection'
import { useCookies } from '@/hooks/cookies'
import { newFlashcardDataAtom } from '@/states'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'

export const EditFlashcardSection = () => {
  const router = useRouter()

  const setFlashcardData = useSetRecoilState(newFlashcardDataAtom)

  const [loader, setLoader] = useState<boolean>(true)
  const searchParams = useSearchParams()
  const param = searchParams.get('id')

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

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllFlashcardData(Number(param))

      if (response.success) {
        setFlashcardData(response.flashcard)
      } else {
        toast.error('Flashcard não encontrado')
        router.back()
      }

      setLoader(false)
    }

    fetchData()
  }, [setFlashcardData, router, param])

  return (
    <section>
      {loader ? (
        <div className="relative flex min-h-screen-header items-center justify-center">
          <SpinLoader />
        </div>
      ) : (
        <EditFlashcardData />
      )}
    </section>
  )
}
