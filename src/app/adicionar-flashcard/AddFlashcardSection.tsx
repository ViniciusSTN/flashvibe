'use client'

import { EditFlashcardData } from '@/components/EditFlashcardData'
import { verifySession } from '@/data/pagesProtection'
import { useCookies } from '@/hooks/cookies'
import { newFlashcardDataAtom } from '@/states'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'

export const AddFlashcardSection = () => {
  const setFlashcardData = useSetRecoilState(newFlashcardDataAtom)

  const router = useRouter()

  const params = useSearchParams()
  const deckId = params.get('deckId')

  const sessionCookie = useCookies('session')
  const jwtToken = useCookies('Authorization')

  useEffect(() => {
    if (!sessionCookie && !jwtToken) {
      router.push('/login')
    }
  }, [sessionCookie, jwtToken, router])

  useEffect(() => {
    if (!deckId) {
      router.push('/')
    }
  }, [deckId, router])

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

    setFlashcardData({
      keyword: '',
      mainPhrase: '',
      examples: [],
      translations: [],
      pronunciations: [],
      images: [],
    })
  }, [router, sessionCookie, setFlashcardData])

  return <section>{deckId && <EditFlashcardData deckId={deckId} />}</section>
}
