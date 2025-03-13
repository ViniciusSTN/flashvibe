'use client'

import { EditFlashcardData } from '@/components/EditFlashcardData'
import { SpinLoader } from '@/components/SpinLoader'
import { useCookies } from '@/hooks/cookies'
import { useSessionValidation } from '@/hooks/sessionValidation'
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

  const jwtToken = useCookies('Authorization')
  const { pageLoading } = useSessionValidation()

  useEffect(() => {
    if (pageLoading) return

    if (!deckId) router.push('/')

    if (!jwtToken) {
      toast.warning('É preciso logar novamente')
      router.push('/login')
      return
    }

    setFlashcardData({
      keyword: '',
      mainPhrase: '',
      examples: [],
      translations: [],
      pronunciations: [],
      images: [],
    })
  }, [pageLoading, deckId, jwtToken, router, setFlashcardData])

  if (pageLoading)
    return (
      <div className="relative flex min-h-screen-header items-center justify-center">
        <SpinLoader />
      </div>
    )

  return <section>{deckId && <EditFlashcardData deckId={deckId} />}</section>
}
