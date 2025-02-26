export type TextDefaultProps = {
  title: string
  coloredTitle: boolean
  button?: string
  link?: string
  children?: React.ReactNode
}

export type TextDefaultType = (props: TextDefaultProps) => JSX.Element

export type StepsToCreateFlashcardProps = {
  image: string
  alt: string
  number: string
  children: React.ReactNode
}

export type StepToCreateFlashcardType = (
  props: StepsToCreateFlashcardProps,
) => JSX.Element

export type StepType = {
  image: string
  alt: string
  number: string
  text: string
}
