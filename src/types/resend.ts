export type ResendComponentProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
  border?: boolean
}

export type ResendComponentType = (props: ResendComponentProps) => JSX.Element
