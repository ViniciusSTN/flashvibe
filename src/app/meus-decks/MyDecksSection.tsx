'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { myDeckFiltersAtom } from '@/states/atoms/myDeckFilters'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { MyDeckFilters } from './MyDeckFilters'
import { DeckCard } from '@/components/DeckCard'
import { getAllUserDecks } from '@/data/decks'
import { DeckCardProps } from '@/types/deck'
import { useRouter, useSearchParams } from 'next/navigation'
import { MyDeckModal } from './MyDeckModal'

export const MyDecksSection = () => {
  const [mobile, setMobile] = useState<boolean | null>(null)
  const [decks, setDecks] = useState<DeckCardProps[]>([])
  const [deckLoading, setDeckLoading] = useState<boolean>(true)
  const [amountPages, setAmountPages] = useState<number>(0)
  const [pageActive, setPageActive] = useState<number>(0)
  const [buttons, setButtons] = useState<(number | string)[]>([])

  const [filters, setFilters] = useRecoilState(myDeckFiltersAtom)

  const searchParams = useSearchParams()

  const router = useRouter()

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
    const generatePagination = () => {
      const pages = []
      if (amountPages <= 5) {
        for (let i = 1; i <= amountPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        if (pageActive > 3) pages.push('...')
        if (pageActive > 2) pages.push(pageActive - 1)
        if (pageActive !== 1 && pageActive !== amountPages)
          pages.push(pageActive)
        if (pageActive < amountPages - 1) pages.push(pageActive + 1)
        if (pageActive < amountPages - 2) pages.push('...')
        pages.push(amountPages)
      }
      return pages
    }

    setButtons(generatePagination())
  }, [amountPages, pageActive])

  useEffect(() => {
    const page = searchParams.get('pag')
    if (Number(page)) setPageActive(Number(page))
  }, [searchParams])

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth

      if (width < 1100) setMobile(true)
      else setMobile(false)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const fetchDecks = async () => {
      if (pageActive) {
        const response = await getAllUserDecks(pageActive)

        if (response.success && response.decks) {
          setDecks(response.decks)
          setAmountPages(response.lastPage)
        } else {
          console.error(response.message)
        }
      }

      setDeckLoading(false)
    }

    fetchDecks()
  }, [pageActive])

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
        className={`flex flex-wrap gap-5 sm:justify-between ${mobile ? 'flex-row-reverse sm:flex-nowrap' : ''}`}
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
            className="relative flex h-10 w-full shadow-very-clean"
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

        <ButtonDefault
          text="Adicionar novo deck"
          type="button"
          radius="rounded-md"
          tailwind={`h-10 ${mobile ? 'px-4 text-nowrap' : 'w-310px'}`}
        />
      </div>

      <div className="flex items-start gap-8">
        <MyDeckFilters />

        <div className="relative min-h-52 grow">
          {deckLoading && (
            <div className="rotatingClipLoader absolute left-1/2 top-52 -translate-x-1/2"></div>
          )}

          {decks.length > 0 && (
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
                    />
                  </li>
                ))}
              </ul>

              {buttons.length > 1 && (
                <div className="mt-10 flex justify-center gap-1 sm:gap-2">
                  {buttons.map((text, index) => (
                    <button
                      className={`h-10 w-10 rounded-lg bg-secondary-blue text-xl font-medium text-white hover:scale-[1.02] ${pageActive === index + 1 && 'bg-light-blue900'}`}
                      key={index}
                      onClick={() => handlePageButtonClick(index + 1)}
                      disabled={text === '...'}
                    >
                      {text}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}
