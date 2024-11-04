import { useState } from 'react'
import { ButtonDefault } from '@/components/ButtonDefault'
import { useRecoilState } from 'recoil'
import { flashcardFiltersAtom } from '@/states/atoms/filters'
import { FlashcardFiltersDataType } from '@/types/flashcard'
import Image from 'next/image'

const defaultData: FlashcardFiltersDataType = {
  searchBy: 'lastModifications',
  situation: {
    new: true,
    learning: true,
    reviewing: true,
  },
}

export const FlashcardsFilters = () => {
  const [filterData, setFilterData] =
    useState<FlashcardFiltersDataType>(defaultData)

  const [hidden, setHidden] = useState({
    searchBy: false,
    situation: false,
  })

  const [flashcardFilters, setFlashcardFilters] =
    useRecoilState(flashcardFiltersAtom)

  const handleHiddenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const name = (event.target as HTMLButtonElement).name

    if (name === 'searchBy' || name === 'situation') {
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
      value === 'mostReviewed' ||
      value === 'lessReviewed'
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

    if (value === 'new' || value === 'learning' || value === 'reviewing') {
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
    })
  }

  const handleFilterSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    setFlashcardFilters((prevState) => ({
      ...prevState,
      ...filterData,
    }))
  }

  return (
    <form
      className={`absolute z-10 mt-5 max-h-0 max-w-310px overflow-hidden bg-white transition-all duration-200 ease-in ${
        flashcardFilters.isActive && 'max-h-842px shadow-very-clean lg:static'
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
              value="mostReviewed"
              onChange={handleSearchByChange}
              checked={filterData.searchBy === 'mostReviewed'}
            />
            <span>Mais revisados</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="sort"
              value="lessReviewed"
              onChange={handleSearchByChange}
              checked={filterData.searchBy === 'lessReviewed'}
            />
            <span>Menos revisados</span>
          </label>
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
              value="new"
              onChange={handleSituationChange}
              checked={filterData.situation.new}
            />
            <span>Novo</span>
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
              value="reviewing"
              onChange={handleSituationChange}
              checked={filterData.situation.reviewing}
            />
            <span>Revisando</span>
          </label>
        </div>
      </fieldset>

      <div className="flex justify-center gap-3 px-4 py-5 vsm:px-8 sm:gap-5">
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
