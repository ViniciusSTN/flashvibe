export type MyDeckFiltersType = {
  isActive: boolean
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
