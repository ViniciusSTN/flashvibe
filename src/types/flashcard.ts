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
