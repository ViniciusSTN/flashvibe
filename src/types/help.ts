export type StepToCreateFlashcardType = {
  image: string
  alt: string
  number: string
  text: string
}

export type StepsToCreateFlashcardProps = {
  image: string
  alt: string
  number: string
  children: React.ReactNode
}

export type StepToCreateFlashcardComponentType = (
  props: StepsToCreateFlashcardProps,
) => JSX.Element

export type HowToCreateFlashcardsProps = {
  steps: StepToCreateFlashcardType[]
}

export type HowToCreateFlashcardsType = (
  props: HowToCreateFlashcardsProps,
) => JSX.Element
