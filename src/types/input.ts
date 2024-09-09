export type InputProps = {
  type:
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
  placeholder: string
  image?: string
  tailwind?: string
}

export type InputType = (props: InputProps) => JSX.Element
