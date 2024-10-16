import Slider from 'rc-slider'
import React, { useEffect, useState } from 'react'
import { ButtonDefault } from '@/components/ButtonDefault'
import { StandardDeckFiltersDataType } from '@/types/filters'
import Image from 'next/image'
import 'rc-slider/assets/index.css'
import { useRecoilState } from 'recoil'
import { standardDeckFiltersAtom } from '@/states/atoms/filters'

const defaultData: StandardDeckFiltersDataType = {
  feedback: {
    min: 0,
    max: 0,
  },
  searchBy: 'newer',
  difficulty: {
    beginner: true,
    intermediate: true,
    advanced: true,
  },
}

export const StandardDeckFilters = () => {
  const [initialRange, setInitialRange] = useState({ min: 0, max: 0 })
  const [filterData, setFilterData] =
    useState<StandardDeckFiltersDataType>(defaultData)

  const [hidden, setHidden] = useState({
    searchBy: false,
    feedback: false,
    difficulty: false,
  })

  const [deckFilters, setDeckFilters] = useRecoilState(standardDeckFiltersAtom)

  useEffect(() => {
    // const result = getMinAndMaxFlashcardsAmount()
    const result = { min: 100, max: 1000 } // simulando o retorno da API

    setInitialRange({ ...result })

    setFilterData((prevState) => ({
      ...prevState,
      feedback: { min: result.min, max: result.max },
    }))
  }, [])

  const handleSliderChange = (newValues: number | number[]) => {
    if (Array.isArray(newValues)) {
      setFilterData((prevState) => ({
        ...prevState,
        feedback: {
          min: newValues[0],
          max: newValues[1],
        },
      }))
    }
  }

  const handleHiddenClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    const name = (event.target as HTMLButtonElement).name

    if (name === 'searchBy' || name === 'feedback' || name === 'difficulty') {
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
      value === 'feedback' ||
      value === 'flashcards'
    ) {
      setFilterData((prevState) => ({
        ...prevState,
        searchBy: value,
      }))
    }
  }

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target

    if (
      value === 'beginner' ||
      value === 'intermediate' ||
      value === 'advanced'
    ) {
      setFilterData((prevState) => ({
        ...prevState,
        difficulty: {
          ...prevState.difficulty,
          [value]: !prevState.difficulty[value],
        },
      }))
    }
  }

  const handleResetClick = () => {
    setFilterData({
      ...defaultData,
      feedback: {
        min: initialRange.min,
        max: initialRange.max,
      },
    })
  }

  const handleFilterSubmit = (event: React.FormEvent) => {
    event.preventDefault()

    console.log('Dados', filterData)

    setDeckFilters((prevState) => ({
      isActive: prevState.isActive,
      ...filterData,
    }))
  }

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
          className={`${hidden.searchBy ? 'max-h-0 opacity-0' : 'max-h-96 pb-5 opacity-100'} flex flex-col gap-3 overflow-hidden px-5 font-medium text-light-gray500 transition-all duration-300 ease-in-out`}
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
              value="feedback"
              onChange={handleSearchByChange}
              checked={filterData.searchBy === 'feedback'}
            />
            <span>Melhores Avaliações</span>
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
            name="difficulty"
            className="flex h-full w-full items-center justify-between px-5 py-3 text-start text-lg font-medium"
            onClick={handleHiddenClick}
          >
            <span className="pointer-events-none text-base sm:text-lg">
              Dificuldade
            </span>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/arrow2.svg?alt=media&token=7edc6c5d-bc40-4ced-b0c9-2f054379a9d9"
              alt="mostrar filtros"
              width={15}
              height={15}
              className={`${!hidden.difficulty && 'rotate-90'} pointer-events-none transition-all duration-300`}
            />
          </button>
        </legend>

        <div
          className={`${hidden.difficulty ? 'max-h-0 opacity-0' : 'max-h-96 pb-5 opacity-100'} flex flex-col gap-3 overflow-hidden px-5 font-medium transition-all duration-300 ease-in-out`}
        >
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="difficulty"
              value="beginner"
              onChange={handleDifficultyChange}
              checked={filterData.difficulty.beginner}
            />
            <span>Iniciante</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="difficulty"
              value="intermediate"
              onChange={handleDifficultyChange}
              checked={filterData.difficulty.intermediate}
            />
            <span>Intermediário</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="difficulty"
              value="advanced"
              onChange={handleDifficultyChange}
              checked={filterData.difficulty.advanced}
            />
            <span>Avançado</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="border-b border-light-gray225">
        <legend className="w-full">
          <button
            name="feedback"
            className="flex h-full w-full items-center justify-between px-5 py-3 text-start text-lg font-medium"
            onClick={handleHiddenClick}
          >
            <span className="pointer-events-none text-base sm:text-lg">
              Avaliações
            </span>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/arrow2.svg?alt=media&token=7edc6c5d-bc40-4ced-b0c9-2f054379a9d9"
              alt="mostrar filtros"
              width={15}
              height={15}
              className={`${!hidden.feedback && 'rotate-90'} pointer-events-none transition-all duration-300`}
            />
          </button>
        </legend>

        <div
          className={`${hidden.feedback ? 'max-h-0 opacity-0' : 'max-h-96 py-5 opacity-100'} overflow-hidden px-5 transition-all duration-300 ease-in-out`}
        >
          <Slider
            range
            min={initialRange.min}
            max={initialRange.max}
            step={10}
            value={[filterData.feedback.min, filterData.feedback.max]}
            onChange={handleSliderChange}
          />
          <div className="flex justify-between">
            <span>{filterData.feedback.min}</span>
            <span>{filterData.feedback.max}</span>
          </div>
        </div>
      </fieldset>

      <div className="mx-4 flex justify-center gap-3 py-5 sm:mx-10 sm:gap-5">
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
