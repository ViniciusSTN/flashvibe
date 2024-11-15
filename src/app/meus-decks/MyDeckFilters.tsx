import { useEffect, useState } from 'react'
import { ButtonDefault } from '@/components/ButtonDefault'
import { MyDeckFiltersDataType } from '@/types/filters'
import { useRecoilState } from 'recoil'
import { myDeckFiltersAtom } from '@/states/atoms/filters'
import { useRouter, useSearchParams } from 'next/navigation'
import Slider from 'rc-slider'
import Image from 'next/image'
import 'rc-slider/assets/index.css'

const defaultData: MyDeckFiltersDataType = {
  type: 'all',
  flashcards: {
    min: 0,
    max: 0,
  },
  searchBy: 'lastModifications',
  situation: {
    favorites: false,
    finished: false,
    learning: false,
  },
}

export const MyDeckFilters = () => {
  // const [initialRange, setInitialRange] = useState({ min: 0, max: 0 })
  const searchParams = useSearchParams()
  const router = useRouter()

  const [deckFilters, setDeckFilters] = useRecoilState(myDeckFiltersAtom)

  const [filterData, setFilterData] = useState<MyDeckFiltersDataType>(
    () => deckFilters ?? defaultData,
  )

  const [hidden, setHidden] = useState({
    searchBy: false,
    flashcards: false,
    situation: false,
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

  const handleTypeButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault()
    const name = (event.target as HTMLButtonElement).name

    if (name === 'all' || name === 'standard' || name === 'custom') {
      setFilterData((prevState) => ({
        ...prevState,
        type: name,
      }))
    }
  }

  const handleHiddenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const name = (event.target as HTMLButtonElement).name

    if (name === 'searchBy' || name === 'flashcards' || name === 'situation') {
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
      value === 'lastModifications' ||
      value === 'lastStudied' ||
      value === 'flashcards'
    ) {
      setFilterData((prevState) => ({
        ...prevState,
        searchBy: value,
      }))
    }
  }

  const handleSituationChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target

    if (value === 'favorites' || value === 'learning' || value === 'finished') {
      setFilterData((prevState) => ({
        ...prevState,
        situation: {
          ...prevState.situation,
          [value]: !prevState.situation[value],
        },
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

    queryParams.set('type', filterData.type)
    queryParams.set('searchBy', filterData.searchBy)
    queryParams.set('flashcardsMin', String(filterData.flashcards.min))
    queryParams.set('flashcardsMax', String(filterData.flashcards.max))

    Object.keys(filterData.situation).forEach((key) => {
      if (filterData.situation[key as keyof typeof filterData.situation]) {
        queryParams.append('situation', key)
      }
    })

    const page = searchParams.get('pag') || '1'

    router.replace(`/meus-decks?pag=${page}&${queryParams.toString()}`)

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

      <fieldset className="flex flex-wrap justify-center border-b border-light-gray225 py-5 text-xs font-semibold text-secondary-blue sm:px-3 sm:text-sm">
        <button
          className={`h-7 w-[65px] rounded-s-md transition-colors sm:w-[75px] ${filterData.type === 'standard' ? 'bg-secondary-blue text-white hover:text-light-blue200' : 'border border-secondary-blue hover:text-light-blue900'}`}
          name="standard"
          onClick={handleTypeButtonClick}
        >
          Padrões
        </button>

        <button
          className={`h-7 px-2 transition-colors sm:px-3 ${filterData.type === 'custom' ? 'bg-secondary-blue text-white hover:text-light-blue200' : 'border-y border-secondary-blue hover:text-light-blue900'}`}
          name="custom"
          onClick={handleTypeButtonClick}
        >
          Personalizados
        </button>

        <button
          className={`h-7 w-[65px] rounded-e-md transition-colors sm:w-[75px] ${filterData.type === 'all' ? 'bg-secondary-blue text-white hover:text-light-blue200' : 'border border-secondary-blue hover:text-light-blue900'}`}
          name="all"
          onClick={handleTypeButtonClick}
        >
          Todos
        </button>
      </fieldset>

      <fieldset className="border-b border-light-gray225">
        <legend className="w-full">
          <button
            name="searchBy"
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
              className={`${!hidden.searchBy && 'rotate-90'} pointer-events-none transition-all duration-300`}
            />
          </button>
        </legend>

        <div
          className={`${hidden.searchBy ? 'max-h-0 opacity-0' : 'max-h-96 pb-5 opacity-100'} flex flex-col gap-3 overflow-hidden pl-5 font-medium text-light-gray500 transition-all duration-300 ease-in-out`}
        >
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="newer"
              onChange={handleSearchByChange}
              checked={filterData.searchBy === 'newer'}
            />
            <span>Mais novos</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="older"
              onChange={handleSearchByChange}
              checked={filterData.searchBy === 'older'}
            />
            <span>Mais antigos</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="lastModifications"
              onChange={handleSearchByChange}
              checked={filterData.searchBy === 'lastModifications'}
            />
            <span>Modificações recentes</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="lastStudied"
              onChange={handleSearchByChange}
              checked={filterData.searchBy === 'lastStudied'}
            />
            <span>Últimos estudados</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="flashcards"
              onChange={handleSearchByChange}
              checked={filterData.searchBy === 'flashcards'}
            />
            <span>Quantidade de flashcards</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="border-b border-light-gray225">
        <legend className="w-full">
          <button
            name="flashcards"
            className="flex h-full w-full items-center justify-between px-5 py-3 text-start text-lg font-medium"
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

      <fieldset className="border-b border-light-gray225">
        <legend className="w-full">
          <button
            name="situation"
            className="flex h-full w-full items-center justify-between px-5 py-3 text-start text-lg font-medium"
            onClick={handleHiddenClick}
          >
            <span className="pointer-events-none text-base sm:text-lg">
              Situação
            </span>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/arrow2.svg?alt=media&token=7edc6c5d-bc40-4ced-b0c9-2f054379a9d9"
              alt="mostrar filtros"
              width={15}
              height={15}
              className={`${!hidden.situation && 'rotate-90'} pointer-events-none transition-all duration-300`}
            />
          </button>
        </legend>

        <div
          className={`${hidden.situation ? 'max-h-0 opacity-0' : 'max-h-96 pb-5 opacity-100'} flex flex-col gap-3 overflow-hidden px-5 font-medium transition-all duration-300 ease-in-out`}
        >
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="situation"
              value="favorites"
              onChange={handleSituationChange}
              checked={filterData.situation.favorites}
            />
            <span>Favoritos</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="situation"
              value="learning"
              onChange={handleSituationChange}
              checked={filterData.situation.learning}
            />
            <span>Aprendendo</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="situation"
              value="finished"
              onChange={handleSituationChange}
              checked={filterData.situation.finished}
            />
            <span>Finalizado</span>
          </label>
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
