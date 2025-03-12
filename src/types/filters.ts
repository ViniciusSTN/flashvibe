export type MyDeckFiltersDataType = {
  type: 'all' | 'standard' | 'custom'
  searchBy:
    | 'newer'
    | 'older'
    | 'lastModifications'
    | 'lastStudied'
    | 'flashcards'
  flashcards: {
    min: number
    max: number
  }
  situation: {
    favorites: boolean
    learning: boolean
    finished: boolean
  }
}

export type MyDeckFiltersType = MyDeckFiltersDataType & {
  isActive: boolean
}

export type StandardDeckFiltersDataType = {
  searchBy: 'newer' | 'older' | 'lastModifications' | 'feedback' | 'flashcards'
  feedback: {
    min: number
    max: number
  }
  difficulty: {
    beginner: boolean
    intermediate: boolean
    advanced: boolean
  }
}

export type StandardDeckFiltersType = StandardDeckFiltersDataType & {
  isActive: boolean
}

export type CommunityOrderByFilter =
  | 'newer'
  | 'older'
  | 'bestRated'
  | 'moreRated'
  | 'flashcards'

export type CommunityDecksFiltersDataType = {
  orderBy: CommunityOrderByFilter
  flashcards: {
    min: number
    max: number
  }
}

export type CommunityDecksFiltersType = CommunityDecksFiltersDataType & {
  isActive: boolean
}
