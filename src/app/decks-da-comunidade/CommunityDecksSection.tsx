'use client'

import { communityDecksFiltersAtom } from '@/states/atoms/filters'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { DeckCard } from '@/components/DeckCard'
import {
  getAllCommunityDecks,
  getQuantityFlashcardsCommunityDecks,
  mapReturnedDeckToDeckCardProps,
} from '@/data/decks'
import { DeckCardProps } from '@/types/deck'
import { useRouter, useSearchParams } from 'next/navigation'
import { CommunityDecksFilter } from './CommunityDecksFilter'
import { CommunityDecksModal } from './CommunityDecksModal'
import { deckActiveAtom } from '@/states/atoms/deckActive'
import { verifySession } from '@/data/pagesProtection'
import { useCookies } from '@/hooks/cookies'
import { toast } from 'react-toastify'
import { CommunityOrderByFilter } from '@/types/filters'
import usePagination from '@/hooks/pagination'
import Image from 'next/image'

export const CommunityDecksSection = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const getPage = useCallback(() => {
    return searchParams.get('pag')
  }, [searchParams])

  const sessionCookie = useCookies('session')
  const jwtToken = useCookies('Authorization')

  const [mobile, setMobile] = useState<boolean | null>(null)
  const [decks, setDecks] = useState<DeckCardProps[]>([])
  const [deckLoading, setDeckLoading] = useState<boolean>(true)
  const [pageLoading, setPageLoading] = useState<boolean>(true)
  const [amountPages, setAmountPages] = useState<number>(0)
  const [pageActive, setPageActive] = useState<number>(Number(getPage()))

  const paginationButtons = usePagination(amountPages, pageActive)

  const [filters, setFilters] = useRecoilState(communityDecksFiltersAtom)
  const setDeckActive = useSetRecoilState(deckActiveAtom)

  function handleShowFiltersClick() {
    setFilters((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
    }))
  }

  function handlePageButtonClick(page: number) {
    const queryParams = new URLSearchParams(searchParams)
    queryParams.set('pag', page.toString())

    setPageActive(page)
    router.push(`/decks-da-comunidade?${queryParams.toString()}`)
  }

  useEffect(() => {
    const validateSession = async () => {
      setPageLoading(true)

      if (!sessionCookie || !jwtToken) {
        toast.warning('É preciso logar novamente')
        return router.push('/login')
      }

      const response = await verifySession(sessionCookie)

      if (!response.success) {
        toast.warning('É preciso logar novamente')
        router.push('/login')
      }

      setPageLoading(false)
    }

    validateSession()
  }, [sessionCookie, jwtToken, router])

  useEffect(() => {
    setDeckActive(null)
  }, [setDeckActive])

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth

      setMobile(width < 1100)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const page = useMemo(() => searchParams.get('pag') || null, [searchParams])
  const orderBy = useMemo(
    () => searchParams.get('searchBy') || 'bestRated',
    [searchParams],
  )

  useEffect(() => {
    if (!page) return

    const fetchDecks = async () => {
      setDeckLoading(true)

      if (jwtToken) {
        // const page = searchParams.get('pag') || '1'
        // const searchBy = searchParams.get('searchBy') || 'bestRated'

        const formattedOrderBy = (orderBy.charAt(0).toUpperCase() +
          orderBy.slice(1)) as CommunityOrderByFilter
        const flashcardsMin = parseInt(searchParams.get('flashcardsMin') || '0')
        const flashcardsMax = parseInt(searchParams.get('flashcardsMax') || '0')

        setDecks([])
        setAmountPages(0)

        const response = await getAllCommunityDecks(
          Number(page),
          formattedOrderBy,
          flashcardsMin,
          flashcardsMax,
          jwtToken,
        )

        if (response.success && response.decks) {
          const mappedDecks = response.decks.map(mapReturnedDeckToDeckCardProps)

          setDecks(mappedDecks)
          setAmountPages(response.totalPages)
        } else {
          if (
            !response.success &&
            response.error?.includes('Decks not found')
          ) {
            toast.warning('Nenhum deck encontrado. Verifique os filtros')
          } else {
            toast.error('Erro ao buscar decks')
          }
        }

        setDeckLoading(false)
      }
    }

    fetchDecks()
  }, [jwtToken, page, orderBy, searchParams])

  useEffect(() => {
    const fetchQuantityFlashcards = async () => {
      if (jwtToken) {
        const response = await getQuantityFlashcardsCommunityDecks(jwtToken)

        if (response.success) {
          setFilters((prevState) => ({
            ...prevState,
            flashcards: {
              min: response.flashcardMin,
              max: response.flashcardMax,
            },
          }))
        } else {
          setFilters((prevState) => ({
            ...prevState,
            flashcards: {
              min: 0,
              max: 0,
            },
          }))
        }
      }
    }

    fetchQuantityFlashcards()
  }, [jwtToken, setFilters])

  useEffect(() => {
    if (amountPages > 0) {
      if (page && Number(page) > 0 && Number(page) <= amountPages) {
        setPageActive(Number(page))
      }
    }
  }, [searchParams, amountPages, page])

  if (mobile === null || pageLoading) {
    return (
      <section className="flex min-h-screen-header items-center justify-center">
        <div className="rotatingClipLoader"></div>
      </section>
    )
  }

  return (
    <section className="mx-auto my-24 min-h-screen-header max-w-1440px px-6 md:px-10">
      <CommunityDecksModal />

      <h1 className="mb-10 text-center text-3xl font-semibold">
        Decks da comunidade
      </h1>
      <div className="flex justify-between gap-5">
        {!mobile && (
          <button
            className="h-10 w-310px rounded-md border border-light-gray250 font-medium hover:border-secondary-blue hover:text-secondary-blue active:outline active:outline-1 active:outline-secondary-blue"
            onClick={handleShowFiltersClick}
          >
            {filters.isActive ? 'Ocultar filtros' : 'Mostrar filtros'}
          </button>
        )}

        {mobile && (
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

        <div className="flex w-full gap-5 sm:w-auto">
          <form
            action=""
            className="relative flex h-10 w-full rounded-md shadow-very-clean"
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
      </div>

      <div className="flex items-start gap-8">
        <CommunityDecksFilter />

        <div className="relative min-h-[800px] grow">
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
                      canEdit={deck.canEdit}
                      author={deck.author}
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
