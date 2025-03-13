'use client'

import { EditFlashcardData } from '@/components/EditFlashcardData'
import { SpinLoader } from '@/components/SpinLoader'
import { getAllFlashcardData } from '@/data/flashcards'
import { useCookies } from '@/hooks/cookies'
import { useSessionValidation } from '@/hooks/sessionValidation'
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
  const deckId = searchParams.get('deckId')
  const flashcardId = searchParams.get('flashcardId')

  const jwtToken = useCookies('Authorization')
  const { pageLoading } = useSessionValidation()

  useEffect(() => {
    if (!jwtToken) {
      toast.warning('É preciso logar novamente')
      router.push('/login')
      return
    }

    if (pageLoading) return

    const fetchData = async () => {
      setLoader(true)

      const response = await getAllFlashcardData(
        Number(flashcardId),
        Number(deckId),
        jwtToken,
      )

      if (response.success) {
        setFlashcardData(response.flashcard)
      } else {
        toast.error('Flashcard não encontrado')
        router.push(`/flashcards?pag=1&deckId=${deckId}`)
      }

      setLoader(false)
    }

    if (deckId && flashcardId) {
      fetchData()
    } else {
      router.push(`/flashcards?pag=1&deckId${deckId}`)
    }
  }, [setFlashcardData, router, deckId, flashcardId, jwtToken, pageLoading])

  return (
    <section>
      {loader || pageLoading ? (
        <div className="relative flex min-h-screen-header items-center justify-center">
          <SpinLoader />
        </div>
      ) : (
        deckId && <EditFlashcardData deckId={deckId} />
      )}
    </section>
  )
}
