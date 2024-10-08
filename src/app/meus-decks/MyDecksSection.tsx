'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { myDeckFiltersAtom } from '@/states/atoms/myDeckFilters'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { MyDeckFilters } from './MyDeckFilters'

export const MyDecksSection = () => {
  const [mobile, setMobile] = useState<boolean | null>(null)

  const [filters, setFilters] = useRecoilState(myDeckFiltersAtom)

  function handleShowFiltersClick() {
    setFilters((prevState) => ({
      ...prevState,
      isActive: !prevState.isActive,
    }))
  }

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

  if (mobile === null) {
    return (
      <section className="flex min-h-screen-header items-center justify-center">
        <div className="rotatingClipLoader"></div>
      </section>
    )
  }

  return (
    <section className="mx-auto my-24 max-w-1440px px-6 md:px-10">
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

      <MyDeckFilters />
    </section>
  )
}
