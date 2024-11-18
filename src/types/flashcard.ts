import { ReactNode } from 'react'
import { ErrorResponse, SuccessResponse } from './apiResponse'

export type flashcardOverlayType =
  | 'translations'
  | 'searchTranslations'
  | 'examples'
  | 'searchExamples'
  | 'pronunciations'
  | 'front'
  | 'delete'
  | null

export type PronunciationType = {
  search: string
  votes: number
  audio: string
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
  mainPhrase: string[]
  keyword: string[]
  translations: string[]
  examples: string[]
  pronunciations: string[]
  images: string[]
}

export type FlashcardFront = {
  CreatedRecently: number
  LastModification: number
  id: number
  keyword: string
  main_phrase: string
  situation: string
}

export type SuccessWithFlashcardsResponse = SuccessResponse & {
  flashcard: FlashcardFront[]
  deck: string
  hasNext: boolean
  hasPrevious: boolean
  pageNumber: number
  totalPages: number
}

export type GetDeckFlashcardsType = (
  deckId: number,
  page: number,
  orderBy: string,
  situations: string[],
  jwtToken: string,
) => Promise<SuccessWithFlashcardsResponse | ErrorResponse>

export type ListedFlashcardProps = {
  keyword: string
  front: string
  onClick: () => void
  disabled: boolean
}

export type ListedFlashcardType = (props: ListedFlashcardProps) => JSX.Element

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

export type SentenceCorretionType = {
  replacement: string
  sentence: string
}

export type SuccessResponseWithCorrectedSentence = SuccessResponse & {
  corrections?: SentenceCorretionType[]
}

export type CorrectSentenceType = (
  sentence: string,
) => Promise<ErrorResponse | SuccessResponseWithCorrectedSentence>

export type FrontCorretionsModalProps = {
  corrections: SentenceCorretionType[]
  front: string
}

export type FrontCorretionsModalType = (
  props: FrontCorretionsModalProps,
) => JSX.Element

export type TranslationsType = {
  sourceWord: string
  translation: number
}

export type SuccessResponseWithTranslations = SuccessResponse & {
  translations: TranslationsType[]
}

export type GetTranslationsType = (
  word: string,
) => Promise<ErrorResponse | SuccessResponseWithTranslations>

export type ExampleType = {
  sourceSentence: string
}

export type SuccessResponseWithExamples = SuccessResponse & {
  examples: ExampleType[]
}

export type GetExamplesSentencesType = (
  word: string,
) => Promise<ErrorResponse | SuccessResponseWithExamples>

export type FlashcardPronunciationType = {
  id?: number
  keyword?: string
  audioUrl: string
  voiceName: string
  sex: string
  country: string
}

export type SuccessResponseWithPronunciations = SuccessResponse & {
  audioInfo: FlashcardPronunciationType[]
}

export type GetPronunciationsType = (
  word: string,
) => Promise<ErrorResponse | SuccessResponseWithPronunciations>

export type FlashcardExampleType = {
  id: number
  textExample: string
}

export type FlashcardTranslationsType = {
  id: number
  textTranslation: string
}

export type FlashcardImageType = {
  id: number
  fileUrl: string | File
}

export type SendFlashcardImageType = {
  id: number
  fileUrl: string
}

export type FlashcardWithoutImages = {
  keyword: string
  mainPhrase: string
  examples: FlashcardExampleType[]
  translations: FlashcardTranslationsType[]
  pronunciations: FlashcardPronunciationType[]
}

export type FlashcardType = FlashcardWithoutImages & {
  images: FlashcardImageType[]
}

export type SendFlashcardType = FlashcardWithoutImages & {
  images: SendFlashcardImageType[]
}

export type SuccessWithFlashcardData = SuccessResponse & {
  flashcard: FlashcardType
}

export type GetAllFlashcardDataType = (
  flashcardId: number,
  deckId: number,
  jwtToken: string,
) => Promise<SuccessWithFlashcardData | ErrorResponse>

export type FlashcardModalType =
  | (FlashcardType & {
      turned: boolean
      flashcardId: number
    })
  | null

export type SendExampleType = {
  textExample: string
}

export type SendTranslationType = {
  textTranslation: string
}

export type SendPronunciationType = {
  keyword: string
  audioUrl: string
}

export type SendImageType = {
  imageUrl: string
  description: string
}

export type CreateFlashcardType = (
  jwtToken: string,
  deckId: number,
  keyword: string,
  mainPhrase: string,
  examples: SendExampleType[],
  translations: SendTranslationType[],
  pronunciations: FlashcardPronunciationType[],
  images: SendImageType[],
) => Promise<ErrorResponse | SuccessResponse>

export type EditFlashcardDataProps = {
  deckId: string
}

export type EditFlashcardDataType = (
  props: EditFlashcardDataProps,
) => JSX.Element

export type UpdateFlashcard = (
  flashcardId: number,
  deckId: number,
  jwtToken: string,
  flashcard: SendFlashcardType,
) => Promise<ErrorResponse | SuccessResponse>

export type DeleteFlashcardType = (
  flashcardId: number,
  deckId: number,
  jwtToken: string,
) => Promise<ErrorResponse | SuccessResponse>

export type DeleteFlashcardModalProps = {
  flashcardId: string
  deckId: string
  jwtToken: string
}

export type DeleteFlashcardModalType = (
  props: DeleteFlashcardModalProps,
) => JSX.Element

export type FlashcardModalComponentProps = {
  deckId: number
}

export type FlashcardModalComponentType = (
  props: FlashcardModalComponentProps,
) => JSX.Element
