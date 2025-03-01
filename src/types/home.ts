export type TextDefaultProps = {
  title: string
  coloredTitle: boolean
  button?: string
  link?: string
  children?: React.ReactNode
}

export type TextDefaultType = (props: TextDefaultProps) => JSX.Element
