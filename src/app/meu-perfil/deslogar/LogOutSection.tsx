'use client'

import { SpinLoader } from '@/components/SpinLoader'
import { userLogOut } from '@/data/userData'
import { useCookies } from '@/hooks/cookies'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'react-toastify'

export const LogOutSection = () => {
  const sessionCookie = useCookies('session')
  const jwtToken = useCookies('Authorization')

  const router = useRouter()

  useEffect(() => {
    if (!sessionCookie && !jwtToken) router.push('/')
  }, [sessionCookie, jwtToken, router])

  useEffect(() => {
    const logOut = async () => {
      if (sessionCookie && jwtToken && typeof document !== 'undefined') {
        const response = await userLogOut(sessionCookie, jwtToken)

        if (response.success) {
          router.push('/')
        } else {
          toast.error('Erro ao deslogar')
        }
      }
    }

    logOut()
  }, [router, sessionCookie, jwtToken])

  return (
    <section className="mx-auto max-w-1440px">
      <div className="relative flex h-screen-header flex-col items-center justify-center gap-3">
        <SpinLoader />
        <h1 className="text-center font-medium">Saindo...</h1>
      </div>
    </section>
  )
}
