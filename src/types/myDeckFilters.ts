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
