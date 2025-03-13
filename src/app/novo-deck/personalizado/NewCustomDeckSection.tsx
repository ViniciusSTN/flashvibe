'use client'

import { EditCustomDeck } from '@/components/EditCustomDeck'
import { SpinLoader } from '@/components/SpinLoader'
import { useCookies } from '@/hooks/cookies'
import { useSessionValidation } from '@/hooks/sessionValidation'
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

  const jwtToken = useCookies('Authorization')
  const { pageLoading } = useSessionValidation()

  useEffect(() => {
    if (pageLoading) return

    if (!jwtToken) {
      toast.warning('É preciso logar novamente')
      router.push('/login')
    }
  }, [jwtToken, pageLoading, router])

  if (pageLoading)
    return (
      <div className="relative flex min-h-screen-header items-center justify-center">
        <SpinLoader />
      </div>
    )

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
