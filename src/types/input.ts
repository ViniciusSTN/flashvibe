export type HtmlInputType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'file'
  | 'checkbox'
  | 'radio'
  | 'range'
  | 'color'

export type InputProps = {
  type: HtmlInputType
  placeholder?: string
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  image?: string
  tailwind?: string
  error?: string[]
  label?: string
  disable?: boolean
}

export type InputType = (props: InputProps) => JSX.Element
