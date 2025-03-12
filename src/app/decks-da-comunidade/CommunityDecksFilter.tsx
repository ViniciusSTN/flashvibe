import { useEffect, useState } from 'react'
import { ButtonDefault } from '@/components/ButtonDefault'
import { CommunityDecksFiltersDataType } from '@/types/filters'
import { useRecoilState } from 'recoil'
import { useRouter, useSearchParams } from 'next/navigation'
import { communityDecksFiltersAtom } from '@/states'
import Slider from 'rc-slider'
import Image from 'next/image'
import 'rc-slider/assets/index.css'

const defaultData: CommunityDecksFiltersDataType = {
  orderBy: 'bestRated',
  flashcards: {
    min: 0,
    max: 0,
  },
}

export const CommunityDecksFilter = () => {
  // const [initialRange, setInitialRange] = useState({ min: 0, max: 0 })
  const searchParams = useSearchParams()
  const router = useRouter()

  const [deckFilters, setDeckFilters] = useRecoilState(
    communityDecksFiltersAtom,
  )

  const [filterData, setFilterData] = useState<CommunityDecksFiltersDataType>(
    () => deckFilters ?? defaultData,
  )

  const [hidden, setHidden] = useState({
    orderBy: false,
    flashcards: false,
  })

  const handleSliderChange = (newValues: number | number[]) => {
    if (Array.isArray(newValues)) {
      setFilterData((prevState) => ({
        ...prevState,
        flashcards: {
          min: newValues[0],
          max: newValues[1],
        },
      }))
    }
  }

  const handleHiddenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const name = (event.target as HTMLButtonElement).name

    if (name === 'orderBy' || name === 'flashcards') {
      setHidden((prevState) => ({
        ...prevState,
        [name]: !prevState[name],
      }))
    }
  }

  const handleSearchByChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target

    if (
      value === 'newer' ||
      value === 'older' ||
      value === 'bestRated' ||
      value === 'moreRated' ||
      value === 'flashcards'
    ) {
      setFilterData((prevState) => ({
        ...prevState,
        orderBy: value,
      }))
    }
  }

  const handleResetClick = () => {
    setFilterData({
      ...defaultData,
      flashcards: {
        ...deckFilters.flashcards,
      },
    })

    setDeckFilters((prevState) => ({
      ...defaultData,
      flashcards: {
        ...prevState.flashcards,
      },
      isActive: prevState.isActive,
    }))
  }

  const handleFilterSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    const queryParams = new URLSearchParams()

    queryParams.set('orderBy', filterData.orderBy)
    queryParams.set('flashcardsMin', String(filterData.flashcards.min))
    queryParams.set('flashcardsMax', String(filterData.flashcards.max))

    const page = searchParams.get('pag') || '1'

    router.replace(`/decks-da-comunidade?pag=${page}&${queryParams.toString()}`)

    setDeckFilters((prevState) => ({
      isActive: prevState.isActive,
      ...filterData,
    }))
  }

  useEffect(() => {
    setFilterData(deckFilters)
  }, [deckFilters])

  return (
    <form
      className={`absolute z-10 mt-5 max-h-0 max-w-310px overflow-hidden bg-white transition-all duration-200 ease-in ${
        deckFilters.isActive && 'max-h-842px shadow-very-clean lg:static'
      }`}
      onSubmit={handleFilterSubmit}
      action=""
    >
      <h3 className="border-b border-light-gray225 py-4 text-center font-medium">
        Filtros
      </h3>

      <fieldset className="border-b border-light-gray225">
        <legend className="w-full">
          <button
            name="orderBy"
            className="flex h-full w-full items-center justify-between px-5 py-3 text-start text-lg font-medium"
            onClick={handleHiddenClick}
          >
            <span className="pointer-events-none text-base sm:text-lg">
              Ordenar
            </span>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/arrow2.svg?alt=media&token=7edc6c5d-bc40-4ced-b0c9-2f054379a9d9"
              alt="mostrar filtros"
              width={15}
              height={15}
              className={`${!hidden.orderBy && 'rotate-90'} pointer-events-none transition-all duration-300`}
            />
          </button>
        </legend>

        <div
          className={`${hidden.orderBy ? 'max-h-0 opacity-0' : 'max-h-96 pb-5 opacity-100'} flex flex-col gap-3 overflow-hidden pl-5 font-medium text-light-gray500 transition-all duration-300 ease-in-out`}
        >
          {/* 'newer' | 'older' | 'bestRated' | 'moreRated' | 'flashcards' */}

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="newer"
              onChange={handleSearchByChange}
              checked={filterData.orderBy === 'newer'}
            />
            <span>Mais novos</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="older"
              onChange={handleSearchByChange}
              checked={filterData.orderBy === 'older'}
            />
            <span>Mais antigos</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="bestRated"
              onChange={handleSearchByChange}
              checked={filterData.orderBy === 'bestRated'}
            />
            <span>Melhores avaliados</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="moreRated"
              onChange={handleSearchByChange}
              checked={filterData.orderBy === 'moreRated'}
            />
            <span>Mais avaliados</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="flashcards"
              onChange={handleSearchByChange}
              checked={filterData.orderBy === 'flashcards'}
            />
            <span>Quantidade de flashcards</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="border-b border-light-gray225">
        <legend className="w-full">
          <button
            name="flashcards"
            className="flex h-full w-full items-center justify-between gap-5 px-4 py-3 text-start text-lg font-medium"
            onClick={handleHiddenClick}
          >
            <span className="pointer-events-none text-base sm:text-lg">
              Quantidade de flashcards
            </span>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/arrow2.svg?alt=media&token=7edc6c5d-bc40-4ced-b0c9-2f054379a9d9"
              alt="mostrar filtros"
              width={15}
              height={15}
              className={`${!hidden.flashcards && 'rotate-90'} pointer-events-none transition-all duration-300`}
            />
          </button>
        </legend>

        <div
          className={`${hidden.flashcards ? 'max-h-0 opacity-0' : 'max-h-96 py-5 opacity-100'} overflow-hidden px-5 transition-all duration-300 ease-in-out`}
        >
          <Slider
            range
            min={deckFilters.flashcards.min}
            max={deckFilters.flashcards.max}
            step={2}
            value={[filterData.flashcards.min, filterData.flashcards.max]}
            onChange={handleSliderChange}
          />
          <div className="flex justify-between">
            <span>{filterData.flashcards.min}</span>
            <span>{filterData.flashcards.max}</span>
          </div>
        </div>
      </fieldset>

      <div className="flex justify-center gap-3 py-5 sm:gap-5">
        <ButtonDefault
          text="Redefinir"
          type="button"
          style="outDark"
          paddingy="py-2"
          radius="rounded-lg"
          tailwind="w-28"
          onClick={handleResetClick}
        />

        <ButtonDefault
          text="Aplicar"
          type="button"
          style="dark"
          paddingy="py-2"
          radius="rounded-lg"
          tailwind="w-28"
          submit
        />
      </div>
    </form>
  )
}
