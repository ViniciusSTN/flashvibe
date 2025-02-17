export type OrderByStateType = {
  value: string
  text: string
}

export type OrderByDefaultProps = {
  activeOrder: OrderByStateType
  setActiveOrder: (order: OrderByStateType) => void
  options: OrderByStateType[]
}

export type OrderByDefaultType = (props: OrderByDefaultProps) => JSX.Element
