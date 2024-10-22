export type DeckCardProps = {
  type: 'Standard Deck' | 'Custom deck'
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
  photo: File | null
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
