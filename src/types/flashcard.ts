export type NewFlashcardType = {
  front: string
  keyword: string
  translations?: string[]
  examples: string[]
  pronunciations?: string[]
  images?: string[] | File[]
}

export type NewFlashcardErrorsType = {
  front: string[]
  keyword: string[]
  translations: string[]
  examples: string[]
  pronunciations: string[]
  images: string[]
}

export type flashcardOverlayType =
  | 'translations'
  | 'searchTranslations'
  | 'examples'
  | 'pronunciations'
  | 'images'
  | null
