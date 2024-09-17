export type ResetComponentProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
  children: React.ReactNode
  border?: boolean
}

export type ResetComponentType = (props: ResetComponentProps) => JSX.Element
