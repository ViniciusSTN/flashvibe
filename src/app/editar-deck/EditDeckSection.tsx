'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { EditCustomDeck } from '@/components/EditCustomDeck'
import { SpinLoader } from '@/components/SpinLoader'
import { getUsersCustomDeckBaseData } from '@/data/decks'
import { verifySession } from '@/data/pagesProtection'
import { useCookies } from '@/hooks/cookies'
import { CustomDeckData } from '@/types/deck'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

export const EditDeckSection = () => {
  const router = useRouter()

  const [deckData, setDeckData] = useState<CustomDeckData | null>(null)
  const [situation, setSituation] = useState<
    'Learning' | 'Finished' | 'New' | null
  >(null)
  const [isPublic, setIsPublic] = useState<boolean | null>(null)
  const [favorite, setFavorite] = useState<boolean | null>(null)
  const [exists, setExists] = useState<boolean>(true)
  const [loading, setLoading] = useState<boolean>(true)

  const params = useSearchParams()
  const sessionCookie = useCookies('session')
  const jwtToken = useCookies('Authorization')

  const deckId = Number(params.get('id'))

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
    async function getUserDeckData() {
      try {
        const result = await getUsersCustomDeckBaseData(deckId)

        console.log(result)

        if (result.success) {
          setDeckData(result.deck)
          setSituation(result.situation)
          setIsPublic(result.isPublic)
          setFavorite(result.favorite)
        } else {
          setExists(false)
        }
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    getUserDeckData()
  }, [deckId])

  useEffect(() => {
    console.log(exists)
  }, [exists])

  return (
    <section className="mx-auto my-24 min-h-screen-header max-w-1440px px-6 md:px-10">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <SpinLoader />
        </div>
      )}

      {deckData && situation && isPublic !== null && favorite !== null && (
        <EditCustomDeck
          initialData={deckData}
          situation={situation}
          isPublic={isPublic}
          favorite={favorite}
        />
      )}

      {!exists && (
        <div>
          <h1 className="mb-10 text-center text-3xl font-semibold">
            Editar deck
          </h1>

          <p className="text-center text-xl">Deck não encontrado</p>

          <div className="flex w-full justify-center">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/3828537.jpg?alt=media&token=cb2cf83f-c143-44ab-91ce-57b6b3e3c3a4"
              alt="deck não existe"
              className="max-w-420px object-cover object-center"
            />
          </div>

          <div className="flex justify-center">
            <ButtonDefault
              text="Adicionar novo deck"
              type="link"
              paddingx="px-4"
              paddingy="py-2"
              radius="rounded-md"
              link="/novo-deck/personalizado"
            />
          </div>
        </div>
      )}
    </section>
  )
}
