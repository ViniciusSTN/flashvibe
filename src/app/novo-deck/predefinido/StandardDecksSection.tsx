'use client'

import { standardDeckFiltersAtom } from '@/states/atoms/filters'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { StandardDeckFilters } from './StandardDeckFilter'
import usePagination from '@/hooks/pagination'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  getAllStandardDecks,
  getQuantityReviews,
  mapReturnedStandardDeckToDeckCardProps,
} from '@/data/decks'
import { DeckCardProps } from '@/types/deck'
import { DeckCard } from '@/components/DeckCard'
import { deckActiveAtom } from '@/states/atoms/deckActive'
import { StandardDeckModal } from './StandardDeckModal'
import { verifySession } from '@/data/pagesProtection'
import { useCookies } from '@/hooks/cookies'
import { toast } from 'react-toastify'

export const StandardDecksSection = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const getPage = useCallback(() => {
    return searchParams.get('pag')
  }, [searchParams])

  const [mobile, setMobile] = useState<boolean | null>(null)
  const [amountPages, setAmountPages] = useState<number>(0)
  const [pageActive, setPageActive] = useState<number>(Number(getPage()))
  const [decks, setDecks] = useState<DeckCardProps[]>([])
  const [deckLoading, setDeckLoading] = useState<boolean>(true)

  const [filters, setFilters] = useRecoilState(standardDeckFiltersAtom)
  const setDeckActive = useSetRecoilState(deckActiveAtom)

  const paginationButtons = usePagination(amountPages, pageActive)
  const sessionCookie = useCookies('session')
  const jwtToken = useCookies('Authorization')

  const page = useMemo(() => searchParams.get('pag') || null, [searchParams])
  const searchBy = useMemo(
    () => searchParams.get('searchBy') || 'newer',
    [searchParams],
  )

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
    setDeckActive(null)
  }, [setDeckActive])

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth

      if (width < 1200) setMobile(true)
      else setMobile(false)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!page) return

    const fetchDecks = async () => {
      setDeckLoading(true)

      if (jwtToken) {
        // const page = searchParams.get('pag') || '1'
        // const searchBy = searchParams.get('searchBy') || 'newer'
        const feedbackMin = parseInt(searchParams.get('feedbackMin') || '0')
        const feedbackMax = parseInt(searchParams.get('feedbackMax') || '0')
        const difficulty = searchParams.getAll('difficulty') || []

        const response = await getAllStandardDecks(
          Number(page),
          searchBy,
          feedbackMin,
          feedbackMax,
          difficulty,
          jwtToken,
        )

        if (response.success && response.standardDecks) {
          const mappedDecks = response.standardDecks.map(
            mapReturnedStandardDeckToDeckCardProps,
          )

          setDecks(mappedDecks)
          setAmountPages(response.totalPages)
        } else {
          setDecks([])
          setAmountPages(0)

          if (
            !response.success &&
            response.error?.includes('Decks not found')
          ) {
            toast.warning('Nenhum deck foi encontrado')
          } else {
            toast.error('Erro ao buscar decks')
          }
        }
      }

      setDeckLoading(false)
    }

    fetchDecks()
  }, [jwtToken, page, searchBy, searchParams])

  useEffect(() => {
    const fetchQuantityReviews = async () => {
      if (jwtToken) {
        const response = await getQuantityReviews(jwtToken)

        if (response.success) {
          setFilters((prevState) => ({
            ...prevState,
            feedback: {
              min: response.minReviews,
              max: response.maxReviews,
            },
          }))
        } else {
          setFilters((prevState) => ({
            ...prevState,
            feedback: {
              min: 0,
              max: 0,
            },
          }))
        }
      }
    }

    fetchQuantityReviews()
  }, [jwtToken, setFilters])

  useEffect(() => {
    if (amountPages > 0) {
      if (page && Number(page) > 0 && Number(page) <= amountPages) {
        setPageActive(Number(page))
      }
    }
  }, [searchParams, amountPages, page])

  function handlePageButtonClick(page: number) {
    setPageActive(page)
    router.push(`/novo-deck/predefinido?pag=${page}`)
  }

  function handleShowFiltersClick() {
    setFilters((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
    }))
  }

  if (mobile === null) {
    return (
      <section className="flex min-h-screen-header items-center justify-center">
        <div className="rotatingClipLoader"></div>
      </section>
    )
  }

  return (
    <section className="mx-auto mt-24 min-h-screen-header max-w-1440px px-6 md:px-10">
      <StandardDeckModal />

      <h1 className="mb-12 text-center text-3xl font-semibold">
        Adicionar deck predefinido
      </h1>

      <div
        className={`relative flex justify-center ${mobile && 'flex-row-reverse gap-5'}`}
      >
        {!mobile ? (
          <button
            className="absolute left-0 h-10 w-310px rounded-md border border-light-gray250 font-medium hover:border-secondary-blue hover:text-secondary-blue active:outline active:outline-1 active:outline-secondary-blue"
            onClick={handleShowFiltersClick}
          >
            {filters.isActive ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>
        ) : (
          <button className="h-10 w-10" onClick={handleShowFiltersClick}>
            {filters.isActive ? (
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/filter-svgrepo-com.svg?alt=media&token=4a16a1c4-93f9-470e-8673-7430c2084cd3"
                alt="ocultar filtros"
                width={40}
                height={40}
              />
            ) : (
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/filter-slash-svgrepo-com.svg?alt=media&token=fe1ac967-4593-4f66-be17-b276b52f4a94"
                alt="ativar filtros"
                width={40}
                height={40}
              />
            )}
          </button>
        )}

        <form
          action=""
          className="relative flex h-10 w-full max-w-420px rounded-md shadow-very-clean"
        >
          <input
            type="text"
            placeholder="Pesquisar"
            className="w-full rounded-md border border-light-gray250 pl-4 pr-16 text-xl outline-[#7c8aff]"
          />
          <button
            type="submit"
            className="absolute right-0 top-0 flex h-10 w-12 items-center justify-center rounded-e-md border-l border-light-gray250"
          >
            <img
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/Search.svg?alt=media&token=7cb5ac9d-0e06-47fd-b66c-6d6e043c6c3a"
              alt="pesquisar"
            />
          </button>
        </form>
      </div>

      <div className="flex min-h-718px items-start gap-8">
        <StandardDeckFilters />

        <div className="relative mb-24 min-h-[800px] grow">
          {deckLoading ? (
            <div className="absolute left-0 top-52 w-full">
              <div className="rotatingClipLoader mx-auto"></div>
            </div>
          ) : decks.length > 0 ? (
            <>
              <ul className="mt-16 grid auto-rows-[1fr] grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-x-3 gap-y-8">
                {decks.map((deck, index) => (
                  <li key={index} className="flex justify-center">
                    <DeckCard
                      colorPredefinition={deck.colorPredefinition}
                      description={deck.description}
                      favorite={deck.favorite}
                      flashcards={deck.flashcards}
                      image={deck.image}
                      lastModification={deck.lastModification}
                      learning={deck.learning}
                      new={deck.new}
                      reviewing={deck.reviewing}
                      situation={deck.situation}
                      title={deck.title}
                      type={deck.type}
                      difficult={deck.difficult}
                      public={deck.public}
                      reviews={deck.reviews}
                      stars={deck.stars}
                      deckId={deck.deckId}
                    />
                  </li>
                ))}
              </ul>

              {paginationButtons.length > 1 && (
                <div className="mt-10 flex justify-center gap-1 sm:gap-2">
                  {paginationButtons.map((text, index) => (
                    <button
                      className={`h-10 w-10 rounded-lg text-xl font-medium text-white hover:scale-[1.02] ${
                        pageActive === text
                          ? 'bg-light-blue900'
                          : 'bg-secondary-blue'
                      }`}
                      key={index}
                      disabled={text === '...'}
                      onClick={() => handlePageButtonClick(Number(text))}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="h-[800px]">
              <h4 className="mt-32 text-center text-xl sm:mt-40 lg:mt-60">
                Nenhum deck encontrado
              </h4>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
