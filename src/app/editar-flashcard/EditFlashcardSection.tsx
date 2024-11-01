'use client'

import { EditFlashcardData } from '@/components/EditFlashcardData'
import { SpinLoader } from '@/components/SpinLoader'
import { getAllFlashcardData } from '@/data/flashcards'
import { newFlashcardDataAtom } from '@/states'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'

export const EditFlashcardSection = () => {
  const setFlashcardData = useSetRecoilState(newFlashcardDataAtom)

  const [loader, setLoader] = useState<boolean>(true)

  const router = useRouter()
  const searchParams = useSearchParams()
  const param = searchParams.get('id')

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
