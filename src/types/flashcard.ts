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

export type NewFlashcardType = {
  front: string
  keyword: string
  translations?: string[]
  examples: string[]
  pronunciations?: PronunciationType[]
  images?: (string | File)[]
}

export type NewFlashcardErrorsType = {
  front: string[]
  keyword: string[]
  translations: string[]
  examples: string[]
  pronunciations: string[]
  images: string[]
}
