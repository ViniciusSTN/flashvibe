import { ReactNode } from 'react'
import { ErrorResponse, SuccessResponse } from './apiResponse'

export type flashcardOverlayType =
  | 'translations'
  | 'searchTranslations'
  | 'examples'
  | 'searchExamples'
  | 'pronunciations'
  | null

export type PronunciationType = {
  search: string
  votes: number
  audio: string
}

export type FlashcardType = {
  front: string
  keyword: string
  translations?: string[]
  examples: string[]
  pronunciations?: PronunciationType[]
  images?: (string | File)[]
}

export type FlashcardDataType = {
  flashcardId: number
  front: string
  keyword: string
  translations?: string[]
  examples: string[]
  pronunciations?: string[]
  images?: string[]
}

export type FlashcardErrorsType = {
  front: string[]
  keyword: string[]
  translations: string[]
  examples: string[]
  pronunciations: string[]
  images: string[]
}

export type SuccessWithFlashcardData = SuccessResponse & {
  flashcard: FlashcardType
}

export type GetAllFlashcardDataType = (
  flashcardId: number,
) => Promise<SuccessWithFlashcardData | ErrorResponse>

export type FlashcardFront = {
  flashcardId: number
  keyword: string
  front: string
}

export type SuccessWithFlashcardsResponse = SuccessResponse & {
  flashcards: FlashcardFront[]
  lastPage: number
  deckName: string
}

export type GetDeckFlashcardsType = (
  deckId: number,
  page: number,
) => Promise<SuccessWithFlashcardsResponse | ErrorResponse>

export type ListedFlashcardProps = {
  keyword: string
  front: string
  onClick: () => void
  disabled: boolean
}

export type ListedFlashcardType = (props: ListedFlashcardProps) => JSX.Element

export type FlashcardModalType =
  | (FlashcardType & {
      turned: boolean
      flashcardId: number
    })
  | null

export type FlashcardSliderProps = {
  sliders: (string | File)[]
}

export type FlashcardSliderType = (props: FlashcardSliderProps) => JSX.Element

export type FlashcardFiltersDataType = {
  searchBy:
    | 'newer'
    | 'older'
    | 'lastModifications'
    | 'lastStudied'
    | 'mostReviewed'
    | 'lessReviewed'
  situation: {
    new: boolean
    learning: boolean
    reviewing: boolean
  }
}

export type FlashcardFiltersType = FlashcardFiltersDataType & {
  isActive: boolean
}

export type SuccessWithAllFlashcardsDataResponse = SuccessResponse & {
  deckName: string
  flashcards: FlashcardDataType[]
}

export type GetCardsToStudyType = (
  deckId: number,
) => Promise<SuccessWithAllFlashcardsDataResponse | ErrorResponse>

export type FlashcardsToStudyType = {
  flashcards: FlashcardDataType[]
  deckName: string
} | null

export type FlashcardComponentProps = {
  children?: ReactNode
}

export type FlashcardComponentType = (
  props: FlashcardComponentProps,
) => JSX.Element | null

export type FeedbackType = {
  active: boolean
  flashcardId: number
  stars: number
}
