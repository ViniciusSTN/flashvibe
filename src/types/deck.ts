import { ErrorResponse, SuccessResponse } from './apiResponse'
import { CommunityOrderByFilter } from './filters'

export type DeckCardProps = {
  deckId: number
  type: 'Standard Deck' | 'Custom Deck'
  favorite: boolean
  colorPredefinition: number
  title: string
  image: string
  situation: 'Learning' | 'Finished' | 'New'
  lastModification: number
  flashcards: number
  new: number
  learning: number
  reviewing: number
  description: string
  public: boolean
  difficult?: 'Beginner' | 'Intermediate' | 'Advanced' | null
  stars: number | null
  reviews: number | null
  author?: string
  canEdit?: boolean
}

export type DeckCardType = (
  props: DeckCardProps & { disabled?: boolean },
) => JSX.Element

export type ColorClasseType = {
  [key: number]: {
    dark: string
    light: string
  }
}

export type CustomDeckData = {
  name: string
  description: string
  photo: File | string | null
  colorPredefinition: number
  new: number
  learning: number
  reviewing: number
}

export type CustomDeckDataErrors = {
  name: string[]
  description: string[]
  photo: string[]
  colorPredefinition: string[]
  new: string[]
  learning: string[]
  reviewing: string[]
}

export type InputName = keyof CustomDeckData

export type EditCustomDeckProps = {
  initialData: CustomDeckData
  situation: 'Learning' | 'Finished' | 'New'
  isPublic: boolean
  favorite: boolean
  deckId?: number
}

export type EditCustomDeckType = (props: EditCustomDeckProps) => JSX.Element

export type ApiCustomDeck = {
  id: number
  type: string
  colorPredefinition: number
  title: string
  image: string
  lastModification: number
  createdData: number
  description: string | null
  public: boolean
  difficult: null
  stars: number | null
  reviews: number
  favorite: boolean
  flashcards: number
  new: number
  learning: number
  reviewing: number
}

export type SuccessResponseWithCustomDeckData = SuccessResponse & {
  deck: ApiCustomDeck
}

export type GetUsersCustomDeckBaseDataType = (
  deckId: number,
  jwtToken: string,
) => Promise<SuccessResponseWithCustomDeckData | ErrorResponse>

export type ReturnedDeck = {
  id: number
  type: 'Standard' | 'Custom'
  colorPredefinition: number
  title: string
  image: string | null
  lastModification: number
  createdData: number
  description: string | null
  public: boolean
  difficult: 'Beginner' | 'Intermediate' | 'Advanced' | null
  stars: number | null
  reviews: number | null
  favorite: boolean
  flashcards: number
  situation: string
  new: number
  learning: number
  reviewing: number
}

export type ReturnedCommunitDeck = ReturnedDeck & {
  author: string
  canEdit: boolean
}

export type SuccessResponseWithDecks = SuccessResponse & {
  decks: ReturnedDeck[]
  flashcardMin: number
  flashcardMax: number
  hasNext: boolean
  hasPrevious: boolean
  pageNumber: number
  totalPages: number
}

export type SuccessResponseWithCommunityDecks = SuccessResponse & {
  decks: ReturnedCommunitDeck[]
  flashcardMin: number
  flashcardMax: number
  hasNext: boolean
  hasPrevious: boolean
  pageNumber: number
  totalPages: number
}

export type GetAllUserDecksType = (
  page: number,
  type: string,
  orderBy: string,
  min: number,
  max: number,
  situation: string[],
  jwtToken: string,
) => Promise<ErrorResponse | SuccessResponseWithDecks>

export type CreateCustomDeckType = (
  deck: CustomDeckData,
  jwtToken: string,
) => Promise<ErrorResponse | SuccessResponse>

export type UpdateCustomDeckType = (
  deckId: number,
  deck: CustomDeckData,
  jwtToken: string,
) => Promise<ErrorResponse | SuccessResponse>

export type CreateStandardDeckType = (
  deck: DeckCardProps,
  jwtToken: string,
) => Promise<ErrorResponse | SuccessResponse>

export type ReturnedStandardDeck = {
  id: number
  type: 'Standard' | 'Custom'
  colorPredefinition: number
  title: string
  image: string
  lastModification: number
  createdData: number
  description: string
  difficult: 'Beginner' | 'Intermediate' | 'Advanced'
  stars: number
  reviews: number
  flashcards: number
}

export type SuccessResponseWithStandardDecks = SuccessResponse & {
  standardDecks: ReturnedStandardDeck[]
  minReviews: number
  maxReviews: number
  hasNext: true
  hasPrevious: false
  pageNumber: number
  totalPages: number
}

export type ErrorResponseWithHasAllDecks = ErrorResponse & {
  hasAllDecks: boolean
}

export type GetAllStandardDecksType = (
  page: number,
  orderBy: string,
  min: number,
  max: number,
  difficulty: string[],
  jwtToken: string,
) => Promise<ErrorResponse | SuccessResponseWithStandardDecks>

export type AssignDeckToUserType = (
  deckId: number,
  jwtToken: string,
) => Promise<ErrorResponse | SuccessResponse>

// export type ReviewsType = {
//   min: number
//   max: number
// }

// export type FilterParamsStandardDeckFilters = {
//   searchBy: string
//   feedbackMin: number
//   feedbackMax: number
//   difficulty: string
// }

export type SuccessResponseWithMinAndMaxReviews = SuccessResponse & {
  minReviews: number
  maxReviews: number
}

export type GetQuantityReviewsType = (
  jwtToken: string,
) => Promise<ErrorResponseWithHasAllDecks | SuccessResponseWithMinAndMaxReviews>

export type SuccessResponseWithMinAndMaxFlashcards = SuccessResponse & {
  flashcardMin: number
  flashcardMax: number
}

export type GetQuantityFlashcardsType = (
  jwtToken: string,
) => Promise<
  ErrorResponseWithHasAllDecks | SuccessResponseWithMinAndMaxFlashcards
>

export type GetQuantityFlashcardsCommunityDecks = GetQuantityFlashcardsType

export type DeleteDeckType = {
  modalActive: boolean
  deckId: number | null
}

export type DeleteUserDeck = (
  deckId: number,
  jwtToken: string,
) => Promise<ErrorResponse | SuccessResponse>

export type GetAllCommunityDecksType = (
  page: number,
  orderBy: CommunityOrderByFilter,
  flashcardsMin: number,
  flashcardsMax: number,
  jwtToken: string,
) => Promise<ErrorResponse | SuccessResponseWithCommunityDecks>

export type AssignCommunityDeckToUserType = (
  deckId: number,
  jwtToken: string,
) => Promise<SuccessResponse | ErrorResponse>

export type PublishDeckType = (
  deckId: number,
  jwtToken: string,
  allowEdit: boolean,
) => Promise<SuccessResponse | ErrorResponse>

export type PublicationModalType = {
  deckId: number
  modalActive: boolean
}
