'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { flashcardFiltersAtom } from '@/states/atoms/filters'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { useRouter, useSearchParams } from 'next/navigation'
import { FlashcardsFilters } from './FlashcardsFilters'
import { FlashcardModal } from './FlashcardModal'
import { FlashcardFront } from '@/types/flashcard'
import { getAllFlashcardData, getDeckFlashcards } from '@/data/flashcards'
import { ListedFlashcard } from '@/components/ListedFlashcard'
import usePagination from '@/hooks/pagination'
import Image from 'next/image'
import { flashcardModalAtom } from '@/states'
import { toast } from 'react-toastify'
import { verifySession } from '@/data/pagesProtection'
import { useCookies } from '@/hooks/cookies'
import { SpinLoader } from '@/components/SpinLoader'

export const FlashcardsSection = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const getPage = useCallback(() => {
    return searchParams.get('pag')
  }, [searchParams])

  const deckId = searchParams.get('deckId')

  const [mobile, setMobile] = useState<boolean | null>(null)
  const [flashcards, setFlashcards] = useState<FlashcardFront[]>([])
  const [flashcardLoading, setFlashcardLoading] = useState<boolean>(true)
  const [amountPages, setAmountPages] = useState<number>(0)
  const [pageActive, setPageActive] = useState<number>(Number(getPage()))
  const [deckName, setDeckName] = useState<string>('')
  const [loadingData, setLoadingData] = useState<boolean>(false)

  const paginationButtons = usePagination(amountPages, pageActive)
  const sessionCookie = useCookies('session')
  const jwtToken = useCookies('Authorization')

  const [filters, setFilters] = useRecoilState(flashcardFiltersAtom)
  const setFlashcard = useSetRecoilState(flashcardModalAtom)

  const page = useMemo(() => searchParams.get('pag') || null, [searchParams])
  const searchBy = useMemo(
    () => searchParams.get('searchBy') || 'lastModifications',
    [searchParams],
  )

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
    function handleResize() {
      const width = window.innerWidth

      setMobile(width < 1100)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!jwtToken) return

      const situations = searchParams.getAll('situation') || []

      setFlashcardLoading(true)

      setFlashcards([])
      setAmountPages(0)
      setFlashcard(null)

      const response = await getDeckFlashcards(
        Number(deckId),
        Number(page),
        searchBy,
        situations,
        jwtToken,
      )

      if (response.success && response.flashcard && response.deck) {
        setFlashcards(response.flashcard)
        setAmountPages(response.totalPages)
        setDeckName(response.deck)
      } else {
        toast.warning('Nenhum flashcard encontrado')
      }

      console.log(response)

      setFlashcardLoading(false)
    }

    fetchFlashcards()
  }, [searchParams, deckId, searchBy, page, jwtToken, setFlashcard])

  useEffect(() => {
    if (amountPages > 0) {
      if (page && Number(page) > 0 && Number(page) <= amountPages) {
        setPageActive(Number(page))
      }
    }
  }, [searchParams, amountPages, page])

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
    router.push(`/flashcards?${queryParams.toString()}`)
  }

  async function handleFlashcardClick(flashcardId: number) {
    setLoadingData(true)

    if (deckId && jwtToken) {
      const response = await getAllFlashcardData(
        flashcardId,
        Number(deckId),
        jwtToken,
      )

      if (response.success) {
        setFlashcard({ ...response.flashcard, turned: false, flashcardId })
      } else {
        toast.error('Erro ao obter flashcard')
      }
    }

    setLoadingData(false)
  }

  if (mobile === null) {
    return (
      <section className="flex min-h-screen-header items-center justify-center">
        <div className="rotatingClipLoader"></div>
      </section>
    )
  }

  return (
    <section className="mx-auto my-24 min-h-screen-header max-w-1440px px-6 md:px-10">
      <FlashcardModal deckId={Number(deckId)} />

      {loadingData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <SpinLoader />
        </div>
      )}

      <h1 className="mb-10 text-center text-3xl font-semibold">
        Flashcards {deckName}
      </h1>
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
            text="Adicionar flashcard"
            type="link"
            link={`/adicionar-flashcard?deckId=${deckId}`}
            radius="rounded-md"
            tailwind={`h-10 ${mobile ? 'px-4 text-nowrap' : 'w-310px'}`}
          />
        </div>
      </div>

      <div className="flex items-start gap-8">
        <FlashcardsFilters />

        <div className="relative min-h-[800px] grow">
          {flashcardLoading ? (
            <div className="absolute left-0 top-52 w-full">
              <div className="rotatingClipLoader mx-auto"></div>
            </div>
          ) : flashcards.length > 0 ? (
            <>
              <ul className="mt-16 grid auto-rows-[1fr] grid-cols-[repeat(auto-fill,minmax(246px,1fr))] gap-x-3 gap-y-8">
                {flashcards.map((flashcard, index) => (
                  <li key={index} className="flex justify-center">
                    <ListedFlashcard
                      front={flashcard.mainPhrase}
                      keyword={flashcard.keyword}
                      disabled={loadingData}
                      onClick={() =>
                        !loadingData && handleFlashcardClick(flashcard.id)
                      }
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
                Nenhum flashcard encontrado
              </h4>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
