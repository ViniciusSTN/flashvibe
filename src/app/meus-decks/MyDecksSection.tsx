'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { myDeckFiltersAtom } from '@/states/atoms/filters'
import Image from 'next/image'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { MyDeckFilters } from './MyDeckFilters'
import { DeckCard } from '@/components/DeckCard'
import {
  getAllUserDecks,
  getQuantityFlashcards,
  mapReturnedDeckToDeckCardProps,
} from '@/data/decks'
import { DeckCardProps } from '@/types/deck'
import { useRouter, useSearchParams } from 'next/navigation'
import { MyDeckModal } from './MyDeckModal'
import Link from 'next/link'
import usePagination from '@/hooks/pagination'
import { deckActiveAtom } from '@/states/atoms/deckActive'
import { verifySession } from '@/data/pagesProtection'
import { useCookies } from '@/hooks/cookies'
import { toast } from 'react-toastify'

export const MyDecksSection = () => {
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
  const [amountPages, setAmountPages] = useState<number>(0)
  const [pageActive, setPageActive] = useState<number>(Number(getPage()))
  const [newDeckActive, setNewDeckActive] = useState<boolean>(false)

  const paginationButtons = usePagination(amountPages, pageActive)

  const [filters, setFilters] = useRecoilState(myDeckFiltersAtom)
  const setDeckActive = useSetRecoilState(deckActiveAtom)

  function handleShowFiltersClick() {
    setFilters((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
    }))
  }

  function handlePageButtonClick(page: number) {
    setPageActive(page)
    router.push(`/meus-decks?pag=${page}`)
  }

  useEffect(() => {
    const validateSession = async () => {
      if (!sessionCookie || !jwtToken) {
        toast.warning('É preciso logar novamente')
        return router.push('/login')
      }

      const response = await verifySession(sessionCookie)

      if (!response.success) {
        toast.warning('É preciso logar novamente')
        router.push('/login')
      }
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
  const searchBy = useMemo(
    () => searchParams.get('searchBy') || 'lastModifications',
    [searchParams],
  )

  useEffect(() => {
    console.log(searchParams.toString(), searchBy)
  }, [searchParams, searchBy])

  useEffect(() => {
    if (!page) return

    const fetchDecks = async () => {
      setDeckLoading(true)

      if (jwtToken) {
        // const page = searchParams.get('pag') || '1'
        // const searchBy = searchParams.get('searchBy') || 'lastModifications'
        const type = searchParams.get('type') || 'all'
        const formattedSearchBy =
          searchBy.charAt(0).toUpperCase() + searchBy.slice(1)
        const flashcardsMin = parseInt(searchParams.get('flashcardsMin') || '0')
        const flashcardsMax = parseInt(searchParams.get('flashcardsMax') || '0')
        const situations = searchParams.getAll('situation') || []

        const response = await getAllUserDecks(
          Number(page),
          type,
          formattedSearchBy,
          flashcardsMin,
          flashcardsMax,
          situations,
          jwtToken,
        )

        if (response.success && response.decks) {
          const mappedDecks = response.decks.map(mapReturnedDeckToDeckCardProps)

          setDecks(mappedDecks)
          setAmountPages(response.totalPages)
        } else {
          setDecks([])
          setAmountPages(0)

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
  }, [jwtToken, page, searchBy, searchParams])

  useEffect(() => {
    const fetchQuantityFlashcards = async () => {
      if (jwtToken) {
        const response = await getQuantityFlashcards(jwtToken)

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

  if (mobile === null) {
    return (
      <section className="flex min-h-screen-header items-center justify-center">
        <div className="rotatingClipLoader"></div>
      </section>
    )
  }

  return (
    <section className="mx-auto my-24 min-h-screen-header max-w-1440px px-6 md:px-10">
      <MyDeckModal />

      <h1 className="mb-10 text-center text-3xl font-semibold">Meus decks</h1>
      <div
        className={`flex flex-wrap gap-5 sm:justify-between ${mobile && 'flex-row-reverse sm:flex-nowrap'}`}
      >
        {!mobile && (
          <button
            className="h-10 w-310px rounded-md border border-light-gray250 font-medium hover:border-secondary-blue hover:text-secondary-blue active:outline active:outline-1 active:outline-secondary-blue"
            onClick={handleShowFiltersClick}
          >
            {filters.isActive ? 'Ocultar filtros' : 'Mostrar filtros'}
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
        </div>

        <div className="relative">
          <ButtonDefault
            text="Adicionar deck"
            type="button"
            radius="rounded-md"
            tailwind={`h-10 ${mobile ? 'px-4 text-nowrap' : 'w-310px'}`}
            onClick={() => setNewDeckActive(!newDeckActive)}
          />

          {newDeckActive && (
            <div
              className={`absolute ${mobile ? 'right-0 sm:left-0 sm:right-auto' : 'right-0'} top-14 z-20 flex flex-col text-nowrap bg-white font-medium shadow-hight`}
            >
              <Link
                href="/novo-deck/predefinido?pag=1"
                className="border-b border-light-gray225 px-8 py-5"
              >
                Deck predefinido
              </Link>

              <Link href="/novo-deck/personalizado" className="px-8 py-5">
                Deck personalizado
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-start gap-8">
        <MyDeckFilters />

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
